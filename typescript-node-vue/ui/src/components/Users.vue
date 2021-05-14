<template>
  <Grid :columns="columns"
        :store="usersStore" />
</template>

<script lang="ts">
import User from '@/models/User';
import Store from '@/classes/Store';
import {defineComponent} from 'vue';
import Grid from './Grid.vue';
import ColumnTypes from '@/statics/ColumnTypes';

export default defineComponent({
  components: {
    Grid
  },

  data() {
    return {
      user: new User(),
      usersStore: new Store({
        model: User
      }),
      columns: [{
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number
      }, {
        text: 'Username',
        field: 'Username'
      }]
    };
  },

  async created() {
    await this.usersStore.load();
    await this.user.load({
      url: 'api/users/10'
    });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
       lang="scss">
</style>
