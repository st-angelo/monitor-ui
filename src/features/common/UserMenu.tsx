import { Avatar, Menu } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconLogout, IconUser } from '@tabler/icons';
import { useAuthentication } from '../authentication/AuthContext';

const UserMenu = () => {
  const { t } = useTranslation();
  const { signOut } = useAuthentication();

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          src={
            'https://media-exp1.licdn.com/dms/image/D4D03AQGQCdpKyswojg/profile-displayphoto-shrink_800_800/0/1666023406882?e=1672272000&v=beta&t=PayzDFT5EDfgSWFUiWCmh7O6hustMCoDQPijTyWcyu8'
          }
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
