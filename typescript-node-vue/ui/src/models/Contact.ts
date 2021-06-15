import Model from '@/classes/Model';
import IContact from '@/interfaces/IContact';

interface Contact extends IContact {

}

class Contact extends Model {
  static proxy = {
    url: 'api/contacts',
    type: 'ajax',
    methods: {
      get: 'post'
    }
  };

  constructor(config: IContact) {
    super(config);
    this.Id = config.Id;
    this.Name = config.Name;
    this.IsRecruiter = config.IsRecruiter;
    this.Email = config.Email;
    this.Company = config.Company;
    this.Application = config.Application;
  }
}

export default Contact;
