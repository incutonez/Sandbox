<template>
  <FlexContainer v-bind="$props"
                 :direction="FlexDirections.COLUMN"
                 cmp="form">
    <slot name="default" />
    <FlexContainer border="t"
                   :padding="5"
                   :pack="FlexAlignments.END"
                   :hidden="hideBottomToolbar">
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
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections} from '@/statics/Flex';
import JefButton from '@/components/base/Button.vue';

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
  props: {
    hideSearchBtn: {
      type: Boolean,
      default: true
    },
    hideClearBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      FlexAlignments: FlexAlignments,
      FlexDirections: FlexDirections
    };
  },
  computed: {
    hideBottomToolbar(): boolean {
      return this.hideSearchBtn && this.hideClearBtn;
    }
  },
  methods: {
    onClickClearButton(cmp: typeof JefButton, event: EventTarget) {
      // Figure out a better way of doing refs?
      // https://stackoverflow.com/questions/67977545
      const searchPanel = this.$refs.searchPanel as typeof FlexContainer;
      if (searchPanel) {
        // Don't know how to do this... https://www.reddit.com/r/vuejs/comments/o009h1/vue3_how_to_dynamically_access_children_of_a_slot/
        searchPanel.$el.reset();
      }
    },
    onClickSearchButton(cmp: typeof JefButton, event: EventTarget) {
      console.log(this.$slots);
      this.$emit('search');
    }
  }
});
</script>

<style scoped>

</style>
