export const makeImgPath = (img: string, width: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${width}${img}`;
};

export const loadMore = (
  hasNextPage: boolean | undefined,
  fetchNextPage: any
) => {
  if (hasNextPage) {
    fetchNextPage();
  }
};

export const getNextPageParamUtil = (currentPage: any) => {
  const nextPage = currentPage.page + 1;
  return nextPage > currentPage.total_pages ? null : nextPage;
};
