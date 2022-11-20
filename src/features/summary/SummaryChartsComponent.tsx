import { Loader } from '@mantine/core';
import { format, startOfDay } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import FloatingLabledPieChart from '../../components/common/charts/FloatingLabledPieChart';
import { TransactionForSummary } from '../../models/transaction';
import {
  getCategories,
  getTransactionTypes,
} from '../../repository/dictionaryRepository';
import { roundNumber, yyyy_mm_dd } from '../../utils/functions';
import { getTranslatedCategory } from '../transaction/utils';

const _colors: Record<string, string> = {
  Spending: 'orangered',
  Earning: 'limegreen',
};

interface SummaryChartsComponentProps {
  transactions: TransactionForSummary[];
  loading: boolean;
  dateFrom: Date;
  dateTo: Date;
}

const SummaryChartsComponent = ({
  transactions,
  loading,
  dateFrom,
  dateTo,
}: SummaryChartsComponentProps) => {
  const { t } = useTranslation();
  const { data: categories } = useQuery(['categories'], getCategories);
  const { data: transactionTypes } = useQuery(
    ['transactionTypes'],
    getTransactionTypes
  );

  const pieData = useMemo(
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

  const lineData = useMemo(() => {
    // get list of distinct dates out of all transactions plus spread out dates in the interval given
    const datesSet = new Set([
      ...transactions.map(transaction =>
        startOfDay(new Date(transaction.date))?.getTime()
      ),
    ]);

    const dates = Array.from(datesSet);
    dates.sort();

    const result = [];
    for (const date of dates) {
      const entry: Record<string, any> = { date };
      transactionTypes?.forEach(
        type =>
          (entry[type.code] = roundNumber(
            transactions
              .filter(
                transaction =>
                  transaction.typeId === type.id &&
                  startOfDay(new Date(transaction.date)).getTime() === date
              )
              .reduce((sum, { amount }) => sum + amount, 0)
          ))
      );
      result.push(entry);
    }

    return result;
  }, [transactionTypes, transactions]);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col items-center'>
        {(transactionTypes || []).map(type => (
          <div className='flex flex-col items-center' key={type.id}>
            <span className='font-bold text-lg mb-5'>
              {t(`Value.${type.code}`)}
            </span>
            {loading && <Loader variant='bars' />}
            {!loading && (
              <FloatingLabledPieChart
                data={pieData.filter(item => item.typeId === type.id)}
              />
            )}
          </div>
        ))}
      </div>
      <div>
        {loading && <Loader variant='bars' />}
        {!loading && (
          <LineChart
            width={730}
            height={250}
            data={lineData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='date'
              type='number'
              scale='time'
              tickFormatter={date => yyyy_mm_dd(new Date(date))}
              domain={[dateFrom.getTime(), dateTo.getTime()]}
            />
            <YAxis />
            <Tooltip labelFormatter={value => format(value, 'yyyy-MM-dd')} />
            <Legend />
            {transactionTypes?.map(type => (
              <Line
                key={type.id}
                type='monotone'
                dataKey={t(`Value.${type.code}`)}
                stroke={_colors[type.code]}
              />
            ))}
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default SummaryChartsComponent;
