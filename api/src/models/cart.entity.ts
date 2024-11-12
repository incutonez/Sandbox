export class CartEntity {
  readonly id: number;
  userId: string;
  productId: string;
  createdDate?: number;
}

export class CartAddEntity {
  userId?: string;
  productId: string;
}
