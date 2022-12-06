import { Text } from '@mantine/core';
import Growth from '../../components/common/illustrations/Growth';
import Hourglass from '../../components/common/illustrations/Hourglass';
import Piggybank from '../../components/common/illustrations/Piggybank';

const FeaturesComponent = () => {
  const features = [
    {
      illustration: <Piggybank />,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      illustration: <Hourglass />,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      illustration: <Growth />,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  ];

  return (
    <div className='flex flex-col gap-10 lg:w-2/3 m-auto px-5'>
      {features.map((feature, index) => (
        <div className='flex sm:flex-row flex-col justify-center items-center gap-5'>
          <div
            className={`w-[250px] lg:w-[450px] shrink-0 ${
              index % 2 === 1 ? 'sm:hidden' : ''
            }`}
          >
            {feature.illustration}
          </div>
          <Text className='grow' align='justify'>
            {feature.content}
          </Text>
          <div
            className={`w-[250px] lg:w-[450px] shrink-0 hidden ${
              index % 2 === 1 ? 'sm:block' : ''
            }`}
          >
            {feature.illustration}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesComponent;
