import { Card, Loader, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { TransactionForSummary } from '../../models/transaction';
import { getTransactionTypes } from '../../repository/dictionaryRepository';

const _colorClasses: Record<string, string> = {
  Spending: 'bg-amber-600',
  Earning: 'bg-teal-700',
};

interface SummaryCardsComponentProps {
  transactions: TransactionForSummary[];
  loading: boolean;
}

const SummaryCardsComponent = ({
  transactions,
  loading,
}: SummaryCardsComponentProps) => {
  const { t } = useTranslation();
  const { data: transactionTypes } = useQuery(
    ['transactionTypes'],
    getTransactionTypes
  );

  const summaryByType = (transactionTypes || []).map(({ id, code }) => ({
    code,
    amount: transactions
      .filter(transaction => transaction.typeId === id)
      .reduce((sum, { amount }) => sum + amount, 0),
  }));

  const currencyCode = useMemo(
    () => transactions.find(_ => true)?.currencyCode,
    [transactions]
  );

  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
      {summaryByType.map(summary => (
        <Card
          key={summary.code}
          shadow='sm'
          radius='md'
          className={_colorClasses[summary.code]}
          sx={{ width: '250px' }}
        >
          <Card.Section withBorder py='sm'>
            <Text size={'xl'} weight='bolder' align='center'>
              {t(`Value.${summary.code}`)}
            </Text>
          </Card.Section>
          <Card.Section
            className='flex items-center justify-center'
            sx={{ height: '80px' }}
          >
            {loading && <Loader variant='dots' />}
            {!loading && (
              <Text size={25} weight='bolder'>
                {summary.amount
                  ? `${summary.amount.toFixed(1)} ${currencyCode}`
                  : 'No data'}
              </Text>
            )}
          </Card.Section>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCardsComponent;
