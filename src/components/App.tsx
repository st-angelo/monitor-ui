import { MantineProvider } from '@mantine/core';
import AppRoutes from './Routes';
import { useColorScheme } from '../features/common/hooks/useColorScheme';
import { useAuthentication } from '../features/authentication/AuthContext';
import Navigation from '../features/common/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalComponents from './GlobalComponents';

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
      <main className='min-h-screen'>
        {isAuthenticated && <Navigation />}
        <AppRoutes />
        <GlobalComponents />
        <ToastContainer
          position='bottom-center'
          newestOnTop
          pauseOnHover
          theme={'colored'}
          limit={7}
        />
      </main>
    </MantineProvider>
  );
}

export default App;
