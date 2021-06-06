<template>
  <FlexContainer :direction="FlexDirections.COLUMN"
                 height="100%"
                 width="100%">
    <FlexItem :grow="0"
              :pack="TextAlignments.CENTER">
      <span>Top Center</span>
    </FlexItem>
    <FlexContainer ref="blah"
                   :grow="1"
                   :align="FlexAlignments.STRETCH">
      <FlexItem :grow="2">
        <div style="background-color: tomato; color: white; text-align: left;">
          Left Top
        </div>
      </FlexItem>
      <FlexItem :align="FlexAlignments.CENTER">
        <div style="background-color: dodgerblue; color: white; text-align: right;">
          Right Center
        </div>
      </FlexItem>
    </FlexContainer>
    <FlexItem :grow="0"
              :pack="TextAlignments.CENTER">
      <span>Bottom Center</span>
    </FlexItem>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import FlexItem from '@/components/base/FlexItem.vue';
import {
  FlexAlignments,
  FlexContentAlignments,
  FlexDirections,
  FlexJustifications,
  TextAlignments
} from '@/statics/Flex';

export default defineComponent({
  name: 'FlexTest',
  components: {FlexItem, FlexContainer},
  data() {
    return {
      FlexDirections: FlexDirections,
      FlexJustifications: FlexJustifications,
      FlexAlignments: FlexAlignments,
      TextAlignments: TextAlignments,
      FlexContentAlignments: FlexContentAlignments
    };
  }
});
</script>

<style scoped>

</style>
