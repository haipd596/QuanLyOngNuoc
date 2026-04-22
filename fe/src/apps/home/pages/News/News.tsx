import { Empty, Pagination, Spin } from 'antd';
import MainLayout from '../../components/MainLayout';
import {
  NewsContainer,
  NewsGrid,
  NewsCardWrapper,
  NewsCardContent,
  NewsCardTitle,
  NewsCardDescription,
  NewsCardFooter,
  NewsAuthor,
  NewsDate,
  EmptyState,
  NewsImageWrapper,
  NewsImage,
} from './styled';

import { HOME_ROUTE } from '../../constants';
import type { TFilter } from './services';
import { useData } from './hooks/useData';
import useFilter from '@/shared/hooks/useFilter';

export const initialFilter: TFilter = {
  page: 1,
  pageSize: 12,
  Query: {
    LangCode: 'VI',
  },
};

const NewsPage = () => {
  const { filter, setFilter } = useFilter(initialFilter);
  const { data, isLoading, total } = useData(filter);

  const handleChangePage = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page,
      pageSize,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout
      breadcrumb={[
        { label: 'Trang chủ', href: HOME_ROUTE },
        { label: 'Tin tức' },
      ]}
    >
      <NewsContainer>
        {isLoading ? (
          <Spin />
        ) : data?.length ? (
          <>
            <NewsGrid>
              {data.map((news) => (
                <NewsCardWrapper
                  key={news.id}
                  to={`/news/${news.id}`}
                >
                  <NewsImageWrapper>
                    <NewsImage src={news.image} alt={news.title} />
                  </NewsImageWrapper>

                  <NewsCardContent>
                    <NewsCardTitle title={news.title}>
                      {news.title}
                    </NewsCardTitle>

                    <NewsCardDescription>
                      {news.summary}
                    </NewsCardDescription>

                    <NewsCardFooter>
                      <NewsAuthor title={news.authorName}>
                        {news.authorName}
                      </NewsAuthor>

                      <NewsDate title={news.publishedDate}>
                        {news.publishedDate}
                      </NewsDate>
                    </NewsCardFooter>
                  </NewsCardContent>
                </NewsCardWrapper>
              ))}
            </NewsGrid>

            <Pagination
              current={filter.page}
              pageSize={filter.pageSize}
              total={total}
              onChange={handleChangePage}
              style={{ marginTop: 20, textAlign: 'center' }}
            />
          </>
        ) : (
          <EmptyState>
            <Empty description="Không tìm thấy tin tức nào" />
          </EmptyState>
        )}
      </NewsContainer>
    </MainLayout>
  );
};

export default NewsPage;