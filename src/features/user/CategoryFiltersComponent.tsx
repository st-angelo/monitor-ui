import { Card, Collapse, Grid, Select } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconX } from '@tabler/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWritable } from 'react-use-svelte-store';
import DebouncedTextInput from '../../components/common/inputs/DebouncedTextInput';
import ListAction from '../../components/common/list-browser/ListAction';
import useListBrowserUtils from '../../components/common/list-browser/useListBrowserUtils';
import { getTransactionTypes } from '../../repository/dictionaryRepository';
import { useDictionaryWithTranslation } from '../common/hooks/useDictionary';
import categoriesStore, { defaultCategoryFilters } from './categoriesListStore';

const CategoryFiltersComponent = () => {
  const { t } = useTranslation();
  const [$store, , $update] = useWritable(categoriesStore);
  const { handleChange, addOrUpdateActions } = useListBrowserUtils(categoriesStore);
  const [show, setShow] = useState(true);

  // #region Collections

  const transactionTypes = useDictionaryWithTranslation(
    ['transactionTypes'],
    getTransactionTypes
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
            handler={() =>
              $update(prev => ({
                ...prev,
                filters: { ...defaultCategoryFilters },
              }))
            }
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
            handler={() => setShow(false)}
          />
        ),
      },
    ],
    [$update, show]
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
            <DebouncedTextInput
              label={t('Label.Filter.Name')}
              placeholder={t('Label.Filter.Name')}
              value={$store.filters.name}
              onChange={handleChange('filters.name')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DebouncedTextInput
              label={t('Label.Filter.Description')}
              placeholder={t('Label.Filter.Description')}
              value={$store.filters.description}
              onChange={handleChange('filters.description')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              value={$store.filters.transactionTypeId}
              label={t('Label.Filter.TransactionType')}
              placeholder={t('Label.Filter.TransactionType')}
              clearable
              onChange={handleChange('filters.transactionTypeId')}
              data={transactionTypes}
            />
          </Grid.Col>
        </Grid>
      </Card>
    </Collapse>
  );
};

export default CategoryFiltersComponent;
