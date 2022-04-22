<template>
  <JefWindow
    title="Edit Application"
    :height="height"
    :width="width"
    :view-loading="viewLoading"
    :drag-constrain="true"
    @close="onCloseWindow"
  >
    <template #body>
      <FlexContainer :grow="1">
        <FlexContainer
          :direction="FlexDirections.COLUMN"
          :align="FlexAlignments.AUTO"
          :width="300"
          margin="0 20px 0 0"
        >
          <JefField
            v-model="viewRecord.Id"
            label="Id"
            :disabled="true"
          />
          <JefField
            v-model="viewRecord.Position"
            label="Position"
          />
          <ComboBox
            v-model="viewRecord.PositionType"
            label="Position Type"
            :store="Enums.PositionTypes"
          />
          <JefField
            v-model="viewRecord.Link"
            label="Link"
          />
          <ComboBox
            v-model="selectedCompany"
            label="Company"
            value-key="Id"
            display-key="Name"
            :store="companiesStore"
          />
          <ComboBox
            v-model="viewRecord.Contacts"
            label="Contacts"
            value-key="Id"
            display-key="Name"
            association-key="Id"
            :multiselect="true"
            :store="contactsStore"
          />
        </FlexContainer>
        <JefGrid
          :store="viewRecord.Contacts"
          :columns="contactsColumns"
          title="Contacts"
          :grow="1"
        />
      </FlexContainer>
    </template>
    <template #toolbar>
      <FlexContainer
        :pack="FlexJustifications.END"
        border="t"
        :padding="5"
      >
        <JefButton
          :icon="Icons.CHECK"
          text="Save"
          @click="onClickSaveButton"
        />
      </FlexContainer>
    </template>
  </JefWindow>
</template>

<script lang="ts">
import JefWindow from "ui/components/base/Window.vue";
import { defineComponent } from "vue";
import JefButton from "ui/components/base/Button.vue";
import FlexContainer from "ui/components/base/FlexContainer.vue";
import { IRouteArg, IRouteParams } from "ui/interfaces/Components";
import Application from "ui/models/Application";
import JefField from "ui/components/base/Field.vue";
import JefGrid from "ui/components/base/Grid.vue";
import IColumn from "ui/interfaces/IColumn";
import ComboBox from "ui/components/base/ComboBox.vue";
import Store from "ui/classes/Store";
import Company from "ui/models/Company";
import IStore from "ui/interfaces/IStore";
import IContact from "ui/interfaces/IContact";
import Contact from "ui/models/Contact";

export default defineComponent({
  name: "ApplicationDetails",
  components: {
    ComboBox,
    JefGrid,
    JefField,
    FlexContainer,
    JefButton,
    JefWindow,
  },

  /* We use this hook instead of watching the params because there was an issue when we close the
   * dialog... we actually push a new route onto the history, which triggered the watch to run, but
   * it didn't have the proper params.  Could've put in a safer check, but this hook only fires when
   * the route is changed in the URL */
  beforeRouteUpdate(currentRoute: IRouteArg): void {
    this.loadViewRecord(currentRoute.params);
  },

  data(): {
    viewRecord: Application;
    contactsColumns: IColumn[];
    height: string | number;
    width: string | number;
    loading: boolean;
    companiesStore: Store<Company>,
    contactsStore: IStore<IContact>
    } {
    return {
      // Create a dummy record so binding is OK
      viewRecord: new Application(),
      height: "90%",
      width: "90%",
      loading: false,
      companiesStore: new Store(Company, {
        autoLoad: true,
      }),
      contactsStore: new Store(Contact, {
        autoLoad: true,
      }),
      contactsColumns: [{
        text: "Name",
        field: "Name",
      }, {
        text: "Recruiter",
        field: "IsRecruiter",
      }, {
        text: "Email",
        field: "Email",
      }] as IColumn[],
    };
  },

  computed: {
    viewLoading(): boolean {
      return this.loading;
    },
    selectedCompany: {
      get(): number | null {
        const company = this.viewRecord.Company;
        return company && company.Id;
      },
      set(value: number | undefined) {
        const company = this.viewRecord.Company;
        if (company) {
          company.set("Id", value);
        }
      },
    },
  },

  created() {
    /* Because beforeRouteUpdate only fires when the route is updated after the view's been created,
     * we have to call this method manually */
    this.loadViewRecord(this.$route.params);
  },

  methods: {
    async loadViewRecord(params: IRouteParams) {
      try {
        this.loading = true;
        const viewRecord = new Application();
        await viewRecord.load({
          url: `${viewRecord.url}/${params.Id}`,
          method: "get",
        });
        this.viewRecord = viewRecord;
      }
      catch (ex) {
        console.error(ex);
      }
      this.loading = false;
    },

    onCloseWindow() {
      this.$router.push({
        name: "applicationSearch",
      });
    },
    async onClickSaveButton() {
      this.loading = true;
      await this.viewRecord.save();
      this.loading = false;
    },
  },
});
</script>

<style scoped>

</style>
