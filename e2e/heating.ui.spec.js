const { test, expect } = require('@playwright/test');
const HeatingPage = require('./pages/HeatingPage');

test.describe('UI: Smart Heating (variant 6)', () => {
  test('Комфорт + 15°C при цели 20 => Вкл', async ({ page }) => {
    const ui = new HeatingPage(page);
    await ui.open();

    await ui.setCurrentTemp(15);
    await ui.setTargetTemp(20);
    await ui.setMode('Комфорт');
    await ui.clickSend();

    await expect(ui.resultBox).toContainText(/Вкл/i);
  });

  test('Эко + 25°C при цели 20 => Выкл', async ({ page }) => {
    const ui = new HeatingPage(page);
    await ui.open();

    await ui.setCurrentTemp(25);
    await ui.setTargetTemp(20);
    await ui.setMode('Эко');
    await ui.clickSend();

    await expect(ui.resultBox).toContainText(/Выкл/i);
  });

  test('Температура -300 => ошибка (абсолютного нуля)', async ({ page }) => {
    const ui = new HeatingPage(page);
    await ui.open();

    await ui.setCurrentTemp(-300);
    await ui.setTargetTemp(20);
    await ui.setMode('Эко');
    await ui.clickSend();

    await expect(ui.errorBox).toBeVisible();
    await expect(ui.errorBox).toContainText(/абсолютного нуля/i);
  });

  test('Проверить датчик: показывает текущую температуру', async ({ page }) => {
    const ui = new HeatingPage(page);
    await ui.open();

    await ui.setCurrentTemp(12);
    await ui.clickCheckSensor();

    await expect(ui.resultBox).toContainText(/12/);
  });
});
