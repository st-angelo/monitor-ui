import { ActionIcon, Card, Loader, Text, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {
  getCategories,
  getCurrencies,
  getTransactionTypes,
} from '../../repository/dictionaryRepository';
import { getLatestTransactionData } from '../../repository/transactionRepository';
import { useTransactionDetail } from '../transaction/detail/useTransactionDetail';
import { getTranslatedCategory } from '../transaction/utils';

const SummaryLatestComponent = () => {
  const { t } = useTranslation();
  const openTransactionDetail = useTransactionDetail();

  const { data: categories } = useQuery(['categories'], getCategories);
  const { data: currencies } = useQuery(['currencies'], getCurrencies);
  const { data: transactionTypes } = useQuery(
    ['transactionTypes'],
    getTransactionTypes
  );

  const { data, isLoading: isLoadingData } = useQuery(
    ['latest-transaction-data'],
    getLatestTransactionData
  );

  const lastTransactionsData = useMemo(() => {
    if (isLoadingData) return null;
    if (!data || !data.lastTransactions || !categories || !currencies)
      return [];
    return data.lastTransactions.map(transaction => ({
      transaction: {
        ...transaction,
        id: undefined,
        date: new Date().toDateString(),
      },
      category: getTranslatedCategory(
        categories.find(category => category.id === transaction.categoryId)
      ),
      currency:
        currencies.find(currency => currency.id === transaction.currencyId)
          ?.code ?? '',
      amount: transaction.amount,
      date: transaction.date,
    }));
  }, [data, categories, currencies, isLoadingData]);

  const topCategoriesData = useMemo(() => {
    if (isLoadingData) return null;
    if (!data || !data.topCategories || !categories || !transactionTypes)
      return [];
    return data.topCategories.map(categoryData => {
      const category = categories.find(
        category => category.id === categoryData.categoryId
      );
      return {
        transaction: {
          typeId: transactionTypes.find(
            type => type.id === category?.transactionTypeId
          )?.id,
          categoryId: categoryData.categoryId,
          date: new Date().toDateString(),
        },
        category: getTranslatedCategory(category),
        count: categoryData.count,
      };
    });
  }, [data, categories, transactionTypes, isLoadingData]);

  return (
    <div className='flex justify-center gap-10'>
      <Card
        shadow='md'
        radius='md'
        sx={{ width: '350px', overflow: 'visible' }}
      >
        <Card.Section withBorder inheritPadding py='sm'>
          <Text weight='bold' size='lg'>
            Top categories
          </Text>
        </Card.Section>
        <Card.Section inheritPadding py='sm'>
          {!topCategoriesData && <Loader variant='bars' />}
          {topCategoriesData && topCategoriesData.length === 0 && (
            <Text>No data</Text>
          )}
          {topCategoriesData &&
            topCategoriesData.length > 0 &&
            topCategoriesData.map(categoryData => (
              <div className='flex py-2 justify-between items-center'>
                <div className='flex flex-col'>
                  <Text>{categoryData.category}</Text>
                  <Text size='xs'>{`Added ${categoryData.count} time(s)`}</Text>
                </div>
                <Tooltip label='Add again'>
                  <ActionIcon
                    variant='filled'
                    size='sm'
                    onClick={() =>
                      openTransactionDetail(categoryData.transaction)
                    }
                  >
                    <IconPlus size={15} />
                  </ActionIcon>
                </Tooltip>
              </div>
            ))}
        </Card.Section>
      </Card>
      <Card
        shadow='md'
        radius='md'
        sx={{ width: '350px', overflow: 'visible' }}
      >
        <Card.Section withBorder inheritPadding py='sm'>
          <Text weight='bold' size='lg'>
            Last transactions
          </Text>
        </Card.Section>
        <Card.Section inheritPadding py='sm'>
          {!lastTransactionsData && <Loader variant='bars' />}
          {lastTransactionsData && lastTransactionsData.length === 0 && (
            <Text>No data</Text>
          )}
          {lastTransactionsData &&
            lastTransactionsData.length > 0 &&
            lastTransactionsData.map(transactionData => (
              <div className='flex py-2 justify-between items-center'>
                <div className='flex flex-col'>
                  <Text>{`${transactionData.category}, ${transactionData.amount} ${transactionData.currency}`}</Text>
                  <Text size='xs'>
                    {`From ${format(
                      new Date(transactionData.date),
                      'yyyy-MM-dd'
                    )}`}
                  </Text>
                </div>
                <Tooltip label='Add again'>
                  <ActionIcon
                    variant='filled'
                    size='sm'
                    onClick={() =>
                      openTransactionDetail(transactionData.transaction)
                    }
                  >
                    <IconPlus size={15} />
                  </ActionIcon>
                </Tooltip>
              </div>
            ))}
        </Card.Section>
      </Card>
    </div>
  );
};

export default SummaryLatestComponent;
