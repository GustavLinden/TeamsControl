import * as React from 'react';
import {
  PeoplePicker,
  PrincipalType,
} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { IAccordionCommandBar } from '../../../models/IAccordionCommandBar';
import { IPersonaProps } from 'office-ui-fabric-react/lib/components/Persona';
import { ActionButton } from '@fluentui/react';
import { IIconProps } from '@fluentui/react';
import TeamOwnerControlContext from '../../../Context/TeamOwnerControlContext';

const AccordionCommandBar: React.FC<IAccordionCommandBar> = ({
  groupId,
  context,
}): JSX.Element => {
  const TeamOwnerControl = React.useContext(TeamOwnerControlContext);
  const addAsOwnerIcon: IIconProps = { iconName: 'Ribbon' };
  const addAsMemberIcon: IIconProps = { iconName: 'PeopleAdd' };
  const removeAsOwnerIcon: IIconProps = { iconName: 'FollowUser' };
  const removeUserIcon: IIconProps = { iconName: 'UserRemove' };
  const placeHolderText =
    'Want to add a user as a owner or member? Search here!';

  const [selectedPerson, setSelectedPerson] = React.useState<string>('');
  const [hasSelectedUser, setHasSelectedUser] = React.useState<boolean>(true);
  const [idOfUser, setIdOfUser] = React.useState<string>('');
  const setSelectedUser = async (persons: IPersonaProps[]) => {
    if (persons.length > 0) {
      const [userEmail] = persons.map((person) => person.secondaryText);
      const { id } = await TeamOwnerControl.onGetUserByPrincipalName(userEmail);
      setSelectedPerson(userEmail);
      setIdOfUser(id);
      setHasSelectedUser(false);
    } else {
      setSelectedPerson('');
      setHasSelectedUser(true);
    }
  };
  return (
    <div>
      <PeoplePicker
        context={context}
        principalTypes={[PrincipalType.User]}
        personSelectionLimit={1}
        onChange={setSelectedUser}
        placeholder={placeHolderText}
      />
      <div>
        <ActionButton
          iconProps={addAsOwnerIcon}
          disabled={hasSelectedUser}
          onClick={() => TeamOwnerControl.onAddGroupOwner(idOfUser, groupId)}
        >
          Add as owner
        </ActionButton>{' '}
        <ActionButton
          iconProps={addAsMemberIcon}
          disabled={hasSelectedUser}
          onClick={() => TeamOwnerControl.onAddGroupMember(groupId, idOfUser)}
        >
          Add as member
        </ActionButton>{' '}
        <ActionButton
          iconProps={removeAsOwnerIcon}
          disabled={hasSelectedUser}
          onClick={() => TeamOwnerControl.onRemoveOwner(groupId, idOfUser)}
        >
          Remove as owner
        </ActionButton>
        <ActionButton
          iconProps={removeUserIcon}
          disabled={hasSelectedUser}
          onClick={() => TeamOwnerControl.onRemoveMember(groupId, idOfUser)}
        >
          Remove user from Team
        </ActionButton>
      </div>
    </div>
  );
};

export default AccordionCommandBar;
