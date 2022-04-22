import IContact from "ui/interfaces/IContact";
import Company from "ui/models/Company";
import Application from "ui/models/Application";
import Model from "ui/classes/Model";
import { IAssociations } from "ui/interfaces/IAssociation";

interface Contact extends IContact {

}

class Contact extends Model {
  static proxy = {
    url: "api/contacts",
    type: "ajax",
  };

  get fields() {
    return ["Id", "Name", "IsRecruiter", "Email", "Company", "Application"];
  }

  get associations(): IAssociations {
    return {
      Company: {
        type: "model",
        model: Company,
        key: "Company",
      },
      Application: {
        type: "model",
        model: Application,
        key: "Application",
      },
    };
  }
}

export default Contact;
