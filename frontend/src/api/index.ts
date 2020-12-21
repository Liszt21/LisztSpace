import axios, { AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
import store from '../store';

axios.defaults.baseURL = 'http://localhost:5000/api';

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const withToken = (token: string | null) => ({
  headers: {
    Authorization: token,
  },
});

const handleResponse = (response: AxiosResponse) => {
  return response.data;
};

const handleError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;

    const actualError = error.response.data.error;
    if (actualError) {
      throw new ApiError(
        `${actualError.title} - ${actualError.details}`,
        status
      );
    }
  }
  throw new ApiError(error.message, 500);
};

export const login = (username: string, password: string) =>
  axios
    .get('/user', { auth: { username, password } })
    .then((response) => {
      store.dispatch({
        type: 'LOGIN',
        payload: {
          ...response.data,
        },
      });
      message.success('Welcome ' + response.data.username);
      return response.data;
    })
    .catch(handleError);

export const register = (username: string, password: string, email: string) =>
  axios
    .post('/user', {
      username,
      password,
      email,
    })
    .then(() => {
      login(username, password);
    })
    .catch(handleError);

export const update = (
  token: string,
  name?: string,
  new_password?: string,
  old_password?: string,
  nation?: string,
  hobby?: string,
  major?: string
) =>
  axios
    .put(
      '/user',
      {
        name,
        nation,
        hobby,
        major,
        new_password,
        old_password,
      },
      withToken(token)
    )
    .then(() => {
      store.dispatch({
        type: 'UPDATE',
        payload: {
          name,
          nation,
          hobby,
          major,
        },
      });
    })
    .catch(handleError);

export const remove = (token: string) =>
  axios
    .delete('/user', withToken(token))
    .then(handleResponse)
    .catch(handleError);
