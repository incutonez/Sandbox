export default interface ISorter {
  field: string;
  direction: string;
  /**
   * This property is meant to allow sorting up to a number of clicks before it's removed
   */
  clearThreshold?: number;
  id?: string;
  func?: () => void;
}
