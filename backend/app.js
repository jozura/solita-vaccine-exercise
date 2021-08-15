import express from 'express';
import cors from 'cors';
import errorMiddleware from './src/middleware/error.js';
import { HttpException } from './src/middleware/HttpException.js';
import moment from 'moment';
import { totalNumberOfArrivedOrders,
         totalNumberOfArrivedVaccines,
         vaccinationsDone,
         ordersPerProducer,
         vaccinesPerProducer,
         expiredVaccines,
         totalExpired,
         usedInjectionsFromExpired,
         totalUsable,
         usedInjections,
         goingToExpire,
         usedInjectionsFromGoingToExpire} from './src/queries.js';


const app = express();
app.use(cors());

const PRODUCERS = ['Antiqua', 'SolarBuddhica', 'Zerpfy'];

const toMoment = (string) => {
  const t = moment(string);
  if (!t.isValid()) {
    throw new HttpException(400, 'Bad Request');
  };
  
  return t;
}

const toNumber = (string) => {
  const n = Number(string);
  if (isNaN(n) || n < 0) {
    throw new HttpException(400, 'Bad Request');
  };
  
  return n;
}

app.get('/total', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const producer = req.query.producer;
    let orderCount;
    let injectionCount;
    if (producer) {
      if (!PRODUCERS.includes(producer)) throw new HttpException(400, 'Bad Request');
      orderCount = await ordersPerProducer(at, producer);
      injectionCount = await vaccinesPerProducer(at, producer);
    } else {
      orderCount = await totalNumberOfArrivedOrders(at);
      injectionCount = await totalNumberOfArrivedVaccines(at);
    }
    res.json({ orderCount, injectionCount });
  } catch (err) {
    next(err)
  }
});

app.get('/vaccinationsDone', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const vaccinationCount = await vaccinationsDone(at);
    res.json({ vaccinationCount });
  } catch (err) {
    next(err)
  }
});

app.get('/expiredBottles', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const bottleCount = await expiredVaccines(at);
    res.json({ bottleCount });
  } catch (err) {
    next(err)
  }
});

app.get('/expiredBeforeUse', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const totalN = await totalExpired(at.clone());
    const usedN = await usedInjectionsFromExpired(at.clone());
    console.log(totalN, usedN);
    res.json({ vaccineCount: totalN - usedN });
  } catch (err) {
    next(err)
  }
});

app.get('/usable', async (req, res, next) => {
  try {
    const at = toMoment(req.query.datetime);
    const totalN = await totalUsable(at.clone());
    const usedN = await usedInjections(at.clone());
    res.json({ vaccineCount: totalN - usedN });
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
    res.json({ vaccineCount: totalN - usedN });
  } catch (err) {
    next(err)
  }
});

app.use(errorMiddleware);

export default app;

