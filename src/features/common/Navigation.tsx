import { Anchor, Container, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../authentication/AuthContext';
import ColorSchemeToggler from './ColorSchemeToggler';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';

const Navigation = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isVerified } = useAuthentication();

  return isAuthenticated && isVerified ? (
    <Container py={'sm'} size={'lg'} className='font-bold'>
      <Group position='apart' align={'center'}>
        <Link to='/home'>
          <img src='/logo.svg' alt='logo' className='h-5' />
        </Link>
        <Group>
          <Anchor
            component={Link}
            to='/home'
            sx={{ textUnderlineOffset: '5px' }}
          >
            {t('Navigation.Home')}
          </Anchor>
          <Anchor
            component={Link}
            to='/wallet'
            sx={{ textUnderlineOffset: '5px' }}
          >
            {t('Navigation.Wallet')}
          </Anchor>
          <LanguageSelector />
          <ColorSchemeToggler />
          <UserMenu />
        </Group>
      </Group>
    </Container>
  ) : (
    <></>
  );
};

export default Navigation;
