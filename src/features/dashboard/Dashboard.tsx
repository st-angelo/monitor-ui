import { Button } from '@mantine/core';
import { useAuthentication } from '../authentication/AuthContext';

const Dashboard = () => {
  const { signOut: signout } = useAuthentication();

  return (
    <Button variant='outline' onClick={signout}>
      Logout
    </Button>
  );
};

export default Dashboard;
