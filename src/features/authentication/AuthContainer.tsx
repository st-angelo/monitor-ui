import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ColorSchemeToggler from '../common/ColorSchemeToggler';
import LanguageSelector from '../common/LanguageSelector';
import { useAuthentication } from './AuthContext';

interface AuthContainerProps {
  illustration: string;
  withLogout?: boolean;
  gap?: 'sm' | 'md';
  children: React.ReactNode;
}

const AuthContainer = ({
  illustration,
  withLogout = false,
  gap = 'sm',
  children,
}: AuthContainerProps) => {
  const { t } = useTranslation();
  const { signOut } = useAuthentication();

  const gapClass = useMemo(() => {
    switch (gap) {
      case 'sm':
        return 'gap-4';
      case 'md':
        return 'gap-5';
      default:
        return 'gap-4';
    }
  }, [gap]);

  return (
    <div className='h-full flex items-center justify-center p-10'>
      <div className='grid lg:grid-cols-2 items-center'>
        <img
          src={`/illustrations/${illustration}.svg`}
          alt={illustration}
          className='w-[250px] lg:w-[450px] justify-self-center'
        />
        <div
          className={`flex flex-col ${gapClass} p-3 md:pl-0 min-w-[320px] max-w-[550px]`}
        >
          <div className='w-full flex gap-4 justify-end'>
            <LanguageSelector />
            <ColorSchemeToggler />
            {withLogout && (
              <Tooltip label={t('Navigation.LogOut')}>
                <ActionIcon variant='outline' size='lg' onClick={signOut}>
                  <IconLogout />
                </ActionIcon>
              </Tooltip>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
