<template>
  <FlexContainer>
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
      <JefField v-model="search.Email"
                label="Email" />
      <JefField v-model="search.CompanyId"
                label="Company" />
      <JefField v-model="search.ApplicationId"
                label="Application" />
      <JefCheckbox v-model="search.IsRecruiter"
                   label="Recruiter" />
      <JefSpacer />
    </SearchForm>
    <FlexContainer extra-cls="right"
                   :grow="2"
                   :direction="FlexDirections.COLUMN">
      <JefTitle title="Contacts"
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
import {
  TextAlignments
} from '@/statics/Flex';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import JefGrid from '@/components/base/Grid.vue';
import JefTitle from '@/components/base/Title.vue';
import Contact from '@/models/Contact';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefField from '@/components/base/Field.vue';
import JefCheckbox from '@/components/base/Checkbox.vue';
import JefSpacer from '@/components/base/Spacer.vue';
import SearchForm from '@/components/base/SearchForm.vue';
import JefButton from '@/components/base/Button.vue';

export default defineComponent({
  name: 'ContactsSearch',
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
      viewStore: new Store(Contact, {
        sorters: [{
          field: 'Name',
          direction: 'DESC'
        }]
      }),
      search: {
        Name: 'kev',
        Email: null,
        CompanyId: null,
        ApplicationId: null,
        IsRecruiter: null
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
          field: 'Company.Name'
        }, {
          text: 'Recruitment',
          field: 'Company.IsRecruitment',
          type: ColumnTypes.Boolean,
          formatter: 'boolIcon',
          align: TextAlignments.CENTER,
          width: 100
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
  methods: {
    async loadViewStore() {
      try {
        await this.viewStore.load({
          url: 'api/contacts/search',
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
