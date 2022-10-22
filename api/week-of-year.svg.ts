export const config = {
  runtime: "experimental-edge",
};

const html = String.raw;

export default (req) =>
  new Response(getWeekNumberSvg(), {
    headers: {
      "content-type": "image/svg+xml",
    },
  });

const getWeekNumberSvg = () =>
  html`<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 80 20"
    height="50px"
  >
    <rect width="100%" height="100%" fill="white" />
    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="central"
      style="font-size: 16px; font-weight: bold; font-family: system-ui, sans-serif;"
    >
      Week #${getWeekNumber(new Date())}
    </text>
  </svg>`;

//sunday = 0, monday = 1, ...
const getWeekNumber = (date: Date, firstDay = 1): number => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);

  //Set to first day of the week since it is the same weeknumber
  while (d.getDay() != firstDay) {
    d.setDate(d.getDate() - 1);
  }

  const dayOfYear = getDayOfYear(d);
  let weken = Math.floor(dayOfYear / 7);

  // add an extra week if 4 or more days are in this year.
  const daysBefore = (dayOfYear % 7) - 1;
  if (daysBefore >= 4) {
    weken += 1;
  }

  //if the last 3 days onf the year, it is the first week
  const t = new Date(d.getTime());
  t.setDate(t.getDate() + 3);
  if (t.getFullYear() > d.getFullYear()) {
    return 1;
  }
  weken += 1;

  return weken;
};

const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);

  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;

  const oneDay = 1000 * 60 * 60 * 24;

  const day = Math.floor(diff / oneDay);

  return day;
};
