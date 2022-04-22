<template>
  <FlexContainer>
    <SearchForm
      :direction="FlexDirections.COLUMN"
      :width="300"
      :margin="'0 10px 0 0'"
      :hide-clear-btn="false"
      :hide-search-btn="false"
      :hide-reset-btn="false"
      title="Search"
      @search="onClickSearchBtn"
    >
      <JefField
        v-model="search.Name"
        label="Name"
      />
      <JefField
        v-model="search.CreateDate"
        type="date"
        label="Create Date"
      />
      <JefField
        v-model="search.ContactId"
        label="Contact"
        :hidden="true"
      />
      <JefField
        v-model="search.ApplicationId"
        label="Application"
        :hidden="true"
      />
      <JefCheckbox
        v-model="search.IsRecruitment"
        label="Recruiter"
      />
      <JefSpacer />
    </SearchForm>
    <FlexContainer
      extra-cls="right"
      :grow="2"
      :direction="FlexDirections.COLUMN"
    >
      <JefGrid
        :columns="columns"
        :store="viewStore"
        :grow="1"
        title="Companies"
        :multi-sort="true"
      >
        <template #tools>
          <JefField
            label="Search"
            margin="0 5px 0 0"
            :label-width="65"
            :width="250"
          />
          <JefButton
            :icon="Icons.PLUS"
            text="Company"
            margin="0 5px 0 0"
            @click="onClickAddCompany"
          />
          <JefButton
            :icon="Icons.REFRESH"
            :icon-only="true"
            @click="onClickRefreshButton"
          />
        </template>
      </JefGrid>
    </FlexContainer>
    <RouterView />
  </FlexContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TextAlignments } from "ui/statics/Flex";
import Store from "ui/classes/Store";
import ColumnTypes from "ui/statics/ColumnTypes";
import JefGrid from "ui/components/base/Grid.vue";
import FlexContainer from "ui/components/base/FlexContainer.vue";
import JefField from "ui/components/base/Field.vue";
import JefCheckbox from "ui/components/base/Checkbox.vue";
import JefSpacer from "ui/components/base/Spacer.vue";
import SearchForm from "ui/components/base/SearchForm.vue";
import JefButton from "ui/components/base/Button.vue";
import Company from "ui/models/Company";
import ChildRoute from "ui/mixins/ChildRoute";
import { IFieldValue } from "ui/interfaces/Components";
import Icons from "ui/statics/Icons";

export default defineComponent({
  name: "CompaniesSearch",
  components: {
    JefButton,
    SearchForm,
    JefSpacer,
    JefCheckbox,
    JefField,
    FlexContainer,
    JefGrid,
  },
  mixins: [ChildRoute],

  data() {
    return {
      viewStore: new Store(Company),
      baseRoutes: ["companySearch"],
      search: {
        Name: "town",
        CreateDate: null,
        // TODO: Wire up
        ContactId: null,
        // TODO: Wire up
        ApplicationId: null,
        IsRecruitment: null,
      },
      columns: [{
        type: ColumnTypes.Expander,
        width: 24,
        align: TextAlignments.CENTER,
        formatter: function(value: boolean, record: Company) {
          return record.showExpander();
        },
      }, {
        type: ColumnTypes.Action,
        width: 65,
        formatter: (value: IFieldValue, record: Company) => {
          const editAction = Icons.getActionIcon({
            icon: Icons.EDIT,
            handlers: {
              click: () => {
                this.$router.push({
                  name: "companyDetails",
                  params: {
                    Id: record.Id,
                  },
                });
              },
            },
          });
          const deleteAction = Icons.getActionIcon({
            icon: Icons.DELETE,
            handlers: {
              click: () => {
                // TODO: impl
              },
            },
          });
          return [editAction, deleteAction];
        },
      }, {
        text: "Id",
        field: "Id",
        type: ColumnTypes.Number,
        align: TextAlignments.RIGHT,
        width: 50,
      }, {
        text: "Name",
        field: "Name",
      }, {
        text: "Recruitment",
        field: "IsRecruitment",
        type: ColumnTypes.Boolean,
        formatter: "boolIcon",
        align: TextAlignments.CENTER,
        width: 100,
      }, {
        text: "Contacts",
        flex: 1,
        columns: [{
          text: "Name",
          field: "Contacts.Name",
        }, {
          text: "Recruiter",
          field: "Contacts.IsRecruiter",
          type: ColumnTypes.Boolean,
          formatter: "boolIcon",
          align: TextAlignments.CENTER,
        }, {
          text: "Email",
          field: "Contacts.Email",
        }],
      }, {
        text: "Applications",
        flex: 1,
        columns: [{
          text: "Id",
          field: "Applications.Id",
          type: ColumnTypes.Number,
          align: TextAlignments.RIGHT,
        }, {
          text: "Position",
          field: "Applications.Position",
        }, {
          text: "Position Type",
          field: "Applications.positionTypeDisplay",
        }, {
          text: "Link",
          field: "Applications.Link",
        }],
      }, {
        text: "Create Date",
        field: "CreateDate",
        formatter: "mmddyyyy",
        align: TextAlignments.RIGHT,
        width: 100,
      }],
    };
  },

  async created() {
    await this.loadViewStore();
  },

  methods: {
    async loadViewStore() {
      try {
        await this.viewStore.load({
          url: "api/companies/search",
          method: "post",
          params: this.search,
        });
      }
      catch (ex) {
        console.error(ex);
      }
    },

    onClickAddCompany() {
      this.$router.push({
        name: "companyCreate",
      });
    },

    onClickRefreshButton() {
      this.loadViewStore();
    },

    onClickSearchBtn() {
      this.loadViewStore();
    },
  },
});
</script>

<style scoped
       lang="scss">
</style>
