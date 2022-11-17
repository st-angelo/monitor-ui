import { Card, Collapse, Grid, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconArrowDown, IconArrowUp, IconX } from '@tabler/icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWritable } from 'react-use-svelte-store';
import DebouncedNumberInput from '../../components/common/inputs/DebouncedNumberInput';
import ListAction from '../../components/common/list-browser/ListAction';
import useListBrowserUtils from '../../components/common/list-browser/useListBrowserUtils';
import {
  getCategories,
  getCurrencies,
  getTransactionTypes,
} from '../../repository/dictionaryRepository';
import { formatNumberWithCommas } from '../../utils/functions';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import transactionsStore, {
  defaultTransactionFilters,
} from './transactionsListStore';

const TransactionFiltersComponent = () => {
  const { t } = useTranslation();
  const [$store, , $update] = useWritable(transactionsStore);
  const { handleChange, addOrUpdateActions } =
    useListBrowserUtils(transactionsStore);
  const [show, setShow] = useState(false);

  // #region Collections

  const categories = useDictionaryWithTranslation(
    ['categories'],
    getCategories,
    { additionalFields: ['transactionTypeId'] }
  );
  const currencies = useDictionaryWithTranslation(
    ['currencies'],
    getCurrencies
  );
  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
  );

  // #endregion

  // #region Handlers

  const resetFilters = useCallback(
    () =>
      $update(prev => ({
        ...prev,
        filters: { ...defaultTransactionFilters },
      })),
    [$update]
  );

  // #endregion

  // #region Actions

  const actions = useMemo(
    () => [
      {
        name: 'ResetFilters',
        visible: show,
        component: (
          <ListAction
            icon={<IconX size={14} />}
            tooltip={'Reset filters'}
            handler={resetFilters}
          />
        ),
      },
      {
        name: 'ShowFilters',
        visible: !show,
        component: (
          <ListAction
            icon={<IconArrowDown size={14} />}
            tooltip={'Show filters'}
            handler={() => setShow(true)}
          />
        ),
      },
      {
        name: 'HideFilters',
        visible: show,
        component: (
          <ListAction
            icon={<IconArrowUp size={14} />}
            tooltip={'Hide filters'}
            handler={() => {
              setShow(false);
              resetFilters();
            }}
          />
        ),
      },
    ],
    [resetFilters, show]
  );

  useEffect(() => {
    addOrUpdateActions(actions);
  }, [addOrUpdateActions, actions]);

  // #endregion

  return (
    <Collapse in={show}>
      <Card p={'xs'} className='shadow-md mt-3 overflow-visible'>
        <Grid>
          <Grid.Col span={4}>
            <DatePicker
              label={t('Label.Filter.DateFrom')}
              placeholder={t('Label.Filter.DateFrom')}
              value={$store.filters.dateFrom}
              onChange={handleChange('filters.dateFrom')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePicker
              label={t('Label.Filter.DateTo')}
              placeholder={t('Label.Filter.DateTo')}
              value={$store.filters.dateTo}
              onChange={handleChange('filters.dateTo')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              value={$store.filters.typeId}
              label={t('Label.Filter.Type')}
              placeholder={t('Label.Filter.Type')}
              clearable
              onChange={handleChange('filters.typeId')}
              data={transactionTypes}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              value={$store.filters.categoryId}
              label={t('Label.Filter.Category')}
              placeholder={t('Label.Filter.Category')}
              clearable
              onChange={handleChange('filters.categoryId')}
              data={categories.filter(
                category =>
                  !$store.filters.typeId ||
                  category.transactionTypeId === $store.filters.typeId
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              value={$store.filters.currencyId}
              label={t('Label.Filter.Currency')}
              placeholder={t('Label.Filter.Currency')}
              clearable
              onChange={handleChange('filters.currencyId')}
              data={currencies}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DebouncedNumberInput
              value={$store.filters.amountFrom}
              label={t('Label.Filter.AmountFrom')}
              placeholder={t('Label.Filter.AmountFrom')}
              onChange={handleChange('filters.amountFrom')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DebouncedNumberInput
              value={$store.filters.amountTo}
              label={t('Label.Filter.AmountTo')}
              placeholder={t('Label.Filter.AmountTo')}
              onChange={handleChange('filters.amountTo')}
              parser={value => value && value.replace(/,/g, '')}
              formatter={value => formatNumberWithCommas(value)}
            />
          </Grid.Col>
        </Grid>
      </Card>
    </Collapse>
  );
};

export default TransactionFiltersComponent;
