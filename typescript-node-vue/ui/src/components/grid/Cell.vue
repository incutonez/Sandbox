<template>
  <template v-if="column.columns">
    <FlexContainer :grow="column.width ? 0 : column.flex"
                   :basis="`${utilities.convertToPx(column.width)}`"
                   background-color="false"
                   border="b r">
      <JefGridCell v-for="(cell, rowIdx) in column.columns"
                   :key="rowIdx"
                   :record="record"
                   :border="rowIdx + 1 === column.columns.length ? false : 'r'"
                   :column="cell" />
    </FlexContainer>
  </template>
  <template v-else>
    <FlexItem :class="clsFm"
              :grow="column.flex"
              :shrink="column.shrink"
              :basis="column.basis"
              :width="column.width"
              :direction="column.direction"
              :border="border"
              :pack="column.align"
              cmp="span"
              @click="onClickCell">
      <Icon v-if="isExpander"
            :icon-name="iconName" />
      <template v-if="values !== ''">
        <component v-for="(value, index) in values"
                   :key="index"
                   :is="index > 0 ? 'div' : 'span'"
                   :class="index > 0 ? 'expandable' : ''">
          <!-- If we have an object, then that means we want to do custom component rendering-->
          <template v-if="utilities.isObject(value)">
            <component :is="value.cmp"
                       v-bind="value.props" />
          </template>
          <template v-else>
            {{ value }}
          </template>
        </component>
      </template>
      <template v-else>
        <div>&nbsp;</div>
      </template>
    </FlexItem>
  </template>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import utilities from '@/utilities';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';
import Formatters from '@/statics/Formatters';
import FlexItem from '@/components/base/FlexItem.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import IColumn from '@/interfaces/IColumn';

interface PlainObject {
  [key: string]: any;
}

export default defineComponent({
  name: 'JefGridCell',
  components: {
    FlexContainer,
    FlexItem,
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
    isExpander(): boolean {
      return this.column.type === ColumnTypes.Expander;
    },
    // TODO: Add formatter for dates and such?
    values(): any {
      const column = this.column;
      if (this.isExpander) {
        return '';
      }
      const record = this.record;
      const formatter = column.formatter;
      let formatterFn: (value: any) => {} = utilities.identityFn;
      if (utilities.isString(formatter)) {
        formatterFn = (Formatters as PlainObject)[formatter];
      }
      else {
        formatterFn = formatter as (value: any) => {};
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
              out.push(item[Field]);
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
    clsFm(): any {
      const cls = ['grid-cell'];
      if (this.column.cellCls) {
        cls.push(this.column.cellCls);
      }
      switch (this.column.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          break;
      }
      return cls.join(' ');
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
