import TransactionsComponent from '../transaction/TransactionsComponent';
import AddCategoryComponent from '../user/CategoryDetailComponent';
import CategoriesComponent from '../user/CategoriesComponent';
import TransactionDetailComponent from '../transaction/TransactionDetailComponent';

const Wallet = () => {
  return (
    <div className='w-2/3 m-auto'>
      <TransactionDetailComponent />
    </div>
  );
};

export default Wallet;
