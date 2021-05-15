import Model from '../classes/Model';
import _ from 'lodash';

interface IMeta {
  IsActive: boolean,
  CreateDate: Date
}

interface IPost {
  Id: number,
  Content: string
}

export default class User extends Model {
  Id: number;
  Username: string;
  Age: number;
  Meta: IMeta;
  Posts: Array<IPost>;

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
    this.Meta = config.Meta;
    this.Posts = config.Posts;
  }
}
