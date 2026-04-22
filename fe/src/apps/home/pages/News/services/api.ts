import { axiosNewsClient } from '@configs/axios';
import { type ITopicArticle, type TFilter } from './types';
import { stringtifyQuery } from '@/shared/utils';
import type { IResponsePagination } from '@/shared/types/response.type';

export const getTopicsArticle = (params: TFilter): Promise<IResponsePagination<ITopicArticle>> => {
  const query = stringtifyQuery(params);
  return axiosNewsClient.get(`/cmc/Article/topicId?${query}`)  
}

