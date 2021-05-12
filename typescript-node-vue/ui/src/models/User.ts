import Model from '../classes/Model';
import _ from 'lodash';

export default class User extends Model {
  Id: number;
  Username: string;
  Age: number;

  static configs = {
    proxy: {
      url: 'api/users',
      type: 'ajax'
    }
  };

  constructor(config?: any) {
    config = _.merge({}, User.configs, config);
    super(config);
    this.Id = config.Id;
    this.Username = config.Username;
    this.Age = config.Age;
  }
}
