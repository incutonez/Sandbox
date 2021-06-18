import ICompany from '@/interfaces/ICompany';
import IContact from '@/interfaces/IContact';
import IStore from '@/interfaces/IStore';

export default interface IApplication {
  Id: number;
  Position: string;
  // TODO: It's an enum
  PositionType: number;
  Link: string;
  CreateDate: Date;
  Company: ICompany;
  Contacts: IStore<IContact>;

  canEdit(): boolean;
}
