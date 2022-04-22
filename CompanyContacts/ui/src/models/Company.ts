import Contact from "ui/models/Contact";
import Application from "ui/models/Application";
import Store from "ui/classes/Store";
import Model from "ui/classes/Model";
import { IAssociations } from "ui/interfaces/IAssociation";

interface ICompany {
  Id: number;
  Name: string;
  IsRecruitment: boolean;
  CreateDate: Date;
  Contacts: Store<Contact>;
  Applications: Store<Application>;
}

interface Company extends ICompany {
}

class Company extends Model {
  static proxy = {
    url: "api/companies",
    type: "rest",
  };

  saveExclude = {
    Applications: {
      Position: true,
      PositionType: true,
      Link: true,
      CreateDate: true,
      Contacts: true,
    },
    Contacts: {
      Email: true,
      IsRecruiter: true,
      Name: true,
    },
  };

  get fields() {
    return ["Id", "Name", "IsRecruitment", "CreateDate", "Contacts", "Applications"];
  }

  get associations(): IAssociations | null {
    return {
      Contacts: {
        type: "store",
        model: Contact,
        key: "Contacts",
      },
      Applications: {
        type: "store",
        model: Application,
        key: "Applications",
      },
    };
  }

  showExpander(): boolean {
    return this.Applications.count() > 1 || this.Contacts.count() > 1;
  }
}

export default Company;
