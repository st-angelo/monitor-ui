import ConfirmDialog from '../features/common/confirm-dialog/ConfirmDialog';
import Loader from '../features/common/loader/Loading';
import TransactionDetailModalComponent from '../features/transaction/detail/TransactionDetailModalComponent';

const GlobalComponents = () => (
  <>
    <TransactionDetailModalComponent />
    <ConfirmDialog />
    <Loader />
  </>
);

export default GlobalComponents;
