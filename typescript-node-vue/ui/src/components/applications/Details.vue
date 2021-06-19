<template>
  <JefWindow :height="height"
             :width="width"
             @close="onCloseWindow">
    <template #title>
      <JefTitle title="Edit Application"
                :closable="true"
                :border="false"
                @close="onCloseWindow" />
    </template>
  </JefWindow>
</template>

<script>
import JefWindow from '../base/Window';
import JefTitle from '../base/Title';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ApplicationDetails',
  components: {
    JefTitle,
    JefWindow
  },
  data() {
    return {
      height: '90%',
      width: '90%'
    };
  },
  methods: {
    onCloseWindow() {
      this.$router.push({
        name: 'applicationSearch'
      });
    }
  }
});
</script>

<style scoped>

</style>
