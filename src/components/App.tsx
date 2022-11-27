import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { AuthProvider } from '../features/authentication/AuthContext';
import { useColorScheme } from '../features/common/hooks/useColorScheme';
import Navigation from '../features/common/Navigation';
import GlobalComponents from './GlobalComponents';
import AppRoutes from './Routes';

function App() {
  const { colorScheme } = useColorScheme();

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
      <AuthProvider>
        <NavigationProgress autoReset={true} />
        <NotificationsProvider position='bottom-center'>
          <main className='min-h-screen'>
            <Navigation />
            <AppRoutes />
            <GlobalComponents />
          </main>
        </NotificationsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
