<template>
  <FlexContainer v-if="column.columns"
                 :grow="column.width ? 0 : column.flex"
                 :width="column.width"
                 :background-color="false"
                 :class="extraCls"
                 :border="border">
    <JefGridCell v-for="(cell, rowIdx) in column.columns"
                 :key="rowIdx"
                 :record="record"
                 :border="rowIdx + 1 === column.columns.length ? false : 'r'"
                 :column="cell" />
  </FlexContainer>
  <FlexContainer v-else
                 :direction="FlexDirections.COLUMN"
                 :grow="column.width ? 0 : column.flex"
                 :border="border"
                 :pack="FlexJustifications.START"
                 :background-color="false"
                 :class="extraCls"
                 :width="column.width"
                 @click="onClickCell">
    <Icon v-if="showExpander"
          :icon-name="iconName"
          class="grid-cell-icon"
          :style="`text-align: ${column.align};`" />
    <template v-if="values">
      <div v-for="(value, idx) in values"
           :key="idx"
           :class="idx === 0 ? 'grid-cell' : 'grid-cell expandable'"
           :style="`text-align: ${column.align};`">
        <template v-if="utilities.isObject(value)">
          <component :is="value.cmp"
                     v-bind="value.props" />
        </template>
        <template v-else>
          {{ value }}
        </template>
      </div>
    </template>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import utilities from '@/utilities';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';
import Formatters from '@/statics/Formatters';
import FlexContainer from '@/components/base/FlexContainer.vue';
import IColumn from '@/interfaces/IColumn';

interface PlainObject {
  [key: string]: any;
}

export default defineComponent({
  name: 'JefGridCell',
  components: {
    FlexContainer,
    Icon
  },
  props: {
    /**
     * @property
     * This gets applied to the th tag in the class property
     */
    cls: {
      type: String,
      default: ''
    },
    border: {
      type: [String, Boolean],
      default: 'b r'
    },
    // TODO: Rename to RowCfg
    column: {
      type: Object as PropType<IColumn>,
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
      isExpanded: false,
      utilities: utilities
    };
  },
  computed: {
    showExpander(): boolean {
      return this.isExpander && this.values;
    },
    isExpander(): boolean {
      return this.column.type === ColumnTypes.Expander;
    },
    // TODO: Add formatter for dates and such?
    values(): any {
      const column = this.column;
      const record = this.record;
      const formatter = column.formatter;
      let formatterFn: (value: any, record?: any) => {} = utilities.identityFn;
      if (utilities.isString(formatter)) {
        formatterFn = (Formatters as PlainObject)[formatter];
      }
      else {
        formatterFn = formatter as (value: any) => {};
      }
      if (this.isExpander) {
        return formatterFn(true, record);
      }
      const fields = column.field.split('.');
      let values = record[fields[0]];
      if (utilities.isEmpty(values)) {
        return '';
      }
      for (let i = 1; i < fields.length; i++) {
        const Field = fields[i];
        if (Array.isArray(values)) {
          const out: any[] = [];
          values.forEach((item) => {
            // Can only have an object or just a plain ole array
            if (utilities.isObject(item)) {
              out.push((item as PlainObject)[Field]);
            }
            else {
              out.push(item);
            }
          });
          values = out;
        }
        else {
          values = values[Field];
        }
      }
      values = Array.isArray(values) ? values : [values];
      return values.map((value: any) => {
        return formatterFn(value);
      });
    },
    iconName(): string {
      if (this.column.type === ColumnTypes.Expander) {
        return this.isExpanded ? Icons.MINUS : Icons.PLUS;
      }
      return '';
    },
    extraCls(): string {
      return this.column.hidden ? 'grid-cell-hidden' : '';
    }
  },
  methods: {
    onClickCell(event: Event) {
      if (this.column.type === ColumnTypes.Expander) {
        if (utilities.isIconTag(event) && event.target) {
          const target: HTMLElement = event.target as HTMLElement;
          const parent = target.parentElement?.parentElement;
          if (parent) {
            this.isExpanded = !this.isExpanded;
            if (this.isExpanded) {
              parent.classList.add('expand-row');
            }
            else {
              parent.classList.remove('expand-row');
            }
          }
        }
      }
    }
  }
});
</script>
