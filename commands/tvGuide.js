const tvGuideSearch = require('./tvGuideSearch.js');

const weekNames = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  aliases: {
    sunday: 'sun',
    monday: 'mon',
    tuesday: 'tue',
    tues: 'tue',
    tu: 'tue',
    wednesday: 'wed',
    thursday: 'thu',
    th: 'thu',
    thur: 'thu',
    thurs: 'thu',
    saturday: 'sat'
  }
};

function formatDate(date) {
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const formattedDate = `${date.getFullYear()}-${month.substring(0, 2)}-${day}`;
  return formattedDate;
}

async function tvGuideCommand(arg) {
  // x can pass in day of the week or all; if nothing then defaults to today
  let date = new Date();
  if (weekNames[arg] !== undefined || weekNames[weekNames.aliases[arg]] !== undefined) {
    let givenDay = weekNames[arg];
    if (givenDay === undefined) givenDay = weekNames[weekNames.aliases[arg]];
    const today = date.getDay();
    if (today > givenDay) {
      // if day is in the same week
      const dif = 7 - (today - givenDay);
      date.setDate(date.getDate() + dif);
    } else if (today < givenDay) {
      // if day is next week
      const dif = givenDay - today;
      date.setDate(date.getDate() + dif);
    }
  }
  date = formatDate(date);
  const msg = tvGuideSearch(date, this.tvShows);
  return msg;
}
module.exports = {
  command: tvGuideCommand,
  name: 'tvGuide',
  usage: '!tvGuide <param>',
  description: 'show information on tracked shows'
};
