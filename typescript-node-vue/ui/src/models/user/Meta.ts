import utilities from '@/utilities';

const DefaultConfig: UserMeta = {
  IsActive: false,
  CreateDate: new Date()
};

interface UserMeta {
  IsActive: boolean;
  CreateDate: Date;
}

// Class/Interface merging https://stackoverflow.com/questions/53128744/typescript-automatically-get-interface-properties-in-a-class
class UserMeta {
  constructor(config: UserMeta = DefaultConfig) {
    this.IsActive = config.IsActive;
    this.CreateDate = utilities.isDate(config.CreateDate) ? config.CreateDate : new Date(config.CreateDate);
  }
}

export default UserMeta;
