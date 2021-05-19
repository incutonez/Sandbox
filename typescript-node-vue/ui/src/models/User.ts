import Model from '../classes/Model';
import UserMeta from '@/models/user/Meta';
import UserPost from '@/models/user/Post';
import IUser from '@/interfaces/IUser';
import Store from '@/classes/Store';

interface User extends IUser {

}

class User extends Model {
  Posts = new Store(UserPost);

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

export default User;
