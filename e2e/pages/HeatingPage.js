class HeatingPage {
  constructor(page) {
    this.page = page;

    this.currentTempInput = page.locator(
      '#currentTemp, #temperature, #temp, input[name="temperature"], input[placeholder*="Температура"], input[type="number"]'
    ).first();

    this.targetTempInput = page.locator(
      '#targetTemp, #target, input[name="targetTemp"], input[placeholder*="Целевая"]'
    ).first();

    this.ecoRadio = page.locator('#modeEco, input[type="radio"][value="Эко"]').first();
    this.comfortRadio = page.locator('#modeComfort, input[type="radio"][value="Комфорт"]').first();

    this.sendBtn = page.getByRole('button', { name: /отправить/i });

    this.checkSensorBtn = page.locator(
      'button:has-text("Проверить датчик"), input[type="button"][value*="Проверить"], a:has-text("Проверить датчик")'
    ).first();

    this.resultBox = page.locator('#result, [data-testid="result"], .result').first();

    this.errorBox = page.locator(
      '#error, .error, #result.error, .result.error, .result.err, .alert.error, .alert-danger'
    ).first();
  }

  async open() {
    await this.page.goto('http://localhost:3000');
  }

  async setCurrentTemp(value) {
    await this.currentTempInput.waitFor({ state: 'visible' });
    await this.currentTempInput.fill(String(value));
  }

  async setTargetTemp(value) {
    await this.targetTempInput.waitFor({ state: 'visible' });
    await this.targetTempInput.fill(String(value));
  }

  async setMode(mode) {
    if (mode === 'Эко') {
      await this.ecoRadio.check();
    } else {
      await this.comfortRadio.check();
    }
  }

  async clickSend() {
    await this.sendBtn.click();
  }

  async clickCheckSensor() {
    await this.checkSensorBtn.waitFor({ state: 'visible' });
    await this.checkSensorBtn.click();
  }
}

module.exports = HeatingPage;
