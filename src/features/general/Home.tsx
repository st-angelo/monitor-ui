import TransactionsComponent from '../transaction/TransactionsComponent';
import AddCategoryComponent from '../user/CategoryDetailComponent';
import CategoriesComponent from '../user/CategoriesComponent';
import TransactionDetailComponent from '../transaction/TransactionDetailComponent';
import TransactionComponent from '../transaction/TransactionComponent';

const Home = () => {
  return (
    <div className='w-2/3 m-auto'>
      <TransactionsComponent />
    </div>
  );
};

export default Home;
