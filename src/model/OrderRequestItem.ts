export class OrderRequestItem
{
    bookId!:number
    quantity!:number
    paymentMethod!:PaymentMethod
}

export enum PaymentMethod
{
    CREDIT_CARD,
    UPI,
    NET_BANKING,
    COD,
}