import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '../helpers/utils/confirm-tx.util';
import {
  getMultichainCurrentCurrency,
  getMultichainIsEvm,
  getMultichainNativeCurrency,
} from '../selectors/multichain';
import { getConversionRate } from '../ducks/metamask/metamask';

import { getValueFromWeiHex } from '../../shared/modules/conversion.utils';
import { TEST_NETWORK_TICKER_MAP } from '../../shared/constants/network';
import { Numeric } from '../../shared/modules/Numeric';
import { EtherDenomination } from '../../shared/constants/common';
import { useMultichainSelector } from './useMultichainSelector';

// The smallest non-zero amount that can be displayed.
export const MIN_AMOUNT = 0.000001;

// The string to display when 0 < amount < MIN_AMOUNT.
// TODO(dbrans): Localize this string using Intl.NumberFormatter.
const MIN_AMOUNT_DISPLAY = `<${MIN_AMOUNT}`;

// The default precision for displaying currency values.
// It set to the number of decimal places in the minimum amount.
export const DEFAULT_PRECISION = new BigNumber(MIN_AMOUNT).decimalPlaces();

/**
 * Defines the shape of the options parameter for useCurrencyDisplay
 *
 * @typedef {object} UseCurrencyOptions
 * @property {string} [displayValue] - When present is used in lieu of formatting the inputValue
 * @property {string} [prefix] - String to prepend to the final result
 * @property {number} [numberOfDecimals] - Number of significant decimals to display
 * @property {string} [denomination] - Denomination (wei, gwei) to convert to for display
 * @property {string} [currency] - Currency type to convert to. Will override nativeCurrency
 * @property {boolean} [hideLabel] – hide the currency label
 */

/**
 * Defines the return shape of the second value in the tuple
 *
 * @typedef {object} CurrencyDisplayParts
 * @property {string} [prefix] - string to prepend to the value for display
 * @property {string} value - string representing the value, formatted for display
 * @property {string} [suffix] - string to append to the value for display
 */

/**
 * useCurrencyDisplay hook
 *
 * Given a hexadecimal encoded value string and an object of parameters used for formatting the
 * display, produce both a fully formed string and the pieces of that string used for displaying
 * the currency to the user
 *
 * @param {string} inputValue - The value to format for display
 * @param {UseCurrencyOptions} opts - An object for options to format the inputValue
 * @returns {[string, CurrencyDisplayParts]}
 */
export function useCurrencyDisplay(
  inputValue,
  {
    account,
    displayValue,
    prefix,
    numberOfDecimals,
    denomination,
    currency,
    ...opts
  },
) {
  const isEvm = useMultichainSelector(getMultichainIsEvm, account);
  const currentCurrency = useMultichainSelector(
    getMultichainCurrentCurrency,
    account,
  );
  const nativeCurrency = useMultichainSelector(
    getMultichainNativeCurrency,
    account,
  );
  const conversionRate = useSelector(getConversionRate);
  const isUserPreferredCurrency = currency === currentCurrency;

  const value = useMemo(() => {
    if (displayValue) {
      return displayValue;
    }

    if (isEvm) {
      if (
        currency === nativeCurrency ||
        (!isUserPreferredCurrency && !nativeCurrency)
      ) {
        const ethDisplayValue = new Numeric(
          inputValue,
          16,
          EtherDenomination.WEI,
        )
          .toDenomination(denomination || EtherDenomination.ETH)
          .round(numberOfDecimals || DEFAULT_PRECISION)
          .toBase(10)
          .toString();

        return ethDisplayValue === '0' && inputValue && Number(inputValue) !== 0
          ? MIN_AMOUNT_DISPLAY
          : ethDisplayValue;
      } else if (isUserPreferredCurrency && conversionRate) {
        return formatCurrency(
          getValueFromWeiHex({
            value: inputValue,
            fromCurrency: nativeCurrency,
            toCurrency: currency,
            conversionRate,
            numberOfDecimals: numberOfDecimals || 2,
            toDenomination: denomination,
          }),
          currency,
        );
      }
    } else {
      // For non-EVM we assume the input value can be formatted "as-is"
      return formatCurrency(inputValue, currency);
    }
    return null;
  }, [
    inputValue,
    nativeCurrency,
    conversionRate,
    displayValue,
    numberOfDecimals,
    denomination,
    currency,
    isUserPreferredCurrency,
    isEvm,
  ]);

  let suffix;

  if (!opts.hideLabel) {
    // if the currency we are displaying is the native currency of one of our preloaded test-nets (goerli, sepolia etc.)
    // then we allow lowercase characters, otherwise we force to uppercase any suffix passed as a currency
    const currencyTickerSymbol = Object.values(
      TEST_NETWORK_TICKER_MAP,
    ).includes(currency)
      ? currency
      : currency?.toUpperCase();

    suffix = opts.suffix || currencyTickerSymbol;
  }

  return [
    `${prefix || ''}${value}${suffix ? ` ${suffix}` : ''}`,
    { prefix, value, suffix },
  ];
}
