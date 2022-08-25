import { Anchor, Avatar, Container, Group, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import ColorSchemeToggler from '../../features/general/ColorSchemeToggler';

const Navigation = () => {
  return (
    <Container py={'sm'} size={'lg'}>
      <Group position='apart'>
        <Image alt='logo' src='/logo.png' width={60} height={60} />
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
        </Group>
      </Group>
    </Container>
  );
};

export default Navigation;
