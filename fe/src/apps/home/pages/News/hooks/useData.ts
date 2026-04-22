import { normalizeMediaUrl } from "@/shared/utils/mediaUrl";
import { useTopicsArticleQuery, type ITopicArticle, type TFilter } from "../services";
import { formatDate } from "~/shared/utils/formatDate";

export const useData = (filter: TFilter) => {
  const { data: apiRes, isLoading, refetch } = useTopicsArticleQuery(filter);

  const mapData = (data: ITopicArticle[]) =>
    data.map((item, index) => ({
      index: index + 1,
      key: item.id,
      id: item.id,
      title: item.title,
      urlFriendly: item.urlFriendly,
      image: normalizeMediaUrl(item.image),
      summary: item.summary,
      authorName: item.authorName,
      publishedDate: formatDate(item.publishedDate),
      numOfView: item.numOfView,
      raw: item,
    }));

  return {
    data: mapData(apiRes?.data ?? []),
    isLoading,
    refetch,
    total: apiRes?.metaData?.total,
  };
};

export default useData;
