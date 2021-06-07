<template>
  <FlexContainer :direction="FlexDirections.COLUMN"
                 height="100%"
                 width="100%">
    <FlexItem :grow="0"
              :pack="TextAlignments.CENTER">
      <span>Top Center</span>
    </FlexItem>
    <FlexContainer :grow="1"
                   :align="FlexAlignments.STRETCH">
      <FlexItem :align="FlexAlignments.CENTER">
        <div style="background-color: dodgerblue; color: white; text-align: right;">
          Right Center
        </div>
      </FlexItem>
      <FlexContainer :direction="FlexDirections.COLUMN"
                     :grow="2">
        <JefTitle title="Contacts"
                  :grow="0">
          <template #tools>
            <button>Button 1</button>
            <button>Button 2</button>
          </template>
        </JefTitle>
        <JefGrid :columns="columns"
                 :store="viewStore"
                 :multi-sort="true" />
      </FlexContainer>
    </FlexContainer>
    <FlexItem :grow="0"
              :pack="TextAlignments.CENTER">
      <span>Bottom Center</span>
    </FlexItem>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import FlexItem from '@/components/base/FlexItem.vue';
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

export default defineComponent({
  name: 'ContactsGrid',
  components: {JefTitle, JefGrid, FlexItem, FlexContainer},
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

<style scoped>

</style>
