const request = require('supertest');
const app = require('../../../app'); // reference to you app.js file
const feedback = require('../../../services/current/feedback');

describe('/api/current/feedback', () => {

  it('should call info when /info requested.', async (done) => {
    const mockResponse = JSON.stringify({
      totalCount: 100,
      progressCount: 10 });
    const spy = jest.spyOn(feedback, 'info').mockImplementation(() => mockResponse);

    await request(app)
      .post('/api/current/feedback/info')
      .send()
      .expect(200)
      .expect(mockResponse);

    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should call create when /create requested.', async (done) => {
    const sendData = JSON.stringify({
      modelName: 'TEST Model Name',
      modelCreateAt: new Date(),
    });
    const mockResponse = JSON.stringify('OK');
    const spy = jest.spyOn(feedback, 'create').mockImplementation(() => mockResponse);

    await request(app)
      .post('/api/current/feedback/create')
      .send(sendData)
      .expect(200)
      .expect(mockResponse);

    expect(spy).toHaveBeenCalled();
    done();
  });
});
