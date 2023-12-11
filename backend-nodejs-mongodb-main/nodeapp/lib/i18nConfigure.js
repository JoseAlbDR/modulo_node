//* Cargar libreira i18n
const i18n = require('i18n');
const path = require('path');

//* Configurar mi instancia de i18n
i18n.configure({
  locales: ['es', 'en'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
});

//* Para utilizar en scripts
i18n.setLocale('en');

//* Exportarla ya configurada
module.exports = i18n;
