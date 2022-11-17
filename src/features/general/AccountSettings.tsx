import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArtboard, IconShieldLock, IconUserCircle } from '@tabler/icons';
import AccountDataComponent from '../user/AccountDataComponent';
import AddCategoryComponent from '../user/AddCategoryComponent';
import CategoriesComponent from '../user/CategoriesComponent';
import UpdatePasswordComponent from '../user/UpdatePasswordComponent';

const AccountSettings = () => {
  const matches = useMediaQuery('(min-width: 1000px)');

  return (
    <div className='md:w-2/3 m-auto'>
      <Tabs
        color='teal'
        variant='pills'
        orientation={matches ? 'vertical' : 'horizontal'}
        defaultValue='account-data'
      >
        <Tabs.List>
          <Tabs.Tab value='account-data' icon={<IconUserCircle size={20} />}>
            Account data
          </Tabs.Tab>
          <Tabs.Tab value='change-password' icon={<IconShieldLock size={20} />}>
            Change password
          </Tabs.Tab>
          <Tabs.Tab value='custom-categories' icon={<IconArtboard size={20} />}>
            Custom categories
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='account-data' pl='xs'>
          <AccountDataComponent />
        </Tabs.Panel>
        <Tabs.Panel value='change-password' pl='xs'>
          <UpdatePasswordComponent />
        </Tabs.Panel>
        <Tabs.Panel value='custom-categories' pl='xs'>
          <AddCategoryComponent />
          <CategoriesComponent />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AccountSettings;
