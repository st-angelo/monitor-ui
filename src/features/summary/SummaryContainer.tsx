import { ActionIcon, Tooltip } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconTallymark1,
} from '@tabler/icons';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getTransactionsForSummary } from '../../repository/transactionRepository';
import SummaryCardsComponent from './SummaryCardsComponent';
import SummaryChartsComponent from './SummaryChartsComponent';

const SummaryContainer = () => {
  const { t } = useTranslation();

  const _date = new Date();
  const [dateFrom, setDateFrom] = useState<Date>(
    new Date(_date.getFullYear(), _date.getMonth(), 1)
  );
  const [dateTo, setDateTo] = useState<Date>(_date);

  const { data: transactions } = useQuery(
    ['light-transactions', dateFrom, dateTo],
    () => getTransactionsForSummary(dateFrom, dateTo)
  );

  console.log(transactions);

  // #region Date modifiers

  const setLastMonth = useCallback(() => {
    setDateFrom(new Date(dateFrom.getFullYear(), dateFrom.getMonth() - 1, 1));
    setDateTo(
      new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 0, 23, 59, 59)
    );
  }, [dateFrom]);

  const setLastYear = useCallback(() => {
    setDateFrom(new Date(dateFrom.getFullYear() - 1, 0, 1));
    setDateTo(new Date(dateFrom.getFullYear() - 1, 11, 31, 23, 59, 59));
  }, [dateFrom]);

  const setNextMonth = useCallback(() => {
    setDateFrom(new Date(dateTo.getFullYear(), dateTo.getMonth() + 1, 1));
    const __date = new Date();
    setDateTo(
      __date.getMonth() === dateTo.getMonth() + 1
        ? new Date(
            dateTo.getFullYear(),
            dateTo.getMonth() + 1,
            __date.getDate(),
            23,
            59,
            59
          )
        : new Date(dateTo.getFullYear(), dateTo.getMonth() + 2, 0, 23, 59, 59)
    );
  }, [dateTo]);

  const setNextYear = useCallback(() => {
    setDateFrom(new Date(dateTo.getFullYear() + 1, 0, 1));
    setDateTo(new Date(dateTo.getFullYear() + 1, 11, 31, 23, 59, 59));
  }, [dateTo]);

  // #endregion

  return (
    <div>
      <div className='flex items-center gap-3 justify-center'>
        <div className='flex mt-7'>
          <Tooltip label={'Last year'}>
            <ActionIcon onClick={setLastYear} variant={'transparent'}>
              <IconChevronsLeft />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={'Last month'}>
            <ActionIcon onClick={setLastMonth} variant={'transparent'}>
              <IconChevronLeft />
            </ActionIcon>
          </Tooltip>
        </div>
        <DatePicker
          label={t('Label.Filter.DateFrom')}
          placeholder={t('Label.Filter.DateFrom')}
          value={dateFrom}
          clearable={false}
          onChange={value => setDateFrom(value ?? _date)}
        />
        <IconTallymark1 className='rotate-90 mt-6' />
        <DatePicker
          label={t('Label.Filter.DateTo')}
          placeholder={t('Label.Filter.DateTo')}
          value={dateTo}
          clearable={false}
          onChange={value => setDateTo(value ?? _date)}
        />
        <div className='flex mt-7'>
          <Tooltip label={'Next month'}>
            <ActionIcon
              onClick={setNextMonth}
              variant={'transparent'}
              disabled={
                _date.getFullYear() === dateTo.getFullYear() &&
                _date.getMonth() <= dateTo.getMonth()
              }
            >
              <IconChevronRight />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={'Next year'}>
            <ActionIcon
              onClick={setNextYear}
              variant={'transparent'}
              disabled={_date.getFullYear() <= dateTo.getFullYear()}
            >
              <IconChevronsRight />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-10'>
        <SummaryCardsComponent transactions={transactions || []} />
        <SummaryChartsComponent transactions={transactions || []} />
      </div>
      <div className='text-sm text-center'>
        * All prices are converted to the base currency, configurable in your
        account settings. Values are approximate.
      </div>
    </div>
  );
};

export default SummaryContainer;
