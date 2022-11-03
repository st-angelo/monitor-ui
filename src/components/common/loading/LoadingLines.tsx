import { Skeleton } from '@mantine/core';

interface LoadingLinesProps {
  size?: number;
  animate?: boolean;
}

const LoadingLines = ({ size = 4, animate = true }: LoadingLinesProps) => {
  return (
    <div className='flex flex-col gap-3'>
      {Array.from({ length: size }).map((_, idx) => (
        <Skeleton
          key={idx}
          height={10}
          radius={'xl'}
          animate={animate}
          className={idx % 2 === 0 ? 'w-full' : 'w-5/6'}
        />
      ))}
    </div>
  );
};

export default LoadingLines;
