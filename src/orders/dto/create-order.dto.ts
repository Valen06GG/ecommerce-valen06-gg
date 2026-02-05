export class CreateOrderDto {
  userId: string;
  product: { id: string }[];
}