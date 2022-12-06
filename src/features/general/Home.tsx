import FeaturesComponent from '../about/FeaturesComponent';
import TestimonialsComponent from '../about/TestimonialsComponent';

const Home = () => {
  return (
    <div className='flex flex-col gap-5'>
      <FeaturesComponent />
      <TestimonialsComponent />
    </div>
  );
};

export default Home;
