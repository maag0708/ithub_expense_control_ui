import { useSelector } from 'react-redux';

import { selectPermissions, selectRoleName } from '../state/userSlice';

export const usePermission = () => {
  const roleName = useSelector(selectRoleName);
  const permissions = useSelector(selectPermissions);

  const hasPermission = (action: string) => {
    if (roleName === 'admin') {
      return true;
    }

    return permissions?.includes(action);
  };

  return {
    hasPermission,
  };
};
