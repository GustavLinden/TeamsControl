export interface IOwnerList {
  owners: Array<IOwners>;
}

interface IOwners {
  displayName: string;
  userPrincipalName: string;
}
