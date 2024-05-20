import useCurrentConfirmation from '../useCurrentConfirmation';

const mockAlert = [
  {
    key: 'erverfvrefv-refvrfv-revrv-retvbrv-rbvrbg',
    reason: 'This is a test DAPP request',
    severity: 'info',
    message: 'This is a mock alert, for demo purpose.',
    provider: 'MM',
  },
];

const getAlertForConfirmation = (confirmation: any) => mockAlert;

const useGeneralAlerts = (): any => {
  const { currentConfirmation } = useCurrentConfirmation();
  return getAlertForConfirmation(currentConfirmation);
};

export default useGeneralAlerts;
