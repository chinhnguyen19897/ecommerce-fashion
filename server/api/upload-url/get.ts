import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const fileName = query.name as string
  const fileType = query.type as string
  if (!fileName || !fileType) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request parameters'
    })
  }

  const bucket = process.env.AWS_S3_BUCKET!
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${fileName}.${fileType}`,
    Body: event.body,
    ContentType: `image/${fileType}`
  })

  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner')
  const url = await getSignedUrl(s3, command, { expiresIn: 60 })

  return {
    uploadUrl: url,
    fileUrl: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/products/${Date.now()}-${fileName}`
  }
})
