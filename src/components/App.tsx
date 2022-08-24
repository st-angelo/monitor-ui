import { useState } from 'react';
import AppRoutes from './Routes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <AppRoutes />
    </div>
  );
}

export default App;
