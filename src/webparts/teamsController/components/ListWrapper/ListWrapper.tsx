import * as React from 'react';
import { IListWrapper } from '../../../models/IListWrapper';
import { Accordion } from '@pnp/spfx-controls-react/lib/Accordion';
import AccordionCommandBar from '../AccordionCommandBar/AccordionCommandBar';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { Icon, IIconProps } from '@fluentui/react';

const tooltipContent =
  'Select a user from the field below. You can then add them as member or owners to the team. You can also remove them as owner from the team';

const ListWrapper: React.FC<IListWrapper> = ({
  groupsAndOwners,
  selectedPerson,
  context,
}): JSX.Element => {
  const infoIcon: IIconProps = { iconName: 'Info' };

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
        <div className={'itemContent'}>
          <div className={'itemResponse'}>
            {`This Team has ${group.owners.length} owners. Pleace hover the info bauble for more info`}{' '}
            <TooltipHost content={tooltipContent}>
              <Icon iconName="Info" />
            </TooltipHost>
          </div>
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
    return <div>{renderedListWithPermissions}</div>;
  } else {
    return null;
  }
};

export default ListWrapper;
