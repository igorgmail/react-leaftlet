### Добавил файл `.env.development` заменил строку в `packade.json`
- ` "start": "env-cmd -f .env.local react-scripts start",`
- на  `"start": "env-cmd -f .env.development react-scripts start",`
- в `.env.development` не все переменные только для работы route `settings`