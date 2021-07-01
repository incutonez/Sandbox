import IApplication from '@/interfaces/IApplication';
import Model, {IAssociations} from '@/classes/Model';
import Company from '@/models/Company';
import Contact from '@/models/Contact';
import utilities from '@/utilities';
import Formatters from '@/statics/Formatters';

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

  get associations(): IAssociations {
    return {
      Contacts: {
        model: Contact,
        type: 'store',
        key: 'Contacts'
      },
      Company: {
        model: Company,
        type: 'model',
        key: 'Company'
      }
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
