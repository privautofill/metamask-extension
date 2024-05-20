import useCurrentConfirmation from '../useCurrentConfirmation';
import { Severity } from '../../../../helpers/constants/design-system';

const getAlertForConfirmation = (confirmation: any) => {
  return {
    key: 'key',
    reason: 'some_reason',
    severity: Severity.Danger,
    alertDetails: 'some info',
    message: 'message test',
    provider: 'provider',
  };
};

const useGeneralAlerts = (): any => {
  const { currentConfirmation } = useCurrentConfirmation();
  return [getAlertForConfirmation(currentConfirmation)];
};

export default useGeneralAlerts;
