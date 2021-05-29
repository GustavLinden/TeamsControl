import * as React from 'react';
import { ITeamsControllerProps } from './ITeamsControllerProps';
import Wrapper from '../components/WrapperComponent/Wrapper';
import TeamOwnerControlContext from '../../Context/TeamOwnerControlContext';
export default class TeamOwnerControl extends React.Component<
  ITeamsControllerProps,
  {}
> {
  public render(): React.ReactElement<ITeamsControllerProps> {
    return (
      <TeamOwnerControlContext.Provider value={this.props.GraphService}>
        <Wrapper context={this.props.context} />
      </TeamOwnerControlContext.Provider>
    );
  }
}
