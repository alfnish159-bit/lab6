const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../../server');

let response;

Given('температура в комнате равна {float}', async function (t) {
  await request(app).post('/api/sensors/room-temp').send({ temperature: t });
});

When('я отправляю команду котлу с targetTemp {float} и режимом {string}', async function (targetTemp, mode) {
  response = await request(app).post('/api/heating/control').send({ targetTemp, mode });
});

Then('API возвращает статус-код {int}', function (code) {
  if (response.status !== code) {
    throw new Error(`Ожидался ${code}, пришёл ${response.status}. Body: ${JSON.stringify(response.body)}`);
  }
});

Then('действие котла равно {string}', function (action) {
  if (response.body?.action !== action) {
    throw new Error(`Ожидали action="${action}", получили "${response.body?.action}". Body: ${JSON.stringify(response.body)}`);
  }
});

Then('ответ содержит сообщение {string}', function (msg) {
  const got = response?.body?.message;
  if (!got || !String(got).includes(msg)) {
    throw new Error(`Ожидали "${msg}", получили "${got}". Body: ${JSON.stringify(response.body)}`);
  }
});
