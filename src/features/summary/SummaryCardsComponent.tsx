import { Loader } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { TransactionForSummary } from '../../models/transaction';
import { getTransactionTypes } from '../../repository/dictionaryRepository';

const _colorClasses: Record<string, string> = {
  Spending: 'bg-amber-700',
  Earning: 'bg-teal-800',
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
    <div className='flex justify-center gap-5'>
      {summaryByType.map(summary => (
        <div
          key={summary.code}
          className={`flex flex-col gap-2 rounded-lg p-5 font-bold ${
            _colorClasses[summary.code]
          }`}
        >
          <span>{t(`Value.${summary.code}`)}</span>
          {loading && <Loader variant='bars' />}
          {!loading && (
            <span>
              {summary.amount && `${summary.amount.toFixed(1)} ${currencyCode}`}
              {!summary.amount && 'No data'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCardsComponent;
