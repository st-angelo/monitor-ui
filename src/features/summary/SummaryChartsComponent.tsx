import { Loader, Text } from '@mantine/core';
import { format, startOfDay } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
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
import { roundNumber } from '../../utils/functions';
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
    <div className='flex flex-col md:flex-row justify-center'>
      <div className='flex flex-col items-center'>
        {(transactionTypes || []).map(type => (
          <div className='flex flex-col' key={type.id}>
            <Text size='lg' weight='bold' align='center'>
              {t(`Value.${type.code}`)}
            </Text>
            <div className='flex items-center justify-center min-h-[250px]'>
              {loading && <Loader variant='dots' />}
              {!loading && (
                <FloatingLabledPieChart
                  data={pieData.filter(item => item.typeId === type.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='grow min-w-[320px] max-w-[100vw] max-h-[36rem] md:p-10 p-5'>
        {loading && <Loader variant='dots' />}
        {!loading && (
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray='5 5' />
              <XAxis
                dataKey='date'
                type='number'
                scale='time'
                tickFormatter={date => format(new Date(date), 'yyyy-MM-dd')}
                domain={[dateFrom.getTime(), dateTo.getTime()]}
              />
              <YAxis />
              <Tooltip labelFormatter={value => format(value, 'yyyy-MM-dd')} />
              <Legend />
              {transactionTypes?.map(type => (
                <Line
                  key={type.id}
                  type='monotone'
                  dataKey={type.code}
                  name={t(`Value.${type.code}`)}
                  stroke={_colors[type.code]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SummaryChartsComponent;
