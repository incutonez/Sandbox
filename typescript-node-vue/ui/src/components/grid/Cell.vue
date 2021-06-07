<template>
  <template v-if="column.columns">
    <FlexContainer :grow="column.flex"
                   background-color="transparent"
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
              :border="border"
              @click="onClickCell">
      <Icon v-if="isExpander"
            :icon-name="iconName"></Icon>
      <template v-if="values !== ''">
        <div v-for="(value, index) in values"
             :key="index"
             :class="index > 0 ? 'expandable' : ''">
          {{ value }}
        </div>
      </template>
      <template v-else>
        <div>&nbsp;</div>
      </template>
    </FlexItem>
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import utilities from '@/utilities';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';
import _ from 'lodash';
import Formatters from '@/statics/Formatters';
import FlexItem from '@/components/base/FlexItem.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';

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
      type: Array,
      default: () => {
        return ['grid-cell'];
      }
    },
    border: {
      type: [String, Boolean],
      default: 'b r'
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
    values(): any {
      const Column = this.column;
      if (this.isExpander) {
        return '';
      }
      const Record = this.record;
      let formatter = Column.formatter || _.identity;
      if (_.isString(formatter)) {
        formatter = (Formatters as PlainObject)[formatter];
      }
      const Fields = Column.field.split('.');
      let values = Record[Fields[0]];
      if (utilities.isEmpty(values)) {
        return '';
      }
      for (let i = 1; i < Fields.length; i++) {
        const Field = Fields[i];
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
        return formatter(value);
      });
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
