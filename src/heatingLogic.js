const ABS_ZERO = -273.15;

function getThreshold(mode) {
  if (mode === 'Эко') return 3;
  if (mode === 'Комфорт') return 0.5;
  throw new Error('Неизвестный режим');
}

function shouldTurnOnBoiler(currentTemp, targetTemp, mode) {
  if (typeof currentTemp !== 'number' || typeof targetTemp !== 'number') {
    throw new Error('Температуры должны быть числами');
  }
  if (currentTemp < ABS_ZERO || targetTemp < ABS_ZERO) {
    throw new Error('Температура ниже абсолютного нуля');
  }
  const threshold = getThreshold(mode);
  return currentTemp <= targetTemp - threshold;
}

module.exports = { ABS_ZERO, getThreshold, shouldTurnOnBoiler };
