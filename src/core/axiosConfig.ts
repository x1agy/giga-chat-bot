import axios, { AxiosRequestConfig } from 'axios';

export const authData = process.env.AUTH_DATA;

type TokenResponseSchema = {
  access_token: string;
  expires_at: number;
};

const config: AxiosRequestConfig = {
  baseURL: 'https://gigachat.devices.sberbank.ru/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const client = axios.create(config);

client.interceptors.request.use(async (config) => {
  if ((Number(config.headers.get('ExpiresAt')) ?? Infinity) < Date.now()) {
    const authUpdateConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: authData,
      },
    };

    const response = await axios(authUpdateConfig);
    const data = JSON.stringify(response.data) as unknown as TokenResponseSchema;

    console.log({ data });

    config.headers.setAuthorization(data.access_token);
    config.headers.set('ExpiresAt', data.expires_at);
  }
  return config;
});
