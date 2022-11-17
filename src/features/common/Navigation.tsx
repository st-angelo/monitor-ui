import { Anchor, Container, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ColorSchemeToggler from './ColorSchemeToggler';
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
          <LanguageSelector />
          <ColorSchemeToggler />
          <UserMenu />
        </Group>
      </Group>
    </Container>
  );
};

export default Navigation;
