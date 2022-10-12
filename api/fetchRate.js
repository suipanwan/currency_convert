const CronJob = require("node-cron");
const logger = require('./utils/logger');

const from = 'CAD';
const to = 'HKD';
const amount = '1';

async function saveRate(from, to, rate) {
  const key = from + '_' + to;

  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({rate: parseFloat(rate).toFixed(3),}),
    headers: {'Content-Type': 'application/json;charset=utf-8'},
  };

  try {
    const res = await fetch(`http://${process.env.API_URL}:3000/${key}`, requestOptions);
    if (res.ok){
      logger.info('CronJob: saveRate Successed - Rate: '+ rate);
      return true;
    }
    return false;
  } catch (err) {
    logger.error('CronJob: saveRate Failed');
    logger.error('CronJob: ' + err);
    return false;
  }
}

async function convertFromFixer(from, to, amount) {
  let myHeaders = new Headers();
  myHeaders.append("apikey", process.env.FIXER_API_KEY);

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  try {
    let response = await fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions);
    response = await response.json();
    response.result ? logger.info('CronJob: convertFromFixer Successed') : logger.error('CronJob: convertFromFixer Failed');;
    return response.result;
  } catch (error) {
    logger.error('CronJob: convertFromFixer Failed');
    logger.error('CronJob: ' + error);
    return false;
  }

}

exports.initScheduledJobs = () => {
  logger.info('CronJob: CronJob Scheduled');

  const scheduledJobFunction = CronJob.schedule('0 */12 * * *', () => { //everyday 00:00
    // const scheduledJobFunction = CronJob.schedule("*/1 * * * *", () => { //every min for testing
    convertFromFixer(from, to, amount).then((rt_rate) => {
      if (rt_rate) {
        saveRate(from, to, rt_rate);
      }
    });
    logger.info('CronJob: CronJob Executed');
  }, {
    timezone: "Asia/Hong_Kong"
  });

  convertFromFixer(from, to, amount).then((rt_rate) => {
    if (rt_rate) {
      saveRate(from, to, rt_rate);
    }
  });

  scheduledJobFunction.start();
}