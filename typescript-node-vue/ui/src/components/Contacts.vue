<template>
  <FlexContainer :border="false">
    <FlexContainer :direction="FlexDirections.COLUMN"
                   extra-cls="left"
                   :grow="1"
                   :margin="'0 10px 0 0'">
      <JefTitle title="Search Panel"
                border="b" />
      <JefField v-model="search.name"
                label="Name" />
      <JefField v-model="search.isRecruiter"
                label="Recruiter"
                type="checkbox" />
    </FlexContainer>
    <FlexContainer extra-cls="right"
                   :grow="2"
                   :border="false"
                   :direction="FlexDirections.COLUMN">
      <JefTitle title="Contacts"
                :grow="0" />
      <JefGrid :columns="columns"
               :store="viewStore"
               :grow="1"
               :multi-sort="true" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  FlexAlignments,
  FlexContentAlignments,
  FlexDirections,
  FlexJustifications,
  TextAlignments
} from '@/statics/Flex';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import JefGrid from '@/components/base/Grid.vue';
import JefTitle from '@/components/base/Title.vue';
import Contact from '@/models/Contact';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefField from '@/components/base/Field.vue';

export default defineComponent({
  name: 'ContactsGrid',
  components: {JefField, FlexContainer, JefTitle, JefGrid},
  data() {
    return {
      FlexDirections: FlexDirections,
      FlexJustifications: FlexJustifications,
      FlexAlignments: FlexAlignments,
      TextAlignments: TextAlignments,
      FlexContentAlignments: FlexContentAlignments,
      viewStore: new Store(Contact),
      search: {
        name: '',
        isRecruiter: false
      },
      columns: [{
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number,
        align: TextAlignments.RIGHT,
        width: 50
      }, {
        text: 'Name',
        field: 'Name'
      }, {
        text: 'Recruiter',
        field: 'IsRecruiter',
        type: ColumnTypes.Boolean,
        formatter: 'boolIconTrue',
        align: TextAlignments.CENTER,
        width: 80
      }, {
        text: 'Email',
        field: 'Email'
      }, {
        text: 'Company',
        width: 200,
        columns: [{
          text: 'Name',
          field: 'Company.Name',
          width: 50
        }, {
          text: 'Recruitment',
          field: 'Company.IsRecruitment',
          type: ColumnTypes.Boolean
        }]
      }, {
        text: 'Application',
        flex: 2,
        columns: [{
          text: 'Id',
          field: 'Application.Id',
          type: ColumnTypes.Number,
          align: TextAlignments.RIGHT
        }, {
          text: 'Position',
          field: 'Application.Position'
        }, {
          text: 'Position Type',
          field: 'Application.PositionType'
        }, {
          text: 'Link',
          field: 'Application.Link'
        }]
      }]
    };
  },

  async created() {
    await this.viewStore.load();
  }
});
</script>

<style scoped
       lang="scss">
</style>
