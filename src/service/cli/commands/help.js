'use strict';

const help = (/* args */) => {
  return new Promise((resolve/* , reject */) => {
    console.log(`
      Программа запускает http-сервер и формирует файл с данными для API.
    
      Гайд:
      server <command>
      
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
    `);

    resolve();
  });
};

module.exports = help;
