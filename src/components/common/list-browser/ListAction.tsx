import { ActionIcon, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';

interface ListActionProps {
  icon: ReactNode;
  tooltip: string;
  handler: () => void;
  disabled?: boolean;
}

const ListAction = ({
  icon,
  tooltip,
  handler,
  disabled = false,
}: ListActionProps) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        variant='light'
        size='lg'
        onClick={handler}
        disabled={disabled}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default ListAction;
