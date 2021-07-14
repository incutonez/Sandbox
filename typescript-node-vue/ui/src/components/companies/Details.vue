<template>
  <JefWindow :title="viewTitle"
             width="300px"
             :view-loading="viewLoading"
             @close="onCloseWindow">
    <template #body>
      <FlexContainer :grow="1"
                     :direction="FlexDirections.COLUMN">
        <JefField v-model="viewRecord.Name"
                  label="Name"
                  :layout="FlexDirections.COLUMN" />
        <JefCheckbox v-model="viewRecord.IsRecruitment"
                     label="Is Recruitment"
                     :layout="FlexDirections.COLUMN" />
        <ComboBox v-model="viewRecord.Contacts"
                  :multiselect="true"
                  :layout="FlexDirections.COLUMN"
                  :store="contactsStore"
                  value-key="Id"
                  display-key="Name"
                  association-key="Id"
                  label="Contacts" />
        <ComboBox v-model="viewRecord.Applications"
                  :multiselect="true"
                  :layout="FlexDirections.COLUMN"
                  :store="applicationsStore"
                  value-key="Id"
                  display-key="Position"
                  association-key="Id"
                  label="Applications" />
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
import {defineComponent} from 'vue';
import JefWindow from '@/components/base/Window.vue';
import Company from '@/models/Company';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefField from '@/components/base/Field.vue';
import JefCheckbox from '@/components/base/Checkbox.vue';
import JefButton from '@/components/base/Button.vue';
import {IRouteParams} from '@/interfaces/Components';
import ComboBox from '@/components/base/ComboBox.vue';
import Store from '@/classes/Store';
import Contact from '@/models/Contact';
import Application from '@/models/Application';

export default defineComponent({
  name: 'CompaniesDetails',
  components: {
    ComboBox,
    JefButton,
    JefCheckbox,
    JefField,
    FlexContainer,
    JefWindow
  },

  created() {
    /* Because beforeRouteUpdate only fires when the route is updated after the view's been created,
     * we have to call this method manually */
    this.loadViewRecord(this.$route.params);
  },

  data() {
    return {
      contactsStore: new Store(Contact, {
        autoLoad: true
      }),
      applicationsStore: new Store(Application, {
        autoLoad: true
      }),
      loading: false,
      viewRecord: new Company()
    };
  },

  computed: {
    viewLoading(): boolean {
      return this.loading;
    },
    viewTitle(): string {
      const action = this.viewRecord.exists ? 'Edit' : 'Create';
      return `${action} Company`;
    }
  },

  methods: {
    async loadViewRecord(params: IRouteParams) {
      if (params.Id) {
        try {
          this.loading = true;
          const viewRecord = new Company({
            Id: params.Id
          });
          await viewRecord.load({});
          this.viewRecord = viewRecord;
        }
        catch (ex) {
          console.exception(ex);
        }
        this.loading = false;
      }
    },

    onCloseWindow() {
      this.$router.push({
        name: 'companySearch'
      });
    },

    async onClickSaveButton() {
      this.loading = true;
      await this.viewRecord.save();
      this.loading = false;
    }
  }
});
</script>

<style scoped>

</style>
