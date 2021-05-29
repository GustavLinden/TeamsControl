import * as React from 'react';
import { IGraphCall } from '../models/IGraphCall';

const TeamOwnerControlContext = React.createContext<IGraphCall>(null);
export default TeamOwnerControlContext;
