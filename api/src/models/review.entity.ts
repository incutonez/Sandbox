import { UserEntity } from "@incutonez/spec";

export class ReviewEntity {
  id?: string;
  title: string;
  description: string;
  rating: number;
  createdDate: number;
  createdBy: UserEntity;
}
