const $ = (id) => document.getElementById(id);

$('send').addEventListener('click', async () => {
  const temperature = Number($('temp').value);
  const targetTemp = Number($('target').value);
  const mode = document.querySelector('input[name="mode"]:checked')?.value;

  const out = $('result');
  out.className = 'result';
  out.textContent = '';

  try {
    const r1 = await fetch('/api/sensors/room-temp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature })
    });
    const j1 = await r1.json();
    if (!r1.ok) throw new Error(j1.message || 'Ошибка датчика');

    const r2 = await fetch('/api/heating/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetTemp, mode })
    });
    const j2 = await r2.json();
    if (!r2.ok) throw new Error(j2.message || 'Ошибка котла');

    out.classList.add('ok');
    out.textContent = `Отопление: ${j2.action === 'ON' ? 'Вкл' : 'Выкл'}`;
  } catch (e) {
    out.classList.add('err');
    out.textContent = `Ошибка: ${e.message}`;
  }
});
