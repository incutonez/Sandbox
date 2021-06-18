import IApplication from '@/interfaces/IApplication';
import Model from '@/classes/Model';
import Company from '@/models/Company';
import Contact from '@/models/Contact';
import Store from '@/classes/Store';
import utilities from '@/utilities';

interface Application extends IApplication {

}

class Application extends Model {
  static proxy = {
    url: 'api/applications',
    type: 'ajax',
    methods: {
      get: 'post'
    }
  };

  Contacts = new Store(Contact);

  constructor(config: IApplication) {
    super(config);
    // TODO: Maybe come up with a parser that reads the fields and auto does this?
    this.Id = config.Id;
    this.Position = config.Position;
    this.PositionType = config.PositionType;
    this.Link = config.Link;
    this.CreateDate = new Date(config.CreateDate);
    if (config.Company) {
      this.Company = new Company(config.Company);
    }
    this.Contacts.add(config.Contacts as Contact[]);
  }

  canEdit(): boolean {
    return !!utilities.random(0, 1);
  }

  canDelete(): boolean {
    return !!utilities.random(0, 1);
  }
}

export default Application;
