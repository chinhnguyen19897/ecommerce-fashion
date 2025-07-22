import multer from 'multer'
import path from "path";
import fs from "fs";
import prisma from '~/lib/prisma'
import {withAuth} from "~/utils/withAuth";
import {authGuard} from "~/middleware/authGuard";


const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: (...arg: any[]) => any) {
    const uploadDir = './public/uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true})
    }

    cb(null, uploadDir)
  },

  filename: function (req: any, file: any, cb: (...arg: any[]) => any) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

//Allow only images (jpg, png, gif, webp)

const imageFileFilter = (req: any, file: any, cb: (...arg: any[]) => any) => {
  const allowedTypes = /jpeg|avif|jpg|png|gif|webp/
  const isImage = allowedTypes.test(file.mimetype)

  if (isImage) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file extension"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {fileSize: 2 * 1024 * 1024}
})
  .fields([
    {name: 'file', maxCount: 1},
    {name: 'productId', maxCount: 1}
  ])

async function uploadProductImage(event: any) {
  return new Promise<{ imageUrl: string, productId: number }>((resolve, reject) => {
    upload(event.req, event.res, async (err: any) => {
      if (err) {
        reject(err)
      }

      const file = event.req.file?.['file']?.[0];
      const productId = Number(event.req.body?.productId);

      if (!file || !productId) {
        reject(new Error("Missing file or productId"));
        return
      }

      const imageUrl = `uploads/${file.filename}`;
      resolve({imageUrl, productId})
    })
  })
}

export default withAuth(async (event) => {
  const {imageUrl, productId} = await uploadProductImage(event)
  await prisma.image.create({
    data: {
      url: imageUrl,
      productId: productId
    }
  })
  return {message: 'Product image uploaded'}
})