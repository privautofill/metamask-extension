import { useMemo } from 'react';
import usePersonalSignAlerts from './alerts/usePersonalSignAlerts';
import useGeneralAlerts from './alerts/useGeneralAlerts';

const useConfirmationAlerts = () => {
  const personalSignAlerts = usePersonalSignAlerts();
  const generalAlerts = useGeneralAlerts();

  return useMemo(
    () => [...personalSignAlerts, ...generalAlerts],
    [personalSignAlerts, generalAlerts],
  );
};

export default useConfirmationAlerts;
