import { Avatar, Menu } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../authentication/AuthContext';

const UserMenu = () => {
  const { t } = useTranslation();
  const { signOut, user } = useAuthentication();

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.avatarUrl} className='cursor-pointer' />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          icon={<IconUser size={14} />}
          to='/account-settings#account-data'
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
