import TransactionsComponent from '../transaction/TransactionsComponent';
import CategoriesComponent from '../user/CategoriesComponent';
import TransactionComponent from '../transaction/TransactionComponent';
import SummaryContainer from '../summary/SummaryContainer';

const Home = () => {
  return (
    <div className='w-2/3 mx-auto my-10'>
      <SummaryContainer />
    </div>
  );
};

export default Home;
