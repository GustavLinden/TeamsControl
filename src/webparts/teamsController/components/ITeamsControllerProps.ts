import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IGraphCall } from '../../models/IGraphCall';
export interface ITeamsControllerProps {
  description: string;
  context: WebPartContext;
  GraphService: IGraphCall;
}
