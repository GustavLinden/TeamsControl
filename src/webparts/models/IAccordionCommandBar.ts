import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IAccordionCommandBar {
  groupId: string;
  userId: string;
  userDisplayName: string;
  groupDisplayName: string;
  context: WebPartContext;
}
