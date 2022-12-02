import { Text } from '@mantine/core';

const Footer = () => {
  return (
    <div className='flex gap-4 items-center justify-center py-4'>
      <div className='flex flex-col sm:flex-row sm:gap-1 items-end pr-2 border-0 border-r-[1px] border-inherit border-solid'>
        <Text size='xs' color='dimmed'>
          @ 2022 kl-monitor.
        </Text>
        <Text size='xs' color='dimmed'>
          All rights reserved
        </Text>
      </div>
      <Text size='sm' color='dimmed' className='cursor-pointer hover:underline'>
        Contact
      </Text>
      <Text size='sm' color='dimmed' className='cursor-pointer hover:underline'>
        Donate
      </Text>
    </div>
  );
};

export default Footer;
