import { Text } from '@mantine/core';

const UserNotVerified = () => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <Text size='xl' weight='bolder'>
        You are not verified. Check your email!
      </Text>
      <Text size='md'>
        You can logout or change your email in the meantime.
      </Text>
    </div>
  );
};

export default UserNotVerified;
