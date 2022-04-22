import ColumnTypes from "ui/statics/ColumnTypes";
import utilities from "ui/utilities";
import { FlexDirections, FlexJustifications, TextAlignments } from "ui/statics/Flex";
import IColumn from "ui/interfaces/IColumn";
import Sorter from "ui/classes/Sorter";

interface GridColumn extends IColumn {

}

class GridColumn {
  type = ColumnTypes.String;
  text = "";
  cls = [];
  field = "";
  isAssociation = false;
  isParent = false;
  sortable = true;
  isSorted = false;
  // TODO = I don't think this is necessary here... it only matters in the cell, but we define it on the column config
  formatter = utilities.identityFn;
  flex = 1;
  shrink = 1;
  basis = 0;
  width = 0;
  hidden = false;
  border = "b r";
  cellBorder = "r";

  constructor(config: IColumn = {} as IColumn, isNested: boolean, sorters: Sorter[]) {
    let children = config.columns;
    if (children) {
      config.sortable = false;
      children = GridColumn.generateChildren(children, sorters, true);
    }
    if (isNested) {
      config.border = utilities.isEmpty(config.border) ? "r" : config.border;
    }
    // Match column's sorter with any defined sorters in the store
    for (let i = 0; i < sorters.length; i++) {
      const sorter = sorters[i];
      if (sorter.field === config.field) {
        config.sorter = sorter;
        break;
      }
    }
    this.columns = children;
    utilities.merge(this, config);
  }

  static generateChildren(columns: IColumn[], sorters: Sorter[], isNested = false) {
    return columns.map((column) => {
      return new GridColumn(column, isNested, sorters);
    });
  }

  isAction(): boolean {
    return this.type === ColumnTypes.Action;
  }

  canSort(): boolean {
    return !this.isAction() && this.sortable;
  }

  isNested(): boolean {
    const columns = this.columns;
    return !!(columns && columns.length > 1);
  }

  isVerticalLayout(): boolean {
    return !this.direction && !this.isAction() || utilities.contains([FlexDirections.COLUMN, FlexDirections.COLUMN_REVERSE], this.direction);
  }

  isCellVerticalLayout(): boolean {
    return utilities.contains([FlexDirections.COLUMN, FlexDirections.COLUMN_REVERSE], this.getCellDirection());
  }

  getTextAlignment(): string {
    if (this.align) {
      return this.align;
    }
    return this.isNested() || this.isAction() ? TextAlignments.CENTER : TextAlignments.LEFT;
  }

  getCellPack(): string {
    // If we're in a vertical layout, then our pack is controlling the position of the text vertically
    if (this.isCellVerticalLayout()) {
      // Otherwise, we always want the text to be at the top of the cell
      return FlexJustifications.START;
    }
    let align: any = this.align;
    // We have to convert TextAlignment to FlexJustification
    switch (align) {
      case TextAlignments.LEFT:
        align = FlexJustifications.START;
        break;
      case TextAlignments.CENTER:
        align = FlexJustifications.CENTER;
        break;
      case TextAlignments.RIGHT:
        align = FlexJustifications.END;
        break;
    }
    if (align) {
      return align;
    }
    return this.isAction() ? FlexJustifications.CENTER : FlexJustifications.START;
  }

  /**
   * If we're in a vertical layout, then align will be horizontal-based
   * If we're in a horizontal layout, then align will be vertical-based
   */
  getCellAlignment(): string {
    // If we're vertical, then we have to use TextAlignment
    if (this.isCellVerticalLayout()) {
      let align = this.align;
      if (!align) {
        align = this.isAction() ? TextAlignments.CENTER : TextAlignments.LEFT;
      }
      return align;
    }
    return TextAlignments.LEFT;
  }

  getCellDirection(): FlexDirections {
    let direction = FlexDirections.COLUMN;
    if (this.isAction()) {
      direction = FlexDirections.ROW;
    }
    return this.direction || direction;
  }
}

export default GridColumn;
