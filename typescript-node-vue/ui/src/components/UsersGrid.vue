<template>
  <JefTitle :title="'This is my title!'">
    <template #tools>
      <button>Button 1</button>
      <button>Button 2</button>
    </template>
  </JefTitle>
  <JefGrid :columns="columns"
           :store="usersStore"
           :multi-sort="true">
    <template #title>
      <span>This is my title!</span>
    </template>
  </JefGrid>
</template>

<script lang="ts">
import User from '@/models/User';
import Store from '@/classes/Store';
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import JefGrid from '@/components/grid/Base.vue';
import JefTitle from '@/components/base/Title.vue';

export default defineComponent({
  name: 'UsersGrid',
  components: {
    JefTitle,
    JefGrid
  },
  extends: JefGrid,

  // TODO: Figure out how to use IData here... that would require the interface to have all props for columns though
  data() {
    return {
      user: new User(),
      usersStore: new Store(User),
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
          type: ColumnTypes.Date,
          formatter: 'mmddyyyy'
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
  },

  mounted() {
    console.log('UsersGrid', this.$slots.title);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
       lang="scss">
</style>
