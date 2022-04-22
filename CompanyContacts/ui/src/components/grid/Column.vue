<template>
  <FlexContainer
    :direction="FlexDirections.COLUMN"
    :grow="column.width ? 0 : column.flex"
    :border="border"
    :class="extraCls"
    :background-color="false"
    :width="column.width"
    @click="onClickColumn"
  >
    <FlexContainer
      :pack="column.getTextAlignment()"
      :align="FlexAlignments.CENTER"
      :background-color="false"
      :grow="1"
      class="grid-header-child"
    >
      <span class="grid-cell">
        {{ columnText }}
      </span>
      <Icon
        v-if="column.isSorted"
        class="sort-icon"
        :icon-name="sortIcon"
      />
    </FlexContainer>
    <template v-if="column.columns">
      <FlexContainer border="t">
        <JefGridColumn
          v-for="(col, index) in column.columns"
          :key="index"
          :border="getChildBorder(index, col, column)"
          :column="col"
          @sort="onSortChildColumn"
          @hide="onHideChildColumn"
          @show="onShowChildColumn"
        />
      </FlexContainer>
    </template>
  </FlexContainer>
</template>

<script lang="ts">
import IColumn from "ui/interfaces/IColumn";
import { defineComponent, PropType } from "vue";
import ColumnTypes from "ui/statics/ColumnTypes";
import Icons from "ui/statics/Icons";
import Icon from "ui/components/Icon.vue";
import FlexContainer from "ui/components/base/FlexContainer.vue";

export default defineComponent({
  name: "JefGridColumn",
  components: {
    FlexContainer,
    Icon,
  },
  props: {
    column: {
      type: Object as PropType<IColumn>,
      default: () => {
        return {};
      },
    },
    border: {
      type: [String, Boolean],
      default: "b r",
    },
  },
  emits: ["sort",
    "hide",
    "show"],
  computed: {
    columnText(): string {
      const cfg = this.column;
      let text = cfg.text;
      if (!text) {
        if (cfg.type === ColumnTypes.Action) {
          text = "Actions";
        }
      }
      return text;
    },
    sortIcon() {
      let icon = "";
      const isAsc = this.column.sorter?.isAsc();
      switch (this.column.type) {
        case ColumnTypes.String:
          icon = isAsc ? Icons.SORT_STRING_ASC : Icons.SORT_STRING_DESC;
          break;
        case ColumnTypes.Number:
          icon = isAsc ? Icons.SORT_NUMBER_ASC : Icons.SORT_NUMBER_DESC;
          break;
        default:
          icon = isAsc ? Icons.SORT_DEFAULT_ASC : Icons.SORT_DEFAULT_DESC;
          break;
      }
      return icon;
    },
    extraCls() {
      const cfg = this.column;
      const cls = ["grid-header"];
      if (cfg.canSort()) {
        cls.push("grid-header-sortable");
      }
      if (cfg.hidden) {
        cls.push("grid-cell-hidden");
      }
      return cls.join(" ");
    },
  },
  methods: {
    getChildBorder(index: number, column: IColumn, parent: IColumn) {
      return index + 1 === parent.columns?.length ? false : column.border;
    },
    hide() {
      this.emitHide(this.column);
    },
    show() {
      this.emitShow(this.column);
    },
    emitHide(column: IColumn) {
      this.$emit("hide", column);
    },
    emitShow(column: IColumn) {
      this.$emit("show", column);
    },
    emitSort(column: IColumn) {
      this.$emit("sort", column);
    },
    onHideChildColumn(column: IColumn) {
      this.emitHide(column);
    },
    onShowChildColumn(column: IColumn) {
      this.emitShow(column);
    },
    onSortChildColumn(column: IColumn) {
      this.emitSort(column);
    },
    onClickColumn() {
      if (this.column.canSort()) {
        this.emitSort(this.column);
      }
    },
  },
});
</script>
