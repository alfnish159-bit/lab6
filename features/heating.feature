Feature: Smart Heating UI/API

  Scenario Outline: Решение по режиму
    Given температура в комнате равна <current>
    When я отправляю команду котлу с targetTemp <target> и режимом "<mode>"
    Then API возвращает статус-код <code>
    And действие котла равно "<action>"

    Examples:
      | current | target | mode     | code | action |
      | 17      | 20     | Эко      | 200  | ON     |
      | 17.01   | 20     | Эко      | 200  | OFF    |
      | 19.5    | 20     | Комфорт  | 200  | ON     |
      | 19.51   | 20     | Комфорт  | 200  | OFF    |

  Scenario: Ошибка ниже абсолютного нуля
    Given температура в комнате равна -300
    When я отправляю команду котлу с targetTemp 20 и режимом "Эко"
    Then API возвращает статус-код 400
    And ответ содержит сообщение "Температура ниже абсолютного нуля"
