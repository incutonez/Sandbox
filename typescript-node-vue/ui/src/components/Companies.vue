<template>
  <FlexContainer :border="false">
    <SearchForm :direction="FlexDirections.COLUMN"
                :width="300"
                :margin="'0 10px 0 0'"
                :hide-clear-btn="false"
                :hide-search-btn="false"
                :hide-reset-btn="false"
                title="Search"
                @search="onClickSearchBtn">
      <JefField v-model="search.Name"
                label="Name" />
      <JefField v-model="search.CreateDate"
                type="date"
                label="Create Date" />
      <JefField v-model="search.ContactId"
                label="Contact"
                :hidden="true" />
      <JefField v-model="search.ApplicationId"
                label="Application"
                :hidden="true" />
      <JefCheckbox v-model="search.IsRecruitment"
                   label="Recruiter" />
      <JefSpacer />
    </SearchForm>
    <FlexContainer extra-cls="right"
                   :grow="2"
                   :border="false"
                   :direction="FlexDirections.COLUMN">
      <JefTitle title="Companies"
                :grow="0">
        <template #tools>
          <JefButton :icon="Icons.REFRESH"
                     :icon-only="true"
                     @click="onClickRefreshButton" />
        </template>
      </JefTitle>
      <JefGrid :columns="columns"
               :store="viewStore"
               :grow="1"
               :multi-sort="true" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {FlexAlignments, TextAlignments} from '@/statics/Flex';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import JefGrid from '@/components/base/Grid.vue';
import JefTitle from '@/components/base/Title.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefField from '@/components/base/Field.vue';
import JefCheckbox from '@/components/base/Checkbox.vue';
import JefSpacer from '@/components/base/Spacer.vue';
import SearchForm from '@/components/base/SearchForm.vue';
import JefButton from '@/components/base/Button.vue';
import Company from '@/models/Company';
import ICompany from '@/interfaces/ICompany';

export default defineComponent({
  name: 'CompaniesGrid',
  components: {
    JefButton,
    SearchForm,
    JefSpacer,
    JefCheckbox,
    JefField,
    FlexContainer,
    JefTitle,
    JefGrid
  },
  data() {
    return {
      viewStore: new Store(Company),
      search: {
        Name: 'town',
        CreateDate: null,
        // TODO: Wire up
        ContactId: null,
        // TODO: Wire up
        ApplicationId: null,
        IsRecruitment: null
      },
      columns: [{
        type: ColumnTypes.Expander,
        width: 24,
        align: FlexAlignments.CENTER,
        formatter: function(value: boolean, record: ICompany) {
          return record.showExpander();
        }
      }, {
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number,
        align: TextAlignments.RIGHT,
        width: 50
      }, {
        text: 'Name',
        field: 'Name'
      }, {
        text: 'Recruitment',
        field: 'IsRecruitment',
        type: ColumnTypes.Boolean,
        formatter: 'boolIcon',
        align: TextAlignments.CENTER,
        width: 100
      }, {
        text: 'Contacts',
        flex: 1,
        columns: [{
          text: 'Name',
          field: 'Contacts.Name'
        }, {
          text: 'Recruiter',
          field: 'Contacts.IsRecruiter',
          type: ColumnTypes.Boolean,
          formatter: 'boolIcon',
          align: TextAlignments.CENTER
        }, {
          text: 'Email',
          field: 'Contacts.Email'
        }]
      }, {
        text: 'Applications',
        flex: 1,
        columns: [{
          text: 'Id',
          field: 'Applications.Id',
          type: ColumnTypes.Number,
          align: TextAlignments.RIGHT
        }, {
          text: 'Position',
          field: 'Applications.Position'
        }, {
          text: 'Position Type',
          field: 'Applications.PositionType'
        }, {
          text: 'Link',
          field: 'Applications.Link'
        }]
      }, {
        text: 'Create Date',
        field: 'CreateDate',
        formatter: 'mmddyyyy',
        align: TextAlignments.RIGHT,
        width: 100
      }]
    };
  },
  methods: {
    async loadViewStore() {
      try {
        await this.viewStore.load({
          url: 'api/companies/search',
          params: this.search
        });
      }
      catch (ex) {
        console.exception(ex);
      }
    },
    onClickRefreshButton() {
      this.loadViewStore();
    },
    onClickSearchBtn() {
      this.loadViewStore();
    }
  },

  async created() {
    await this.loadViewStore();
  }
});
</script>

<style scoped
       lang="scss">
</style>
