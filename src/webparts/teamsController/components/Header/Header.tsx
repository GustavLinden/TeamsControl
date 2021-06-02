import { PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import * as React from 'react';
import { IHeader } from '../../../models/IHeader';
import styles from './Header.module.scss';

const Header: React.FC<IHeader> = ({
  numberOfGroups,
  runGetData,
}): JSX.Element => {
  if (numberOfGroups.length > 0) {
    return (
      <div className={styles.headerClass}>
        <div className={styles.headerTextColor}>
          Teams loaded, you can now search for a user.
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.headerClass}>
        <div>
          {' '}
          Click button to get teams.{' '}
          <PrimaryButton className={styles['prim-btn']} onClick={runGetData}>
            Get Teams
          </PrimaryButton>
        </div>
      </div>
    );
  }
};

export default Header;
