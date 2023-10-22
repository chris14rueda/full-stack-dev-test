import axios from 'axios';
import applyConverters from 'axios-case-converter';

const baseURL = import.meta.env.VITE_API_URL;

export const request = applyConverters(
  axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
);
