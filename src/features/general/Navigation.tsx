import { ActionIcon, Anchor, Avatar, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons';
import ColorSchemeToggler from './ColorSchemeToggler';
import { useAuthentication } from '../authentication/AuthContext';

const Navigation = () => {
  const { signOut } = useAuthentication();

  return (
    <Container py={'sm'} size={'lg'}>
      <Group position='apart'>
        <img alt='logo' src='/logo.svg' className='w-16' />
        <Group>
          <Anchor component={Link} to='/dashboard'>
            Dashboard
          </Anchor>
          <Anchor component={Link} to='/spending'>
            Your spending
          </Anchor>
          <Avatar
            src={
              'https://media-exp1.licdn.com/dms/image/C4D03AQGTk24gQfqT2A/profile-displayphoto-shrink_800_800/0/1651069459409?e=1666828800&v=beta&t=chS6WGNBXNMA9RoOg_-4WTF_3OwaSXjTQGi1nnIo_Pw'
            }
            alt={'avatar'}
            size={'sm'}
          />
          <ColorSchemeToggler />
          <ActionIcon variant='light' size='md' onClick={signOut}>
            <IconLogout />
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
};

export default Navigation;
