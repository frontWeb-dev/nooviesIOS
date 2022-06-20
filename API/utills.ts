export const makeImgPath = (img: string, width: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${width}${img}`;
};

export const makeVideoPath = (key?: string) => {
  if (key) {
    return `https://www.youtube.com/embed/${key}`;
  } else {
    return null;
  }
};
