const request = require('supertest');
const app = require('../../../app'); // reference to you app.js file

const current = require('../../../services/current/index');

describe('/api/current', () => {
  it('should call state when /state requested.', async (done) => {
    const mockResponse = JSON.stringify(10);
    const spy = jest.spyOn(current, 'state').mockImplementation(() => mockResponse);

    await request(app)
      .post('/api/current/state')
      .send()
      .expect(200)
      .expect(mockResponse);

    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should call setState when /set-state requested.', async (done) => {
    const sendData = JSON.stringify({ state: 10 });
    const spy = jest.spyOn(current, 'setState');

    await request(app)
      .post('/api/current/set-state')
      .send(sendData)
      .expect(200);

    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should call init when /init requested.', async (done) => {
    const spy = jest.spyOn(current, 'init');

    await request(app)
      .post('/api/current/init')
      .expect(200);

    expect(spy).toHaveBeenCalled();
    done();
  });
});
