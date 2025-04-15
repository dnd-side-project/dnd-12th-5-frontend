const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH;

export const PICKTORY_API = {
  login: `${API_BASE_PATH}/oauth/login`,
  logout: `${API_BASE_PATH}/oauth/logout`,
  getBundlesPreview: `${API_BASE_PATH}/bundles/main`,
  getMyBundles: `${API_BASE_PATH}/bundles`,
  getMyBundleDetail: (id: number) => `${API_BASE_PATH}/bundles/${id}`,
  deleteMyBundle: (id: number) => `${API_BASE_PATH}/bundles/${id}`,
  getBundleResult: (id: number) => `${API_BASE_PATH}/bundles/${id}/result`,
  getGiftDetail: (bundleId: number, giftId: number) =>
    `${API_BASE_PATH}/bundles/${bundleId}/gifts/${giftId}`,
  getDraftBundleGifts: (id: number) => `${API_BASE_PATH}/bundles/${id}/gifts`,
  postBundles: `${API_BASE_PATH}/bundles`,
  putBundlesUpdate: (bundleId: number) =>
    `${API_BASE_PATH}/bundles/${bundleId}`,
  putDeliveryCharacter: (id: number) =>
    `${API_BASE_PATH}/bundles/${id}/delivery`,
  postGiftImageUpload: `${API_BASE_PATH}/gifts/images/upload`,
  openBundle: (link: string) => `${API_BASE_PATH}/responses/bundles/${link}`,
  postBundleAnswer: (link: string) =>
    `${API_BASE_PATH}/responses/bundles/${link}/answers`,
};
