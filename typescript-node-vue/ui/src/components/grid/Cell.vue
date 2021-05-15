<template>
  <td :class="clsFm"
      v-html="value"
      @click="onClickCell" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import utilities from '@/utilities';
import Icons from '@/statics/Icons';

export default defineComponent({
  name: 'Cell',
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
    value(): any {
      const Column = this.column;
      if (Column.type === ColumnTypes.Expander) {
        return this.isExpanded ? Icons.MINUS : Icons.PLUS;
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
