export interface IRent{
    _id:string,
    user_id: string,
    product_id:string,
    title: string,
    image: string,
    isConfirm: boolean,
    confirmationDate:Date,
    endDate: Date,
    price:number,
    period:number,
    isEnd: boolean
}