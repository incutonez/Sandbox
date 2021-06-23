<template>
  <JefWindow :height="height"
             :width="width"
             title="Edit Application"
             :view-loading="viewLoading"
             @close="onCloseWindow">
    <template #body>
      <FlexContainer :grow="1">
        <FlexContainer :direction="FlexDirections.COLUMN"
                       :align="FlexAlignments.AUTO"
                       :width="300"
                       margin="0 20px 0 0">
          <JefField label="Id"
                    :disabled="true"
                    v-model="viewRecord.Id" />
          <JefField label="Position"
                    v-model="viewRecord.Position" />
          <JefField v-model="viewRecord.PositionType"
                    label="Position Type"
                    type="number" />
          <JefField label="Link"
                    v-model="viewRecord.Link" />
          <JefField v-model="selectedCompany"
                    label="Company"
                    type="number" />
        </FlexContainer>
        <JefGrid :store="viewRecord.Contacts"
                 :columns="contactsColumns"
                 title="Contacts"
                 :grow="1" />
      </FlexContainer>
    </template>
    <template #toolbar>
      <FlexContainer :pack="FlexJustifications.END"
                     border="t"
                     :padding="5">
        <JefButton :icon="Icons.CHECK"
                   text="Save"
                   @click="onClickSaveButton" />
      </FlexContainer>
    </template>
  </JefWindow>
</template>

<script lang="ts">
import JefWindow from '@/components/base/Window.vue';
import {defineComponent} from 'vue';
import JefButton from '@/components/base/Button.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {IRouteArg, IRouteParams} from '@/interfaces/Components';
import Application from '@/models/Application';
import JefField from '@/components/base/Field.vue';
import JefGrid from '@/components/base/Grid.vue';
import IApplication from '@/interfaces/IApplication';
import IColumn from '@/interfaces/IColumn';

export default defineComponent({
  name: 'ApplicationDetails',
  components: {
    JefGrid,
    JefField,
    FlexContainer,
    JefButton,
    JefWindow
  },
  data(): {
    viewRecord: IApplication,
    height: string,
    width: string,
    loading: boolean,
    contactsColumns: IColumn[]
  } {
    return {
      height: '90%',
      width: '90%',
      loading: false,
      // Create a dummy record so binding is OK
      viewRecord: new Application(),
      contactsColumns: [{
        text: 'Name',
        field: 'Name'
      }, {
        text: 'Recruiter',
        field: 'IsRecruiter'
      }, {
        text: 'Email',
        field: 'Email'
      }] as IColumn[]
    };
  },
  methods: {
    async loadViewRecord(params: IRouteParams) {
      try {
        this.loading = true;
        const viewRecord = new Application();
        await viewRecord.load({
          url: `${viewRecord.url}/${params.Id}`,
          method: 'get'
        });
        this.viewRecord = viewRecord;
      }
      catch (ex) {
        console.exception(ex);
      }
      this.loading = false;
    },

    onCloseWindow() {
      this.$router.push({
        name: 'applicationSearch'
      });
    },

    onClickSaveButton() {
      this.loading = true;
    }
  },

  computed: {
    viewLoading(): boolean {
      return this.loading;
    },
    selectedCompany: {
      get(): number | undefined {
        const company = this.viewRecord.Company;
        return company && company.Id;
      },
      set(value) {
        this.viewRecord.set('Company', value);
      }
    }
  },

  /* We use this hook instead of watching the params because there was an issue when we close the
   * dialog... we actually push a new route onto the history, which triggered the watch to run, but
   * it didn't have the proper params.  Could've put in a safer check, but this hook only fires when
   * the route is changed in the URL */
  beforeRouteUpdate(currentRoute: IRouteArg): void {
    this.loadViewRecord(currentRoute.params);
  },

  created() {
    /* Because beforeRouteUpdate only fires when the route is updated after the view's been created,
     * we have to call this method manually */
    this.loadViewRecord(this.$route.params);
  }
});
</script>

<style scoped>

</style>
