import * as React from 'react';
import { IListItem } from '../../../models/IListItem';

const ListItem: React.FC<IListItem> = ({
  displayName,
  id,
  selectedPerson,
}): JSX.Element => {
  if (!selectedPerson) {
    return null;
  } else {
    return (
      <ul>
        <li>{displayName}</li>
      </ul>
    );
  }
};

export default ListItem;
