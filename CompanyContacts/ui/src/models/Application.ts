import Company from "ui/models/Company";
import Contact from "ui/models/Contact";
import utilities from "ui/utilities";
import Formatters from "ui/statics/Formatters";
import Store from "ui/classes/Store";
import Model from "ui/classes/Model";
import { IAssociations } from "ui/interfaces/IAssociation";

interface IApplication {
  Id: number;
  Position: string;
  PositionType: number;
  Link: string;
  CreateDate: Date;
  Company: Company;
  Contacts: Store<Contact>;
}

interface Application extends IApplication {
}

class Application extends Model {
  static proxy = {
    url: "api/applications",
    type: "rest",
  };

  saveExclude = {
    Company: {
      Name: true,
      IsRecruitment: true,
    },
    Contacts: {
      Email: true,
      IsRecruiter: true,
      Name: true,
    },
  };

  get fields() {
    return ["Id", "Position", "PositionType", "Link", "CreateDate", "Company", "Contacts"];
  }

  get associations(): IAssociations {
    return {
      Contacts: {
        model: Contact,
        type: "store",
        key: "Contacts",
      },
      Company: {
        model: Company,
        type: "model",
        key: "Company",
      },
    };
  }

  get positionTypeDisplay(): string {
    return Formatters.positionType(this.PositionType);
  }

  canEdit(): boolean {
    return !!utilities.random(0, 1);
  }

  canDelete(): boolean {
    return !!utilities.random(0, 1);
  }
}

export default Application;
