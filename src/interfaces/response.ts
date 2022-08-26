import { AxiosResponse } from 'axios';

export interface responseI extends AxiosResponse {
  count: number;
}
