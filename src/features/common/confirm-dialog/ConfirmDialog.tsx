import { Button, Modal, Portal, Text } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useWritable } from 'react-use-svelte-store';
import confirmDialogStore from './confirmDialogStore';

const ConfirmDialog = () => {
  const { t } = useTranslation();
  const [$store, , $update] = useWritable(confirmDialogStore);

  const close = useCallback(
    () => $update(prev => ({ ...prev, open: false, callback: () => {} })),
    [$update]
  );

  const confirm = useCallback(() => {
    $store.callback();
    close();
  }, [$store, close]);

  return (
    <Portal target={'#modal-container'}>
      <Modal
        opened={$store.open}
        withCloseButton={false}
        centered
        size='xs'
        radius='md'
        transition='fade'
        transitionDuration={250}
        transitionTimingFunction='ease'
        onClose={close}
      >
        <div className='flex flex-col gap-4'>
          <Text weight='bold' align='center'>
            {t('Common.Confirm')}
          </Text>
          <div className='flex gap-4 justify-center'>
            <Button onClick={confirm}>{t('Common.Yes')}</Button>
            <Button onClick={close}>{t('Common.No')}</Button>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};

export default ConfirmDialog;
