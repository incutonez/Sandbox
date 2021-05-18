import Model from '@/classes/Model';

interface UserPost {
  Id: number;
  Content: string;
}

class UserPost extends Model {
  Id = 1;
  Content = '';

  constructor(config: any = {}) {
    super();
    Object.assign(this, config);
    // console.log('here', config);
  }
}

export default UserPost;
