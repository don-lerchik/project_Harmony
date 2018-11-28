export const resize = (parent, picture) => {
  const ratio = picture.width / picture.height;
  const actualSize = {};
  actualSize.width = ((parent.width / ratio) < parent.height)
    ? parent.width
    : Math.floor(parent.height * ratio);

  actualSize.height = ((parent.width / ratio) < parent.height)
    ? Math.floor(parent.width / ratio)
    : parent.height;
  return actualSize;
};
export const changeImg = (img) => {
  const parent = {};
  const picture = {};
  parent.width = img.parentNode.clientWidth;
  parent.height = img.parentNode.clientHeight;
  picture.width = img.naturalWidth;
  picture.height = img.naturalHeight;
  img.width = resize(parent, picture).width;
  img.height = resize(parent, picture).height;
};
