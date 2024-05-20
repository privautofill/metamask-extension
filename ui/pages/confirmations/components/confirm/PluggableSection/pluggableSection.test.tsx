import React from 'react';
import configureMockStore from 'redux-mock-store';
import { TransactionType } from '@metamask/transaction-controller';

import { renderWithProvider } from '../../../../../../test/lib/render-helpers';
import { Confirmation } from '../../../types/confirm';

import ConfirmTitle from './pluggableSection';

const genMockState = (confirmationOverride: Partial<Confirmation> = {}) => ({
  confirm: {
    currentConfirmation: {
      type: TransactionType.personalSign,
      ...confirmationOverride,
    },
  },
});

describe('PluggableSection', () => {
  it('should render', () => {
    const mockStore = configureMockStore([])(genMockState({ id: 'testing' }));
    const { getByText } = renderWithProvider(<ConfirmTitle />, mockStore);

    expect(getByText('testing')).toBeInTheDocument();
  });
});
