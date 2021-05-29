import { IGraphUser } from './IGraphUser';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IValue } from './IValue';

export interface IListWrapper {
  selectedPerson: Array<IGraphUser>;
  groupsAndOwners: IValue[];
  context: WebPartContext;
}
