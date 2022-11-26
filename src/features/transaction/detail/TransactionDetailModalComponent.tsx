import { Modal } from '@mantine/core';
import { useCallback } from 'react';
import { useWritable } from 'react-use-svelte-store';
import TransactionDetailComponent from './TransactionDetailComponent';
import transactionDetailStore from './transactionDetailStore';

const TransactionDetailModalComponent = () => {
  const [$store, , $update] = useWritable(transactionDetailStore);

  const close = useCallback(
    () => $update(prev => ({ ...prev, open: false })),
    [$update]
  );

  return (
    <Modal
      opened={$store.open}
      size={'auto'}
      centered
      onClose={close}
      closeOnClickOutside={false}
    >
      <TransactionDetailComponent
        transaction={$store.transaction}
        onEdit={close}
      />
    </Modal>
  );
};

export default TransactionDetailModalComponent;
