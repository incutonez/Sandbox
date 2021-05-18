import Model from '../classes/Model';
import _ from 'lodash';
import UserMeta from '@/models/user/Meta';
import UserPost from '@/models/user/Post';
import Store from '@/classes/Store';

export default class User extends Model {
  Id: number;
  Username: string;
  Age: number;
  Meta: UserMeta;
  Posts = new Store({
    model: UserPost
  });

  static proxy = {
    url: 'api/users',
    type: 'ajax'
  };

  constructor(config: any = {}) {
    super(config);
    this.Id = config.Id;
    this.Username = config.Username;
    this.Age = config.Age;
    this.Meta = new UserMeta(config.Meta);
    this.Posts.add(config.Posts);
  }
}
