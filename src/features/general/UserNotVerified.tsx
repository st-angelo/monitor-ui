import { Text } from '@mantine/core';
import { IconUserCheck } from '@tabler/icons';

const UserNotVerified = () => {
  return (
    <div className='min-h-screen flex flex-col gap-5 items-center justify-center'>
      <IconUserCheck
        className='absolute opacity-50 translate-x-5 -translate-y-52 rotate-[18deg]'
        size={300}
      />
      <Text size='xl' weight='bolder'>
        You are not verified. Check your email!
      </Text>
      <Text size='sm'>*Pagina in lucru btw</Text>
    </div>
  );
};

export default UserNotVerified;
