import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



export function formatDate(days = 0, fmt = 'dddd, MMMM D'){
  const date = dayjs();
  const days_ = date.add(days, 'days');
  return days_.format(fmt);
};
