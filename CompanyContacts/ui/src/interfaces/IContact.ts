import ICompany from "ui/interfaces/ICompany";
import IApplication from "ui/interfaces/IApplication";

export default interface IContact {
  Id: number;
  Name: string;
  IsRecruiter: boolean;
  Email: string | null;
  Company: ICompany;
  Application?: IApplication;
}
