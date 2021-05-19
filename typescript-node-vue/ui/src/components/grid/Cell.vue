<template>
  <td :class="clsFm"
      @click="onClickCell">
    <Icon v-if="isExpander"
          :icon-name="iconName"></Icon>
    <div v-if="value !== ''"
         v-html="value"></div>
  </td>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import utilities from '@/utilities';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'Cell',
  components: {
    Icon
  },
  props: {
    /**
     * @property
     * This gets applied to the th tag in the class property
     */
    cls: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // TODO: Rename to RowCfg
    column: {
      type: Object,
      default: () => {
        return {};
      }
    },
    record: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      isExpanded: false
    };
  },
  computed: {
    isExpander(): boolean {
      return this.column.type === ColumnTypes.Expander;
    },
    // TODO: Add formatter for dates and such?
    value(): any {
      const Column = this.column;
      if (this.isExpander) {
        return '';
      }
      const Record = this.record;
      const Field = Column.field.split('.');
      if (Array.isArray(Field)) {
        let value = Record[Field[0]];
        for (let i = 1; i < Field.length; i++) {
          const SubField = Field[i];
          if (Array.isArray(value)) {
            const out: Array<any> = [];
            value.forEach((item) => {
              // Can only have an object or just a plain ole array
              if (utilities.isObject(item)) {
                out.push(item[SubField]);
              }
              else {
                out.push(item);
              }
            });
            value = '<div>' + out.join('</div><div class="expandable">') + '</div>';
          }
          else {
            value = value[SubField];
          }
        }
        return value;
      }
      return Record[Field];
    },
    iconName(): string {
      if (this.column.type === ColumnTypes.Expander) {
        return this.isExpanded ? Icons.MINUS : Icons.PLUS;
      }
      return '';
    },
    clsFm(): any {
      const Cls = this.cls;
      switch (this.column.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          break;
      }
      return Cls.join(' ');
    }
  },
  methods: {
    onClickCell(event: Event) {
      if (this.column.type === ColumnTypes.Expander) {
        if (utilities.isIconTag(event)) {
          this.isExpanded = !this.isExpanded;
          if (this.isExpanded) {
            this.$parent?.$el.classList.add('expand-row');
          }
          else {
            this.$parent?.$el.classList.remove('expand-row');
          }
        }
      }
    }
  }
});
</script>

<style scoped
       lang="scss">
*::v-deep(.expandable) {
  display: none;
}
</style>
