export interface IValue {
  id: string;
  resourceProvisioningOptions: [];
  displayName: string;
  owners: Array<{
    userPrincipalName: string;
  }>;
}
