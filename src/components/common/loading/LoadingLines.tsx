import { Skeleton } from '@mantine/core';

interface LoadingLinesProps {
  size?: number;
  animate?: boolean;
}

const LoadingLines = ({ size = 4, animate = true }: LoadingLinesProps) => {
  return (
    <>
      {Array.from({ length: size }).map((_, idx) => (
        <Skeleton
          key={idx}
          height={10}
          mt={6}
          radius={'xl'}
          animate={animate}
        />
      ))}
    </>
  );
};

export default LoadingLines;
