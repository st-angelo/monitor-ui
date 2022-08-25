import { MantineProvider } from '@mantine/core';
import AppRoutes from './Routes';
import { useColorScheme } from '../features/general/hooks/useColorScheme';
import { useAuthentication } from '../features/authentication/AuthContext';
import Navigation from './layout/Navigation';

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
        },
      }}
    >
      <div className='min-h-screen'>
        {isAuthenticated && <Navigation />}
        <AppRoutes />
      </div>
    </MantineProvider>
  );
}

export default App;
