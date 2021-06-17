import ICompany from '@/interfaces/ICompany';
import Model from '@/classes/Model';
import Contact from '@/models/Contact';
import Store from '@/classes/Store';
import Application from '@/models/Application';

interface Company extends ICompany {

}

class Company extends Model {
  static proxy = {
    url: 'api/companies',
    type: 'ajax',
    methods: {
      get: 'post'
    }
  };

  Contacts = new Store(Contact);
  Applications = new Store(Application);

  constructor(config: ICompany) {
    super(config);
    this.Id = config.Id;
    this.Name = config.Name;
    this.IsRecruitment = config.IsRecruitment;
    this.CreateDate = new Date(config.CreateDate);
    this.Contacts.add(config.Contacts as Contact[]);
    this.Applications.add(config.Applications as Application[]);
  }

  showExpander(): boolean {
    return this.Applications.count() > 1 || this.Contacts.count() > 1;
  }
}

export default Company;
