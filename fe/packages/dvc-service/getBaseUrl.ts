export const getBaseDvcApi = () => {
  // if (import.meta.env.MODE === 'production') {
  //   return window.location.origin;
  // }

  return import.meta.env.VITE_API_DVC_URL;
};

export const getBaseDvcViewPdf = () => {
  // if (import.meta.env.MODE === 'production') {
  //   return window.location.origin;
  // }

  return import.meta.env.VITE_API_DVC_URL;
};
