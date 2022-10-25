import TransactionsComponent from '../transaction/TransactionsComponent';
import AddCategoryComponent from '../user/CategoryDetailComponent';
import CategoriesComponent from '../user/CategoriesComponent';
import TransactionDetailComponent from '../transaction/TransactionDetailComponent';

const Home = () => {
  return (
    <div className='w-1/2 m-auto'>
      <TransactionsComponent />
    </div>
  );
};

export default Home;
