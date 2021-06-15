<template>
  <FlexContainer v-bind="$props"
                 :direction="FlexDirections.COLUMN"
                 cmp="form">
    <slot name="default" />
    <FlexContainer border="t"
                   :padding="5"
                   :pack="FlexAlignments.END"
                   :hidden="hideBottomToolbar">
      <JefButton text="Reset"
                 :hidden="hideResetBtn"
                 :margin="hideSearchBtn && hideClearBtn ? 0 : '0 5px 0 0'"
                 @click="onClickResetButton" />
      <JefButton text="Clear"
                 :hidden="hideClearBtn"
                 :margin="hideSearchBtn ? 0 : '0 5px 0 0'"
                 @click="onClickClearButton" />
      <JefButton text="Search"
                 :hidden="hideSearchBtn"
                 @click="onClickSearchButton" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {Component, defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections} from '@/statics/Flex';
import JefButton from '@/components/base/Button.vue';
import JefField from '@/components/base/Field.vue';
import utilities from '@/utilities';
import mitt from 'mitt';


export default defineComponent({
  name: 'SearchForm',
  extends: FlexContainer,
  emits: [
    'search'
  ],
  components: {
    JefButton,
    FlexContainer
  },
  provide() {
    return {
      eventBus: this.eventBus,
      register: (field: Component) => {
        this.fields.push(field);
      },
      unregister: (field: Component) => {
        utilities.remove(this.fields, field);
      }
    };
  },
  props: {
    hideSearchBtn: {
      type: Boolean,
      default: true
    },
    hideClearBtn: {
      type: Boolean,
      default: true
    },
    hideResetBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      FlexAlignments: FlexAlignments,
      FlexDirections: FlexDirections,
      fields: [] as Component[],
      eventBus: mitt()
    };
  },
  computed: {
    hideBottomToolbar(): boolean {
      return this.hideSearchBtn && this.hideClearBtn && this.hideResetBtn;
    }
  },
  methods: {
    onClickClearButton(cmp: typeof JefButton, event: EventTarget) {
      const fields = this.fields as typeof JefField[];
      fields.forEach((field) => {
        field.clear();
      });
    },
    onClickResetButton(cmp: typeof JefButton, event: EventTarget) {
      const fields = this.fields as typeof JefField[];
      fields.forEach((field) => {
        field.reset();
      });
    },
    onKeyUpSearchField() {
      this.$emit('search');
    },
    onClickSearchButton(cmp: typeof JefButton, event: EventTarget) {
      this.$emit('search');
    }
  },
  created() {
    this.eventBus.on('press:enter', this.onKeyUpSearchField);
  },
  unmounted() {
    this.eventBus.off('press:enter', this.onKeyUpSearchField);
  }
});
</script>

<style scoped>

</style>
