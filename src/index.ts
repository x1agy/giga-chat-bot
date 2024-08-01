const path = require('path');
import 'dotenv/config';
import { client } from './core';
import { v2Endpoints } from './constants';

// process.env.NODE_EXTRA_CA_CERTS = path.resolve(__dirname, 'dir', 'with', 'certs');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

let data = JSON.stringify({
  model: 'GigaChat',
  messages: [
    {
      role: 'system',
      content:
        'Ты профессиональный переводчик на английский язык. Переведи точно сообщение пользователя.',
    },
    {
      role: 'user',
      content:
        'GigaChat — это сервис, который умеет взаимодействовать с пользователем в формате диалога, писать код, создавать тексты и картинки по запросу пользователя.',
    },
  ],
  n: 1,
  stream: false,
  update_interval: 0,
});

(async () => {
  const response = await client.post(v2Endpoints.chat, data);
  //   console.log(response);
  //   console.log(JSON.stringify(response.data));
})();
