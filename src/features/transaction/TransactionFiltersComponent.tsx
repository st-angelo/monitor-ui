import { Grid, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'react-i18next';
import { useWritable } from 'react-use-svelte-store';
import DebouncedNumberInput from '../../components/common/inputs/DebouncedNumberInput';
import useListBrowserUtils from '../../components/common/list-browser/useListBrowserUtils';
import {
  getCategories,
  getCurrencies,
  getTransactionTypes,
} from '../../repository/dictionaryRepository';
import { formatNumberWithCommas } from '../../utils/functions';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import transactionsStore from './transactionsListStore';

const TransactionFiltersComponent = () => {
  const { t } = useTranslation();
  const [$store, , $update] = useWritable(transactionsStore);
  const { handleChange } = useListBrowserUtils($update);

  const categories = useDictionaryWithTranslation(
    ['categories'],
    getCategories
  );
  const currencies = useDictionaryWithTranslation(
    ['currencies'],
    getCurrencies
  );
  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
  );

  return (
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
          label={t('Label.Filter.Currency')}
          placeholder={t('Label.Filter.Currency')}
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
          data={categories}
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
  );
};

export default TransactionFiltersComponent;
