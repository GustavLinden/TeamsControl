import * as React from 'react';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from '@fluentui/react/lib/Dropdown';
import { IOwnerList } from '../../../models/IOwnerList';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const OwnerList: React.FC<IOwnerList> = ({ owners }) => {
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();

  const dropdownValues = owners.map((owner) => {
    return {
      key: owner.userPrincipalName.toString(),
      text: owner.displayName.toString(),
    };
  });
  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setSelectedItem(item);
  };
  return (
    <Dropdown
      label="This dropdown shows the current owners"
      selectedKey={selectedItem ? selectedItem.key : undefined}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onChange}
      placeholder="Click to see current owners"
      options={dropdownValues}
      styles={dropdownStyles}
    />
  );
};

export default OwnerList;
