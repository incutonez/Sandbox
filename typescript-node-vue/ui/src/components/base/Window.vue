<template>
  <FlexContainer :direction="FlexDirections.COLUMN"
                 background-color="#FFFFFF"
                 :class="cls"
                 :style="mainStyle"
                 @keyup.esc="onEscapeKey">
    <JefTitle :title="title"
              :title-flex="titleFlex"
              :closable="closable"
              @close="onClickCloseButton">
      <template #tools
                v-if="showTools">
        <slot name="tools" />
      </template>
    </JefTitle>
    <FlexContainer :grow="1"
                   :align="FlexAlignments.STRETCH"
                   :padding="bodyPadding">
      <slot name="body" />
    </FlexContainer>
    <slot name="toolbar" />
    <LoadingMask :hidden="!viewLoading" />
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import utilities from '@/utilities';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefTitle from '@/components/base/Title.vue';
import {ITitle} from '@/interfaces/Components';
import LoadingMask from '@/components/base/LoadingMask.vue';
import Draggable from '@/mixins/Draggable';

export default defineComponent({
  name: 'JefWindow',
  components: {
    LoadingMask,
    JefTitle,
    FlexContainer
  },
  mixins: [
    Draggable
  ],
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    height: {
      type: [String, Number],
      default: '80%'
    },
    width: {
      type: [String, Number],
      default: '80%'
    },
    // TODO: Use composition API, so we don't have to dupe this?
    title: {
      type: String,
      default: ''
    },
    titleFlex: {
      type: Number,
      default: 1
    },
    closable: {
      type: Boolean,
      default: true
    },
    viewLoading: {
      type: Boolean,
      default: false
    },
    bodyPadding: {
      type: [String, Number],
      default: 10
    }
  },
  emits: [
    'close'
  ],
  computed: {
    cls(): string {
      const cls = ['jef-window'];
      if (this.draggable) {
        cls.push('jef-window-draggable');
      }
      return cls.join(' ');
    },
    mainStyle(): string {
      const height = utilities.convertToPx(this.height);
      const width = utilities.convertToPx(this.width);
      const top = `calc((${innerHeight}px - ${utilities.convertToPx(height)}) / 2 + ${pageYOffset}px)`;
      const left = `calc((${innerWidth}px - ${utilities.convertToPx(width)}) / 2 + ${pageXOffset}px)`;
      return `background-color: #FFFFFF; height: ${height}; width: ${width}; top: ${top}; left: ${left};`;
    },
    showTools(): boolean {
      return this.closable || !!this.$slots.tools;
    }
  },
  methods: {
    onClickCloseButton(title: ITitle, event: KeyboardEvent) {
      this.$emit('close', this, event);
    },
    onEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.$emit('close', this, event);
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

<style scoped
       lang="scss">
.jef-window {
  z-index: 999;
  position: fixed;
  box-shadow: $window-box-shadow;

  &.jef-window-draggable .jef-title {
    cursor: move;
  }
}
</style>
