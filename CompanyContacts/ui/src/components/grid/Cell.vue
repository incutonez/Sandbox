<template>
  <FlexContainer
    v-if="column.columns"
    :grow="column.width ? 0 : column.flex"
    :width="column.width"
    :background-color="false"
    :class="extraCls"
    :border="border"
  >
    <JefGridCell
      v-for="(cell, rowIdx) in column.columns"
      :key="rowIdx"
      :record="record"
      :border="getChildBorder(rowIdx, cell, column)"
      :column="cell"
    />
  </FlexContainer>
  <FlexContainer
    v-else
    :direction="column.getCellDirection()"
    :grow="column.width ? 0 : column.flex"
    :border="border"
    :pack="column.getCellPack()"
    :style="`text-align: ${column.getCellAlignment()};`"
    :background-color="false"
    :class="extraCls"
    :width="column.width"
    @click="onClickCell"
  >
    <Icon
      v-if="showExpander"
      :icon-name="iconName"
      class="grid-cell-icon"
    />
    <template v-if="values">
      <div
        v-for="(value, idx) in values"
        :key="idx"
        :class="getCellCls(value, idx)"
      >
        <template v-if="Utilities.isObject(value)">
          <component
            :is="value.cmp"
            v-bind="value.props"
            v-on="value.handlers || {}"
          />
        </template>
        <template v-else>
          {{ value }}
        </template>
      </div>
    </template>
  </FlexContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ColumnTypes from "ui/statics/ColumnTypes";
import utilities from "ui/utilities";
import Icons from "ui/statics/Icons";
import Icon from "ui/components/Icon.vue";
import Formatters from "ui/statics/Formatters";
import FlexContainer from "ui/components/base/FlexContainer.vue";
import JefButton from "ui/components/base/Button.vue";
import IColumn from "ui/interfaces/IColumn";
import { IFieldValue } from "ui/interfaces/Components";
import IModel from "ui/interfaces/IModel";
import IKeyValue from "@jef/shared/interfaces/IKeyValue";

type IFormatter = (value: IFieldValue, record: IModel) => {}

export default defineComponent({
  name: "JefGridCell",
  components: {
    FlexContainer,
    Icon,
    JefButton,
  },
  props: {
    /**
     * @property
     * This gets applied to the th tag in the class property
     */
    cls: {
      type: String,
      default: "",
    },
    border: {
      type: [String, Boolean],
      default: "b r",
    },
    // TODO: Rename to RowCfg
    column: {
      type: Object as PropType<IColumn>,
      default: () => {
        return {};
      },
    },
    record: {
      type: Object as PropType<IModel>,
      default: () => {
        return {};
      },
    },
  },
  data: () => {
    return {
      isExpanded: false,
    };
  },
  computed: {
    showExpander(): boolean {
      return this.isExpander && !!this.values;
    },
    isExpander(): boolean {
      return this.column.type === ColumnTypes.Expander;
    },
    isAction(): boolean {
      return this.column.type === ColumnTypes.Action;
    },
    // TODO: Add formatter for dates and such?
    values(): IFieldValue | IFieldValue[] {
      const column = this.column;
      const record = this.record;
      const formatter = column.formatter;
      let formatterFn: IFormatter = utilities.identityFn;
      if (utilities.isString(formatter)) {
        formatterFn = Formatters[formatter] as IFormatter;
      }
      else {
        formatterFn = formatter as IFormatter;
      }
      if (this.isExpander || this.isAction) {
        return formatterFn(true, record);
      }
      const fields = column.field.split(".");
      let values = record.get(fields[0]);
      if (!utilities.isDefined(values)) {
        return "";
      }
      else if (utilities.isEmpty(values)) {
        values = [null];
      }
      else {
        for (let i = 1; i < fields.length; i++) {
          const field = fields[i];
          if (Array.isArray(values)) {
            const out: IKeyValue[] = [];
            values.forEach((item) => {
              // Can only have an object or just a plain ole array
              if (utilities.isObject(item)) {
                out.push((item as IKeyValue)[field]);
              }
              else {
                out.push(item);
              }
            });
            values = out;
          }
          else {
            values = (values as IKeyValue)[field];
          }
        }
      }
      values = Array.isArray(values) ? values : [values];
      return (values as IKeyValue[]).map((value: IKeyValue) => {
        return formatterFn(value, record);
      });
    },
    iconName(): string {
      if (this.column.type === ColumnTypes.Expander) {
        return this.isExpanded ? Icons.MINUS : Icons.PLUS;
      }
      return "";
    },
    extraCls(): string {
      return this.column.hidden ? "grid-cell-hidden" : "";
    },
  },
  methods: {
    getCellCls(value: IKeyValue, index: number) {
      const cls = [];
      if (!this.column.isAction()) {
        cls.push("grid-cell");
      }
      // If we have more than 1 item, this is considered to be an expanded row
      if (index !== 0) {
        cls.push("expandable");
      }
      return cls.join(" ");
    },
    getChildBorder(index: number, column: IColumn, parent: IColumn) {
      return index + 1 === parent.columns?.length ? false : column.cellBorder;
    },
    onClickCell(event: Event) {
      if (this.column.type === ColumnTypes.Expander) {
        if (utilities.isIconTag(event) && event.target) {
          const target = event.target as HTMLElement;
          const parent = target.parentElement?.parentElement;
          if (parent) {
            this.isExpanded = !this.isExpanded;
            if (this.isExpanded) {
              parent.classList.add("expand-row");
            }
            else {
              parent.classList.remove("expand-row");
            }
          }
        }
      }
    },
  },
});
</script>
