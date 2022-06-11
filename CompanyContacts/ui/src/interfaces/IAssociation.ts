export interface IAssociation {
  model: any;
  type: "model" | "store";
  key: string;
}

export interface IAssociations {
  [key: string]: IAssociation;
}
