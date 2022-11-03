import { Anchor, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import ColorSchemeToggler from './ColorSchemeToggler';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <Container py={'sm'} size={'lg'}>
      <Group position='apart'>
        <img alt='logo' src='/logo.svg' className='w-16' />
        <Group>
          <Anchor component={Link} to='/home'>
            {t('Navigation.Home')}
          </Anchor>
          <Anchor component={Link} to='/wallet'>
            {t('Navigation.ManageWallet')}
          </Anchor>
          <UserMenu />
          <LanguageSelector />
          <ColorSchemeToggler />
        </Group>
      </Group>
    </Container>
  );
};

export default Navigation;
