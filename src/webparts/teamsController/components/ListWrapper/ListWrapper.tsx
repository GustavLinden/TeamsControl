import * as React from 'react';
import { IListWrapper } from '../../../models/IListWrapper';
import { Accordion } from '@pnp/spfx-controls-react/lib/Accordion';
import AccordionCommandBar from '../AccordionCommandBar/AccordionCommandBar';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Icon } from '@fluentui/react';
import OwnerList from '../OwnerList/OwnerList';

const tooltipContent =
  'Select a user from the field below. You can then add them as member or owners to the team. You can also remove them as owner or user from the team';

const ListWrapper: React.FC<IListWrapper> = ({
  groupsAndOwners,
  selectedPerson,
  context,
}): JSX.Element => {
  console.log(groupsAndOwners);
  if (groupsAndOwners.length > 0 && selectedPerson.length > 0) {
    const [{ userPrincipalName, displayName, id }] = selectedPerson;
    const filteredGroups = groupsAndOwners.filter((group) => {
      return group.owners.some((owner) => {
        return owner.userPrincipalName === userPrincipalName;
      });
    });
    const renderedListWithPermissions = filteredGroups.map((group) => (
      <Accordion
        title={group.displayName}
        className={'itemCell'}
        key={group.id}
        defaultCollapsed={true}
      >
        <div
          className={'itemContent'}
          style={{ backgroundColor: '[theme: themeDarkAlt, default: #932227]' }}
        >
          {`This Team has ${group.owners.length} owner(s).`}
          <OwnerList owners={group.owners} />{' '}
          <div className={'itemResponse'}> </div>
          <div className={'itemIndex'}>
            <AccordionCommandBar
              context={context}
              userId={id}
              groupId={group.id}
              groupDisplayName={group.displayName}
              userDisplayName={displayName}
            />
          </div>
        </div>
      </Accordion>
    ));
    return (
      <div>
        {renderedListWithPermissions.length > 0 ? (
          renderedListWithPermissions
        ) : (
          <div>This user is not a owner of any Teams</div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default ListWrapper;
