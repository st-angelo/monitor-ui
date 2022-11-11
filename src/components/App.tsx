import { MantineProvider } from '@mantine/core';
import AppRoutes from './Routes';
import { useColorScheme } from '../features/common/hooks/useColorScheme';
import { useAuthentication } from '../features/authentication/AuthContext';
import Navigation from '../features/common/Navigation';
import GlobalComponents from './GlobalComponents';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  const { colorScheme } = useColorScheme();
  const { isAuthenticated } = useAuthentication();

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        primaryColor: import.meta.env.VITE_MANTINE_APP_COLOR,
        fontFamily: 'Montserrat, sans-serif',
        colorScheme,
        components: {
          ActionIcon: {
            defaultProps: {
              color: import.meta.env.VITE_MANTINE_APP_COLOR,
            },
          },
          Avatar: {
            defaultProps: {
              color: import.meta.env.VITE_MANTINE_APP_COLOR,
            },
          },
        },
      }}
    >
      <NotificationsProvider position='bottom-center'>
        <main className='min-h-screen'>
          {isAuthenticated && <Navigation />}
          <AppRoutes />
          <GlobalComponents />
        </main>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
