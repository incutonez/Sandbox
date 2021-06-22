<template>
  <FlexContainer :border="false"
                 :class="mainCls">
    <SearchForm :direction="FlexDirections.COLUMN"
                :width="300"
                :margin="'0 10px 0 0'"
                title="Search"
                :hide-clear-btn="false"
                :hide-search-btn="false"
                :hide-reset-btn="false"
                @search="onClickSearchBtn">
      <JefField v-model="search.Position"
                label="Position" />
      <JefField v-model="search.PositionType"
                label="Position Type" />
      <JefField v-model="search.Link"
                label="Link" />
      <JefField v-model="search.CreateDate"
                label="Create Date"
                type="date" />
      <JefCheckbox v-model="search.CompanyId"
                   label="Company"
                   :hidden="true" />
      <JefSpacer />
    </SearchForm>
    <FlexContainer extra-cls="right"
                   :grow="2"
                   :border="false"
                   :direction="FlexDirections.COLUMN">
      <JefTitle title="Applications"
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
  <RouterView />
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
import ICompany from '@/interfaces/ICompany';
import Application from '@/models/Application';
import IApplication from '@/interfaces/IApplication';
import Formatters from '@/statics/Formatters';
import Icons from '@/statics/Icons';
import {IButton} from '@/interfaces/Components';

export default defineComponent({
  name: 'ApplicationsSearch',
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
      viewStore: new Store(Application),
      search: {
        Position: null,
        PositionType: null,
        Link: null,
        CreateDate: null,
        // TODO: Wire up
        CompanyId: null
      },
      columns: [{
        type: ColumnTypes.Expander,
        width: 24,
        align: FlexAlignments.CENTER,
        formatter(value: boolean, record: ICompany) {
          return record.showExpander();
        }
      }, {
        type: ColumnTypes.Action,
        width: 65,
        formatter: (value: any, record: IApplication) => {
          const editAction = Icons.getActionIcon({
            icon: Icons.EDIT,
            disabled: record.canEdit(),
            handlers: {
              click: (button: IButton, event: Event) => {
                this.$router.push({
                  name: 'applicationDetails',
                  params: {
                    Id: record.Id
                  }
                });
              }
            }
          });
          const deleteAction = Icons.getActionIcon({
            icon: Icons.DELETE,
            disabled: record.canDelete(),
            handlers: {
              click: (button: IButton, event: EventTarget) => {
                console.log(button, event);
              }
            }
          });
          return [editAction, deleteAction];
        }
      }, {
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number,
        align: TextAlignments.RIGHT,
        width: 50
      }, {
        text: 'Position',
        field: 'Position'
      }, {
        text: 'Position Type',
        field: 'PositionType'
      }, {
        text: 'Link',
        field: 'Link'
      }, {
        text: 'Company',
        flex: 2,
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
        text: 'Contacts',
        flex: 2,
        columns: [{
          text: 'Name',
          field: 'Contacts.Name',
          formatter: 'dashIfNull'
        }, {
          text: 'Recruiter',
          field: 'Contacts.IsRecruiter',
          type: ColumnTypes.Boolean,
          align: TextAlignments.CENTER,
          width: 80,
          formatter(value: any, record: IApplication) {
            return Formatters.dashIfNull(value, record, 'boolIcon');
          }
        }, {
          text: 'Email',
          field: 'Contacts.Email',
          formatter: 'dashIfNull'
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
  computed: {
    mainCls(): string {
      return this.$route.matched.some(({name}) => name === 'applicationDetails') ? 'route-enabled' : '';
    }
  },
  methods: {
    async loadViewStore() {
      try {
        await this.viewStore.load({
          url: `${this.viewStore.url}/search`,
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
