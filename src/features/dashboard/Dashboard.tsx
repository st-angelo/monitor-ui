import AddCategoryComponent from '../user/AddCategoryComponent';
import CategoriesComponent from '../user/CategoriesComponent';
import { subscribe } from '../general/hooks/reactStore';
import { useEffect } from 'react';

const Dashboard = () => {

  useEffect(() => {
    return subscribe((state: any) => console.log(state));
  }, [])

  return <CategoriesComponent />;
};

export default Dashboard;
