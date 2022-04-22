import ICompany from "ui/interfaces/ICompany";
import IContact from "ui/interfaces/IContact";
import IStore from "ui/interfaces/IStore";
import IModel from "ui/interfaces/IModel";

export default interface IApplication extends IModel {
  Id: number;
  Position: string;
  // TODO: It's an enum
  PositionType: number;
  Link: string;
  CreateDate: Date;
  Company?: ICompany;
  Contacts?: IStore<IContact>;

  canEdit(): boolean;

  canDelete(): boolean;
}
