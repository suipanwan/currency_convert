const express = require('express')
const app = express()
const port = 3000

const logger = require('./utils/logger');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const redis = require('redis');
const rs_client = redis.createClient({ url: 'redis://redissever:6379' });

rs_client.on('connect', function () {
  logger.info('Redis: Redis Connected');
});

rs_client.on('error', (err) => {
  logger.error('Redis: '+err);
  rs_client.quit();
});

const scheduledGetRate = require('./fetchRate.js');
scheduledGetRate.initScheduledJobs();

app.get('/CAD_HKD', async (req, res) => {
  try {
    await rs_client.connect();
    const cad_hkd = await rs_client.get('CAD_HKD');
    res.json({rate:cad_hkd});
    rs_client.quit();
    logger.info('API: CAD_HKD GET Successed');
  } catch (err) {
    // rs_client.quit();
    logger.error('API: CAD_HKD GET Failed');
    res.status(400).send("Error");
  }
})

app.put('/CAD_HKD', async (req, res) => {
  const rate = JSON.parse(req.body.rate)
  try {
    await rs_client.connect();
    await rs_client.set('CAD_HKD', rate);
    res.json({rate:rate});
    rs_client.quit();
    logger.info('API: CAD_HKD PUT Successed');
  } catch (err) {
    logger.error('API: CAD_HKD PUT Failed');
    res.status(400).send("Error");
  }
})

app.listen(port, () => {
  logger.info(`Server: listening on port ${port}`);
})