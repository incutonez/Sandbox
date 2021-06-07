<template>
  <FlexContainer :border="false">
    <FlexContainer :direction="FlexDirections.COLUMN"
                   extra-cls="left"
                   :grow="1"
                   :margin="'0 10px 0 0'">
      <JefTitle title="Search Panel" />
    </FlexContainer>
    <FlexContainer extra-cls="right"
                   :grow="2"
                   :direction="FlexDirections.COLUMN">
      <JefTitle title="Contacts"
                :grow="0">
      </JefTitle>
      <JefGrid :columns="columns"
               :store="viewStore"
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

export default defineComponent({
  name: 'ContactsGrid',
  components: {FlexContainer, JefTitle, JefGrid},
  data() {
    return {
      FlexDirections: FlexDirections,
      FlexJustifications: FlexJustifications,
      FlexAlignments: FlexAlignments,
      TextAlignments: TextAlignments,
      FlexContentAlignments: FlexContentAlignments,
      viewStore: new Store(Contact),
      columns: [{
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number
      }, {
        text: 'Name',
        field: 'Name'
      }, {
        text: 'Recruiter',
        field: 'IsRecruiter',
        type: ColumnTypes.Boolean
      }, {
        text: 'Email',
        field: 'Email'
      }, {
        text: 'Company',
        columns: [{
          text: 'Name',
          field: 'Company.Name'
        }, {
          text: 'Recruitment',
          field: 'Company.IsRecruitment',
          type: ColumnTypes.Boolean
        }]
      }, {
        text: 'Application',
        columns: [{
          text: 'Id',
          field: 'Application.Id',
          type: ColumnTypes.Number,
          isAssociation: true
        }, {
          text: 'Position',
          field: 'Application.Position',
          isAssociation: true
        }, {
          text: 'Position Type',
          field: 'Application.PositionType',
          isAssociation: true
        }, {
          text: 'Link',
          field: 'Application.Link',
          isAssociation: true
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
