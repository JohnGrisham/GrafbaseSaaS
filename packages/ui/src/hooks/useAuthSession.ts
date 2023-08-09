import * as React from 'react';
import { AuthenticatedSessionContext } from '../providers';

export const useAuthSession = () =>
  React.useContext(AuthenticatedSessionContext);
