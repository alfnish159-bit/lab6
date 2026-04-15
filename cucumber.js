module.exports = {
  default: [
    '--require features/step_definitions/**/*.js',
    '--require-module allure-cucumberjs',
    '--format summary',
    '--format html:report.html'
  ].join(' ')
};
