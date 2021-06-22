<template>
  <JefWindow :height="height"
             :width="width"
             title="Edit Application"
             :view-loading="viewLoading"
             @close="onCloseWindow">
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

export default defineComponent({
  name: 'ApplicationDetails',
  components: {
    FlexContainer,
    JefButton,
    JefWindow
  },
  data() {
    return {
      height: '90%',
      width: '90%',
      loading: false,
      viewRecord: new Application()
    };
  },
  methods: {
    async loadViewRecord(params: IRouteParams) {
      try {
        this.loading = true;
        await this.viewRecord.load({
          url: `${this.viewRecord.url}/${params.Id}`,
          method: 'get'
        });
        console.log(this.viewRecord);
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
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler(currentPath: IRouteArg, from: IRouteArg) {
        this.loadViewRecord(currentPath.params);
      }
    }
  }
});
</script>

<style scoped>

</style>
