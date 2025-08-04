import QR from 'qrcode';
import {getBankInfo} from "~/server/utils/bank-info";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const {amount, orderId} = body;
    const bankInfo = getBankInfo()

    const note = `ORDER_${orderId}`;
    const qrText = `STK: ${bankInfo.accountNumber}\nName: ${bankInfo.bankName}\nAmount: ${amount}\nNote: ${note}`
    const qrCodeUrl = await QRCode.toDataURL(qrText);

      return {
        qrCodeUrl,
        accountNumber: bankInfo.accountNumber,
        accountName: bankInfo.accountName,
        bankName: bankInfo.bankName,
        note,
      };
})