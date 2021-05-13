import User from '@/models/User';
import Store from '@/classes/Store';
import {defineComponent} from 'vue';
import Grid from './Grid.vue';

const Component = defineComponent({
  // TODO: How to have 2 grids and configure them?
  components: {
    Grid
  },

  data() {
    return {
      user: new User(),
      usersStore: new Store({
        model: User
      })
    };
  },

  async created() {
    console.log('created');
    setTimeout(async () => {
      await this.usersStore.load();
      console.log('calling');
      await this.user.load({
        url: 'api/users/10'
      });
    }, 1000);
  }
});

export default Component;
