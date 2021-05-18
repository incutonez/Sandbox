<template>
  <Grid :columns="columns"
        :store="usersStore"
        :multi-sort="true">
    <div>hi</div>
  </Grid>
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

  // TODO: Figure out how to use IData here... that would require the interface to have all props for columns though
  data() {
    return {
      user: new User(),
      usersStore: new Store<User>(User, {
        sorters: [{
          field: 'Age',
          direction: 'DESC'
        }]
      }),
      columns: [{
        type: ColumnTypes.Expander
      }, {
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number
      }, {
        text: 'Username',
        field: 'Username'
      }, {
        text: 'Age',
        field: 'Age',
        type: ColumnTypes.Number
      }, {
        text: 'Meta',
        columns: [{
          text: 'Active',
          field: 'Meta.IsActive',
          type: ColumnTypes.Boolean
        }, {
          text: 'Create Date',
          field: 'Meta.CreateDate',
          type: ColumnTypes.Date
        }]
      }, {
        text: 'Posts',
        columns: [{
          text: 'Id',
          field: 'Posts.Id',
          type: ColumnTypes.Number,
          isAssociation: true
        }, {
          text: 'Content',
          field: 'Posts.Content',
          isAssociation: true
        }]
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
