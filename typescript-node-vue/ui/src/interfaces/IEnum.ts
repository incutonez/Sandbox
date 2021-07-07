import IModel from '@/interfaces/IModel';

export default interface IEnum extends IModel {
  Key: string;
  Value: string | number;
  Description: string;
}
