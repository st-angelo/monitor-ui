import useIllustrationUtils from './useIllustrationUtils';

const Piggybank = () => {
  const { theme, grayColor, themeColor } = useIllustrationUtils();

  return (
    <svg viewBox='0 0 900 600' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fill='transparent' d='M0 0h900v600H0z' />
      <path
        d='M631.754 206.427c-10.976 19.589-35.016 22.281-73.528 18.558-28.964-2.805-55.377-4.975-84.344-20.768-20.274-11.046-36.323-25.991-48.036-40.506-12.693-15.725-30.41-33.671-21.725-51.5 11.936-24.492 80.959-45.12 147.983-11.387 73.626 37.066 90.388 86.457 79.65 105.603z'
        fill={grayColor}
      />
      <path
        d='M782.448 316.502c-27.718 13.749-64.505-3.93-64.505-3.93s8.176-39.963 35.908-53.693c27.717-13.75 64.49 3.91 64.49 3.91s-8.176 39.963-35.893 53.713z'
        fill={grayColor}
      />
      <path
        d='M175.251 211.281c16.047 9.618 39.069.727 39.069.727s-3.01-24.48-19.067-34.087c-16.047-9.618-39.06-.738-39.06-.738s3.011 24.481 19.058 34.098z'
        fill={grayColor}
      />
      <circle
        cx='702.154'
        cy='386.373'
        r='15.134'
        transform='rotate(180 702.154 386.373)'
        fill={themeColor}
      />
      <circle
        cx='159.806'
        cy='287.904'
        r='12.459'
        transform='rotate(180 159.806 287.904)'
        fill={themeColor}
      />
      <circle
        r='14.188'
        transform='matrix(-1 0 0 1 196.951 444.036)'
        fill={themeColor}
      />
      <circle
        r='6.621'
        transform='matrix(-1 0 0 1 667.101 268.382)'
        fill={themeColor}
      />
      <circle
        r='8.513'
        transform='matrix(-1 0 0 1 223.124 136.674)'
        fill={grayColor}
      />
      <circle
        r='12.296'
        transform='matrix(-1 0 0 1 80.297 451.331)'
        fill={grayColor}
      />
      <circle
        r='9.359'
        transform='matrix(-1 0 0 1 562.039 529.954)'
        fill={grayColor}
      />
      <circle
        r='10.405'
        transform='matrix(-1 0 0 1 684.264 172.198)'
        fill={grayColor}
      />
      <circle
        r='9.343'
        transform='scale(1 -1) rotate(-75 -113.199 -199.16)'
        fill={grayColor}
      />
      <circle
        r='12.43'
        transform='matrix(-1 0 0 1 293.61 145.915)'
        fill={grayColor}
      />
      <ellipse
        rx='9.561'
        ry='7.649'
        transform='matrix(-1 0 0 1 765.702 445.588)'
        fill={grayColor}
      />
      <circle
        r='19.445'
        transform='scale(1 -1) rotate(-75 -202.116 -445.658)'
        fill={grayColor}
      />
      <path
        d='M674.036 434.125h.25c1.481 20.986 17.089 21.309 17.089 21.309s-17.211.336-17.211 24.585c0-24.249-17.21-24.585-17.21-24.585s15.601-.323 17.082-21.309zm-537.24 57.566h.131c.775 11.394 8.934 11.569 8.934 11.569s-8.998.183-8.998 13.348c0-13.165-8.997-13.348-8.997-13.348s8.156-.175 8.93-11.569z'
        fill={grayColor}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M494.796 274.428c4.57-10.382 7.321-21.823 7.321-34.023 0-44.498-33.944-80.57-75.817-80.57-41.873 0-75.818 36.072-75.818 80.57 0 14.341 3.812 27.623 10.008 39.271'
        fill={theme.fn.darken(themeColor, 0.5)}
      />
      <path
        d='M235.627 359.69c-3.71-10.625-2.211-21.878 5.165-29.264 11.038-11.054 30.778-9.235 44.093 4.061l14.11 14.091'
        stroke={themeColor}
        stroke-width='22'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M572.359 232.413v45.801c14.2 11.621 25.474 26.111 32.158 42.7h17.286c10.918 0 19.778 8.034 19.778 17.933v54.966c0 9.899-8.86 17.933-19.778 17.933h-25.928c-10.384 16.283-25.375 29.841-43.294 39.292v32.441c0 9.899-8.86 17.934-19.778 17.934h-27.427c-10.918 0-11.614-8.035-11.614-17.934l-.514-17.933H377.566v15.566c0 9.899 3.828 17.933-7.09 17.933h-25.562c-10.917 0-19.777-8.034-19.777-17.933v-43.13c-24.228-19.708-39.556-48.204-39.556-80.036 0-59.431 53.123-107.6 118.667-107.6h89.514c8.485 0 16.712-2.529 23.476-7.155 9.869-6.743 22.052-10.778 35.343-10.778h19.778z'
        fill={themeColor}
        stroke={themeColor}
        stroke-width='22'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M554.973 321.953c1.166 1.298 1.166 3.391 0 4.689-1.167 1.299-3.046 1.299-4.213 0-1.167-1.298-1.167-3.391 0-4.689a2.816 2.816 0 0 1 4.213 0'
        stroke='#fff'
        stroke-width='25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <defs>
        <linearGradient
          id='a'
          x1='557.81'
          y1='333.384'
          x2='459.976'
          y2='-106.242'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#fff' />
          <stop offset='1' stop-color='#EEE' />
        </linearGradient>
        <linearGradient
          id='b'
          x1='676.01'
          y1='359.389'
          x2='904.623'
          y2='178.556'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#fff' />
          <stop offset='1' stop-color='#EEE' />
        </linearGradient>
        <linearGradient
          id='c'
          x1='237.349'
          y1='242.24'
          x2='108.228'
          y2='122.27'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#fff' />
          <stop offset='1' stop-color='#EEE' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Piggybank;
