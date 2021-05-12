import User from '@/models/User';
import Store from '@/classes/Store';
import {defineComponent} from 'vue';

const Component = defineComponent({
  data() {
    return {
      user: new User(),
      usersStore: new Store({
        model: User
      })
    };
  },

  async created() {
    await this.usersStore.load();
    await this.user.load({
      url: 'api/users/100'
    });
    console.log(this.user, this.usersStore);
  }
});

export default Component;
