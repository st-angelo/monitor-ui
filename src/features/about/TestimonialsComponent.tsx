import { Carousel } from '@mantine/carousel';
import { Blockquote, Paper, Text, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';

const TestimonialsComponent = () => {
  const theme = useMantineTheme();

  const testimonials = useMemo(
    () => [
      {
        author: 'Jack Reacher',
        content: 'Good website, but where is the app mate?',
      },
      {
        author: 'James Bond',
        content: 'I use it sometimes, when I remember.',
      },
      {
        author: 'Jason Bourne',
        content:
          "Neat all around, but out of all the features I mostly use the 'Donate' one.",
      },
    ],
    []
  );

  return (
    <Paper
      radius={0}
      sx={{ backgroundColor: theme.colors[theme.primaryColor][5] }}
      my='xl'
    >
      <div className='lg:w-2/3 mx-auto flex flex-col gap-5 p-5'>
        <Carousel mx='auto' withIndicators withControls={false} loop>
          {testimonials.map(testimonial => (
            <Carousel.Slide className='flex justify-center py-20'>
              <Blockquote
                cite={`- ${testimonial.author}`}
                sx={{
                  padding: 0,
                  '& cite': { color: '#000' },
                  '& .mantine-Blockquote-body': { color: '#000' },
                  '& .mantine-Blockquote-icon': { color: '#000' },
                }}
                color='black'
              >
                {testimonial.content}
              </Blockquote>
            </Carousel.Slide>
          ))}
        </Carousel>
        <Text align='right' size='xs' italic>
          * These are, evidently, fake testimonials.
        </Text>
      </div>
    </Paper>
  );
};

export default TestimonialsComponent;
