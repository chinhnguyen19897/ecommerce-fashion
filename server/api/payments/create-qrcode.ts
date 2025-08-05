import QR from 'qrcode'
import { getBankInfo } from '~/server/utils/bank-info'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { amount, orderId } = body
  if (!orderId || !amount) {
    throw new createError({
      statusCode: 400,
      statusMessage: 'Invalid orderId or orderId'
    })
  }
  const bankInfo = await getBankInfo()

  const note = `ORDER_${orderId}`
  const qrText = `STK: ${bankInfo.accountNumber}\nName: ${bankInfo.bankName}\nAmount: ${amount}\nNote: ${note}`
  const qrCodeUrl = await QR.toDataURL(qrText)

  return {
    qrCodeUrl,
    accountNumber: bankInfo.accountNumber,
    accountName: bankInfo.accountName,
    bankName: bankInfo.bankName,
    note
  }
})
