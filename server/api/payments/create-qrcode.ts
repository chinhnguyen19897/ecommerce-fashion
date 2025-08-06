import QR from 'qrcode'
import { getBankInfo } from '~/server/utils/bank-info'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {amount} = body
  if (amount <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Amount is must be greater than 0',
    })
  }
  const bankInfo = await getBankInfo()

    const res: any = await $fetch('https://api.vietqr.io/v2/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      accountNo: bankInfo.accountNumber,
      accountName: bankInfo.accountName,
      acqId: bankInfo.acqId,
      amount: amount,
      format: 'text',
      template: 'compact2',
    },
  })


  return { qrCode: res.data }

})
