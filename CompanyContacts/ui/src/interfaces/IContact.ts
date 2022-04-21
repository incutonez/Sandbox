import ICompany from '@/interfaces/ICompany';
import IApplication from '@/interfaces/IApplication';

export default interface IContact {
  Id: number;
  Name: string;
  IsRecruiter: boolean;
  Email: string | null;
  Company: ICompany;
  Application?: IApplication;
}
