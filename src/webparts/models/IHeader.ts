import { IGraphUser } from './IGraphUser';
import { IValue } from './IValue';

export interface IHeader {
  numberOfGroups: IValue[];
  runGetData: () => void;
}
