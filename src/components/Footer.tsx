import { Text } from '@mantine/core';

const Footer = () => {
  return (
    <div className='flex gap-4 items-center justify-center py-4'>
      <Text
        size='xs'
        color='dimmed'
        className='pr-2 border-0 border-r-[1px] border-inherit border-solid'
      >
        @ 2022 kl-monitor. All rights reserved
      </Text>
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
