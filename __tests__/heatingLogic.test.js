const { shouldTurnOnBoiler, ABS_ZERO } = require('../src/heatingLogic');

describe('heatingLogic (unit)', () => {
  test('Эко: включает если ниже цели на 3 и больше', () => {
    expect(shouldTurnOnBoiler(17, 20, 'Эко')).toBe(true);
  });

  test('Эко: не включает если ниже цели меньше чем на 3', () => {
    expect(shouldTurnOnBoiler(17.01, 20, 'Эко')).toBe(false);
  });

  test('Комфорт: включает если ниже цели на 0.5 и больше', () => {
    expect(shouldTurnOnBoiler(19.5, 20, 'Комфорт')).toBe(true);
  });

  test('Комфорт: не включает если ниже цели меньше чем на 0.5', () => {
    expect(shouldTurnOnBoiler(19.51, 20, 'Комфорт')).toBe(false);
  });

  test('Ошибка: температура ниже абсолютного нуля', () => {
    expect(() => shouldTurnOnBoiler(ABS_ZERO - 0.01, 20, 'Эко')).toThrow();
    expect(() => shouldTurnOnBoiler(20, ABS_ZERO - 1, 'Комфорт')).toThrow();
  });
});
