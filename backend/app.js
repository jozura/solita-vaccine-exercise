import express from 'express';
import errorMiddleware from './src/middleware/error.js';
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

app.get('/total', async (req, res, next) => {
  try {
    const at = req.query.datetime;
    const producer = req.query.producer;
    let orderCount;
    let injectionCount;
    if (producer) {
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
    const at = req.query.datetime;
    const vaccinationCount = await vaccinationsDone(at);
    res.json({ vaccinationCount });
  } catch (err) {
    next(err)
  }
});

app.get('/expiredVaccines', async (req, res, next) => {
  try {
    const at = req.query.datetime;
    const bottleCount = await expiredVaccines(at);
    res.json({ bottleCount });
  } catch (err) {
    next(err)
  }
});

app.get('/expiredBeforeUse', async (req, res, next) => {
  try {
    const at = req.query.datetime;
    const totalN = await totalExpired(at);
    const usedN = await usedInjectionsFromExpired(at);
    res.json({ vaccineCount: totalN - usedN });
  } catch (err) {
    next(err)
  }
});

app.get('/usable', async (req, res, next) => {
  try {
    const at = req.query.datetime;
    const totalN = await totalUsable(at);
    const usedN = await usedInjections(at);
    res.json({ vaccineCount: totalN - usedN });
  } catch (err) {
    next(err)
  }
});

app.get('/goingToExpire', async (req, res, next) => {
  try {
    const from = req.query.datetime;
    const inDays = req.query.range;
    const totalN = await goingToExpire(from, inDays);
    const usedN = await usedInjectionsFromGoingToExpire(from, inDays);
    res.json({ vaccineCount: totalN - usedN });
  } catch (err) {
    next(err)
  }
});

app.use(errorMiddleware);

export default app;

