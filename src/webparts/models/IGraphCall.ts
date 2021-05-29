import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IGraphResponse } from '../models/IGraphResponse';
import { IGraphUser } from './IGraphUser';

export interface IGraphCall {
  init: (context: WebPartContext) => Promise<void>;
  onGetGroupsAndOwners: () => Promise<IGraphResponse>;
  onGetUserByPrincipalName: (user: string) => Promise<IGraphUser>;
  onRemoveOwner: (groupId: string, userId: string) => Promise<Response>;
  onRemoveMember: (groupId: string, userId: string) => Promise<Response>;
  onAddGroupOwner: (userId: string, groupId: string) => Promise<Response>;
  onAddGroupMember: (groupId: string, userId: string) => Promise<Response>;
}
