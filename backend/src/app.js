import express from 'express';
import cors from 'cors';
import errorMiddleware from './middleware/error.js';
import { HttpException } from './middleware/HttpException.js';
import { toMoment, toNumber } from './util/utils.js';
import constants from './util/constants.js';
import moment from 'moment';
import { totalNumberOfArrivedOrders,
         totalNumberOfArrivedVaccines,
         vaccinationsDone,
         ordersPerProducer,
         vaccinesPerProducer,
         expiredVaccines,
         totalExpired,
         usedInjectionsFromExpired,
         goingToExpire,
         usedInjectionsFromGoingToExpire} from './database/queries.js';


const app = express();
app.use(cors());

app.get('/total', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const orderCount = await totalNumberOfArrivedOrders(at);
    const injectionCount = await totalNumberOfArrivedVaccines(at);
    res.json({ orderCount, injectionCount });
  } catch (err) {
    next(err);
  }
});

app.get('/totalPerProducer', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const totals = constants.PRODUCERS.map(async producer => {
          const orderCount = await ordersPerProducer(at, producer);
          const injectionCount = await vaccinesPerProducer(at, producer);
          return [producer, {orderCount, injectionCount}] 
        });

    const totalObject = Object.fromEntries(await Promise.all(totals));
    res.json(totalObject);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get('/usable', (req, res, next) => {
  res.json({usableInjections: 10})  
});

app.get('/vaccinationsDone', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const count = await vaccinationsDone(at);
    res.json({ count });
  } catch (err) {
    next(err)
  }
});

app.get('/expiredBottles', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const count = await expiredVaccines(at);
    res.json({ count });
  } catch (err) {
    next(err)
  }
});

app.get('/expiredBeforeUse', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const totalN = await totalExpired(at.clone());
    const usedN = await usedInjectionsFromExpired(at.clone());
    res.json({ count: totalN - usedN });
  } catch (err) {
    next(err)
  }
});


app.get('/goingToExpire', async (req, res, next) => {
  try {
    const from = toMoment(req.query.datetime);
    const inDays = toNumber(req.query.range);
    const totalN = await goingToExpire(from.clone(), inDays);
    const usedN = await usedInjectionsFromGoingToExpire(from.clone(), inDays);
    res.json({ count: totalN - usedN });
  } catch (err) {
    next(err)
  }
});

app.use(errorMiddleware);

export default app;

