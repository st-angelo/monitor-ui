import { Button } from '@mantine/core';
import { useAuthentication } from '../authentication/AuthContext';
import ColorSchemeToggler from '../general/ColorSchemeToggler';

const Dashboard = () => {
  const { signOut } = useAuthentication();

  return <>This is a dashboard</>;
};

export default Dashboard;
