import { Button, Modal } from '@mantine/core';
import { useState } from 'react';
import TransactionDetailComponent from '../transaction/TransactionDetailComponent';
import TransactionsComponent from '../transaction/TransactionsComponent';

const Wallet = () => {
  const [inAdd, setInAdd] = useState(false);

  return (
    <>
      <div className='w-1/2 m-auto'>
        <div className='my-5 text-end'>
          <Button onClick={() => setInAdd(true)}>Add transaction</Button>
        </div>
        <TransactionsComponent />
      </div>
      {inAdd && (
        <Modal
          opened={inAdd}
          size={'auto'}
          centered
          onClose={() => setInAdd(false)}
          closeOnClickOutside={false}
        >
          <TransactionDetailComponent onEdit={() => setInAdd(false)} />
        </Modal>
      )}
    </>
  );
};

export default Wallet;
