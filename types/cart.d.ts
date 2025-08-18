export interface ICartItem {
  id: string;
  quantity: number;
  price: number;
  color: string;
  name: string;
  description: string;
  image: any;
}

export interface ICartData {
  id: number;
  quantity: number;
  product: Record<string, ICartItem>;
}