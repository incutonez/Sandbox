export default interface IColumn {
  cls: Array<string>,
  text: string,
  type: number,
  field: string,
  rowSpan: number,
  colSpan: number,
  columns?: Array<IColumn>
}
