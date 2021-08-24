import app from '../src/app.js';
import supertest from 'supertest';
import suppressLogs from 'mocha-suppress-logs';

const request = supertest(app)

describe('/total', async () => {
  it(`Returns the total order and injection count as JSON up to current date,
      when given no datetime`, async () => {
    const res = await request
      .get('/total')
      .expect(200, JSON.stringify({ orderCount: 5000, injectionCount: 25015 }));
  });

  it(`Returns status 400,
      when given an invalid datetime`, async () => {
    const res = await request
      .get('/total?datetime=0000-08-14T18sd:38:30')
      .expect(400);
  });
});

describe('/vaccinationsDone', () => {
  it(`Returns the number of vaccinations done up to a given day as JSON,
    when given a proper date as query string`, async () => {
    const res = await request
      .get('/vaccinationsDone?datetime=2021-08-14T18:38:30')
      .expect(200, JSON.stringify({ count: 7000 }));
  });
  it(`Returns status 400 when given an invalid datetime`, async () => {
    const res = await request
      .get('/vaccinationsDone?datetime=0000-08-14T18sd:38:30')
      .expect(400);
  });
});


describe('/expiredBottles', () => {
  it(`Returns the number of expired bottles on a given day as JSON,
    when given a proper date as query string`, async () => {
    const res = await request
      .get('/expiredBottles?datetime=2021-02-12T18:38:30')
      .expect(200, JSON.stringify({ count: 54 }));
  });
  it(`Returns status 400 when given an invalid datetime`, async () => {
    const res = await request
      .get('/expiredBottles?datetime=0000-08-14T18sd:38:30')
      .expect(400);
  });
});

describe('/expiredBeforeUse', () => {
  it(`returns the number of vaccinations that expired before use up to a given day as JSON,
    when given a proper date as query string`, async () => {
    const res = await request
      .get('/expiredBeforeUse?datetime=2021-04-12T11:10:06')
      .expect(200, JSON.stringify({ count: 12590 }));
  });
  it(`Returns status 400 when given an invalid datetime`, async () => {
    const res = await request
      .get('/expiredBeforeUse?datetime=sssss-08-14T18sd:38:30')
      .expect(400);
  });
});

describe('/goingToExpire', () => {
  it(`returns the number of vaccinations that are going to expire in the next n days,
    when given a proper date as query string and n is an unsigned integer`, async () => {
    const res = await request
      .get('/goingToExpire?datetime=2021-04-12T11:10:06&range=10')
      .expect(200, JSON.stringify({ count : 1972 }));
  });
  it(`Returns status 400 when given an invalid datetime`, async () => {
    const res = await request
      .get('/goingToExpire?datetime=sssss30&range=10')
      .expect(400);
  });
  it(`Returns status 400 when given an invalid range`, async () => {
    const res = await request
      .get('/goingToExpire?datetime=2021-04-12T11:10:06&range=-1')
      .expect(400);
  });
});
