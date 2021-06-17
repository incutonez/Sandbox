import IContact from '@/interfaces/IContact';
import IApplication from '@/interfaces/IApplication';
import IStore from '@/interfaces/IStore';
import IModel from '@/interfaces/IModel';

interface ICompany extends IModel {
  Id: number;
  Name: string;
  IsRecruitment: boolean;
  CreateDate: Date;
  Contacts: IStore<IContact>;
  Applications: IStore<IApplication>;
}

export default ICompany;
