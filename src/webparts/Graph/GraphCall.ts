import { MSGraphClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Context } from 'react';
import { IGraphCall } from '../models/IGraphCall';
import { IGraphResponse } from '../models/IGraphResponse';
import { IGraphUser } from '../models/IGraphUser';
import { IValue } from '../models/IValue';

export default class GraphCall implements IGraphCall {
  public context: WebPartContext;
  private graphClient: MSGraphClient;
  public aadToken: string;
  public container: IGraphResponse;

  public async init(context: WebPartContext) {
    this.context = context;
    this.graphClient = await this.context.msGraphClientFactory.getClient();
  }

  public onConsecutiveGraphCalls = async (odataString: string) => {
    let nextCall: IGraphResponse = await this.graphClient
      .api(odataString)
      .get();
    this.container.value.push(...nextCall.value);
    if (nextCall['@odata.nextLink']) {
      await this.onConsecutiveGraphCalls(nextCall['@odata.nextLink']);
    } else {
      return this.container;
    }
  };

  public onGetGroupsAndOwners = async (): Promise<IGraphResponse> => {
    let response: IGraphResponse = await this.graphClient
      .api(
        `https://graph.microsoft.com/v1.0/groups?$select=id,mail,displayName,resourceProvisioningOptions&$expand=owners`
      )
      .get();
    if (response['@odata.nextLink']) {
      this.container = response;
      await this.onConsecutiveGraphCalls(response['@odata.nextLink']);
      return this.container;
    } else {
      this.container = response;
      return this.container;
    }
  };

  public onGetUserByPrincipalName = async (
    user: string
  ): Promise<IGraphUser> => {
    let userRecived = await this.graphClient
      .api(`https://graph.microsoft.com/v1.0/users/${user}`)
      .select('id,displayName,mail,userPrincipalName')
      .get();
    return userRecived;
  };

  public onRemoveOwner = async (
    groupId: string,
    userId: string
  ): Promise<Response> => {
    try {
      let deletedOwner = await this.graphClient
        .api(
          `https://graph.microsoft.com/v1.0/groups/${groupId}/owners/${userId}/$ref`
        )
        .delete();
      if (deletedOwner === undefined) {
        alert('User was removed as Owner');
        return deletedOwner;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  public onRemoveMember = async (groupId: string, userId: string) => {
    try {
      let removedMember = await this.graphClient
        .api(`/groups/${groupId}/members/${userId}/$ref`)
        .delete();
      if (removedMember === undefined) {
        alert('User was removed from Team');
        return removedMember;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  public onAddGroupMember = async (groupId: string, userId: string) => {
    const directoryObject = {
      '@odata.id': `https://graph.microsoft.com/v1.0/directoryObjects/${userId}`,
    };
    try {
      let addedGroupMember = await this.graphClient
        .api(`/groups/${groupId}/members/$ref`)
        .post(directoryObject);
      if (addedGroupMember === undefined) {
        alert('User added to Team');
      }
      return addedGroupMember;
    } catch (err) {
      alert(err.message);
    }
  };

  public onAddGroupOwner = async (userId: string, groupId: string) => {
    const directoryObject = {
      '@odata.id': `https://graph.microsoft.com/v1.0/users/${userId}`,
    };
    try {
      let addedOwner = await this.graphClient
        .api(`/groups/${groupId}/owners/$ref`)
        .post(directoryObject);

      if (addedOwner === undefined) {
        alert('User added as Owner');
        return addedOwner;
      }
    } catch (err) {
      alert(err.message);
    }
  };
}
