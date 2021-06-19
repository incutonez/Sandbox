<template>
  <div class="jef-window"
       :style="mainStyle"
       @keyup.esc="onEscapeKey">
    <FlexContainer :direction="FlexDirections.COLUMN"
                   background-color="#FFFFFF"
                   :border="false">
      <slot name="title" />
      <slot name="body" />
      <slot name="toolbar" />
    </FlexContainer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import utilities from '@/utilities';
import FlexContainer from '@/components/base/FlexContainer.vue';

export default defineComponent({
  name: 'JefWindow',
  components: {
    FlexContainer
  },
  props: {
    height: {
      type: [String, Number],
      default: '80%'
    },
    width: {
      type: [String, Number],
      default: '80%'
    }
  },
  emits: [
    'close'
  ],
  computed: {
    mainStyle(): string {
      const height = utilities.convertToPx(this.height);
      const width = utilities.convertToPx(this.width);
      const top = `calc((${innerHeight}px - ${utilities.convertToPx(height)}) / 2 + ${pageYOffset}px)`;
      const left = `calc((${innerWidth}px - ${utilities.convertToPx(width)}) / 2 + ${pageXOffset}px)`;
      return `background-color: #FFFFFF; height: ${height}; width: ${width}; top: ${top}; left: ${left};`;
    }
  },
  methods: {
    onEscapeKey(event: KeyboardEvent) {
      event = event || window.event;
      let isEscape = false;
      if ('key' in event) {
        isEscape = (event.key === 'Escape' || event.key === 'Esc');
      }
      else {
        isEscape = (event.keyCode === 27);
      }
      if (isEscape) {
        this.$emit('close', this);
      }
    }
  },
  mounted() {
    document.addEventListener('keyup', this.onEscapeKey);
  },
  unmounted() {
    document.removeEventListener('keyup', this.onEscapeKey);
  }
});
</script>

<style scoped>
.jef-window {
  z-index: 999;
  position: fixed;
}
</style>
