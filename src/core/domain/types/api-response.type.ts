import { ApiReponseCodes } from '../constants';

type TApiBaseReponse = {
  code: (typeof ApiReponseCodes)[number];
  message?: string;
  description?: string;
};

type RecordOrRecordArray =
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

type TApiDataResponse<T = unknown> = {
  data?: T;
};

type TApiTokenResponse<T = unknown> = {
  tokens?: T;
};

type TApiErrorResponse<T = unknown> = {
  error?: T;
};

export type TApiResponse<
  TData = RecordOrRecordArray,
  TTokens = RecordOrRecordArray,
  TError = RecordOrRecordArray,
> = TApiBaseReponse &
  TApiDataResponse<TData> &
  TApiTokenResponse<TTokens> &
  TApiErrorResponse<TError>;

export type TApiResponseAsync<
  TData = RecordOrRecordArray,
  TTokens = RecordOrRecordArray,
  TError = RecordOrRecordArray,
> = Promise<TApiResponse<TData, TTokens, TError>>;
