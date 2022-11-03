import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ListActionProps {
  icon: ReactNode;
  tooltip: string;
  handler: () => void;
}

const ListAction = ({ icon, tooltip, handler }: ListActionProps) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon variant='light' size='lg' onClick={handler}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default ListAction;

type RefreshProps = Pick<ListActionProps, 'handler'>;

export const Refresh = ({ handler }: RefreshProps) => {
  const { t } = useTranslation();
  
  return (
    <ListAction
      icon={<IconRefresh size={14} />}
      tooltip={t('Refresh')}
      handler={handler}
    />
  );
};
