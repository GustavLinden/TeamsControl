import * as React from 'react';
import {
  PeoplePicker,
  PrincipalType,
} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { IWrapper } from '../../../models/IWrapper';
import Header from '../Header/Header';
import ListWrapper from '../ListWrapper/ListWrapper';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import TeamOwnerControlContext from '../../../Context/TeamOwnerControlContext';
import { IValue } from '../../../models/IValue';
import styles from './Wrapper.module.scss';
import { IGraphUser } from '../../../models/IGraphUser';

const Wrapper: React.FC<IWrapper> = (props: IWrapper): JSX.Element => {
  const TeamOwnerControl = React.useContext(TeamOwnerControlContext);
  const [selectedPerson, setSelectedPerson] = React.useState<IGraphUser[]>([]);
  const [groupsAndOwners, setGroupsAndOwners] = React.useState<IValue[]>([]);
  const setSelectedUser = async (persons: IPersonaProps[]) => {
    if (persons.length > 0) {
      const [userEmail] = persons.map((person) => person.secondaryText);
      const userFromGraph = await TeamOwnerControl.onGetUserByPrincipalName(
        userEmail
      );
      setSelectedPerson([userFromGraph]);
    } else {
      setSelectedPerson([]);
    }
  };

  const getData = async () => {
    const response = await TeamOwnerControl.onGetGroupsAndOwners();
    const filterTeamsProvisioningOptions = response.value.filter((team) => {
      return team.resourceProvisioningOptions.some((t) => {
        return t === 'Team';
      });
    });
    setGroupsAndOwners(filterTeamsProvisioningOptions);
  };

  const onRunGetData = async () => {
    await getData();
  };

  return (
    <div>
      <Header numberOfGroups={groupsAndOwners} runGetData={onRunGetData} />
      <div className={styles.peoplePickerWrapper}>
        <PeoplePicker
          context={props.context}
          personSelectionLimit={1}
          webAbsoluteUrl={props.context.pageContext.web.absoluteUrl}
          onChange={setSelectedUser}
          principalTypes={[PrincipalType.User]}
          resolveDelay={1000}
        />
      </div>
      <ListWrapper
        selectedPerson={selectedPerson}
        groupsAndOwners={groupsAndOwners}
        context={props.context}
      />
    </div>
  );
};

export default Wrapper;
