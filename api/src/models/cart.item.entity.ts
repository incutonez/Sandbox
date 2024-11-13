export class CartItemEntity {
  userId: string;
  productId: string;
  count: number;
  createdDate?: number;
  readonly id?: number;
}

export class CartItemAddEntity {
  userId?: string;
  productId: string;
}

export class CartItemUpdateEntity {
  total: number;
}
