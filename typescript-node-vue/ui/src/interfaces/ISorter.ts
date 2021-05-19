export default interface ISorter {
  id: string;
  field: string;
  direction: string;
  func: () => void;
}
