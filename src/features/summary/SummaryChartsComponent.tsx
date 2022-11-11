import { useMemo } from 'react';
import { useQuery } from 'react-query';
import FloatingLabledPieChart from '../../components/common/charts/FloatingLabledPieChart';
import { TransactionForSummary } from '../../models/transaction';
import {
  getCategories,
  getTransactionTypes,
} from '../../repository/dictionaryRepository';
import { getTranslatedCategory } from '../transaction/utils';

interface SummaryChartsComponentProps {
  transactions: TransactionForSummary[];
}

const SummaryChartsComponent = ({
  transactions,
}: SummaryChartsComponentProps) => {
  const { data: categories } = useQuery(['categories'], getCategories);
  const { data: transactionTypes } = useQuery(
    ['transactionTypes'],
    getTransactionTypes
  );

  const data = useMemo(
    () =>
      (categories || [])
        .map(category => ({
          name: getTranslatedCategory(category),
          value: transactions
            .filter(transaction => transaction.categoryId === category.id)
            .reduce((sum, { amount }) => sum + amount, 0),
          color: category.color,
          currencyCode: transactions.find(_ => true)?.currencyCode,
          typeId: category.transactionTypeId,
        }))
        .filter(item => item.value),
    [categories, transactions]
  );

  return (
    <div>
      {(transactionTypes || []).map(type => (
        <div className='flex flex-col items-center'>
          <span className='font-bold text-lg mb-5'>{type.code}</span>
          <FloatingLabledPieChart
            data={data.filter(item => item.typeId === type.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default SummaryChartsComponent;
