const express = require('express');
const path = require('path');
const { ABS_ZERO, shouldTurnOnBoiler } = require('./src/heatingLogic');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let currentRoomTemp = null;

app.post('/api/sensors/room-temp', (req, res) => {
  const { temperature } = req.body;
  if (typeof temperature !== 'number') {
    return res.status(400).json({ status: 'error', message: 'Температура должна быть числом' });
  }
  currentRoomTemp = temperature;
  return res.json({ status: 'success', temperature: currentRoomTemp });
});

app.get('/api/sensors/room-temp', (req, res) => {
  return res.json({ status: 'success', temperature: currentRoomTemp });
});

app.post('/api/heating/control', (req, res) => {
  try {
    const { targetTemp, mode } = req.body;

    if (typeof currentRoomTemp !== 'number') {
      return res.status(400).json({ status: 'error', message: 'Нет данных датчика' });
    }
    if (typeof targetTemp !== 'number') {
      return res.status(400).json({ status: 'error', message: 'Целевая температура должна быть числом' });
    }
    if (currentRoomTemp < ABS_ZERO || targetTemp < ABS_ZERO) {
      return res.status(400).json({ status: 'error', message: 'Температура ниже абсолютного нуля' });
    }

    const on = shouldTurnOnBoiler(currentRoomTemp, targetTemp, mode);
    return res.json({ status: 'success', action: on ? 'ON' : 'OFF' });
  } catch (e) {
    return res.status(400).json({ status: 'error', message: e.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
}

module.exports = app;
