import { Avatar, Menu } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconLogout, IconUser } from '@tabler/icons';
import { useAuthentication } from '../authentication/AuthContext';

const UserMenu = () => {
  const { t } = useTranslation();
  const { signOut, user } = useAuthentication();

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          src={user?.photoUrl}
          className='cursor-pointer'
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          icon={<IconUser size={14} />}
          to='/account-settings'
        >
          {t('Navigation.AccountSettings')}
        </Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />} onClick={signOut}>
          {t('Navigation.LogOut')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;