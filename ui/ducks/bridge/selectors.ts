import { createSelector } from 'reselect';
import { getProviderConfig } from '../metamask/metamask';
import { getIsBridgeEnabled } from '../../selectors';
import { ProviderConfig } from '@metamask/network-controller';

export const getFromChain = (state: any): ProviderConfig =>
  getProviderConfig(state);
export const getToChain = (state: any): ProviderConfig => state.bridge.toChain;

export const getIsBridgeTx = createSelector(
  getFromChain,
  getToChain,
  (state) => getIsBridgeEnabled(state),
  (fromChain, toChain, isBridgeEnabled: boolean) =>
    isBridgeEnabled &&
    toChain !== null &&
    fromChain.chainId !== toChain.chainId,
);
