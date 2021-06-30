import ICompany from '@/interfaces/ICompany';
import Model, {IAssociations} from '@/classes/Model';
import Contact from '@/models/Contact';
import Application from '@/models/Application';

interface Company extends ICompany {

}

class Company extends Model {
  static proxy = {
    url: 'api/companies',
    type: 'ajax'
  };

  get associations(): IAssociations | null {
    return {
      Contacts: {
        type: 'store',
        model: Contact,
        key: 'Contacts'
      },
      Applications: {
        type: 'store',
        model: Application,
        key: 'Applications'
      }
    };
  }

  showExpander(): boolean {
    return this.Applications.count() > 1 || this.Contacts.count() > 1;
  }
}

export default Company;
