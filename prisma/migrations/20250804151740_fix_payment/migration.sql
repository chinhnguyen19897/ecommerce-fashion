-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
