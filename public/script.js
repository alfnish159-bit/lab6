const currentTempInput = document.getElementById('currentTemp');
const targetTempInput = document.getElementById('targetTemp');
const modeEco = document.getElementById('modeEco');
const modeComfort = document.getElementById('modeComfort');
const sendBtn = document.getElementById('sendBtn');
const checkSensorBtn = document.getElementById('checkSensorBtn');
const resultBox = document.getElementById('result');
const errorBox = document.getElementById('error');

function setOk(text) {
  resultBox.className = 'result ok';
  resultBox.textContent = text;
  errorBox.textContent = '';
}

function setError(text) {
  errorBox.textContent = text;
  resultBox.className = 'result';
  resultBox.textContent = '';
}

function getMode() {
  return modeComfort.checked ? 'Комфорт' : 'Эко';
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

sendBtn.addEventListener('click', async () => {
  try {
    const currentTemp = Number(currentTempInput.value);
    const targetTemp = Number(targetTempInput.value);
    const mode = getMode();

    await postJson('/api/sensors/room-temp', { temperature: currentTemp });
    const r = await postJson('/api/heating/control', { targetTemp, mode });

    const human = r.action === 'ON' ? 'Вкл' : 'Выкл';
    setOk(`Отопление: ${human}`);
  } catch (e) {
    setError(e.message || String(e));
  }
});

checkSensorBtn.addEventListener('click', async () => {
  try {
    const currentTemp = Number(currentTempInput.value);
    const r = await postJson('/api/sensors/room-temp', { temperature: currentTemp });
    setOk(`Температура датчика: ${r.temperature}`);
  } catch (e) {
    setError(e.message || String(e));
  }
});
