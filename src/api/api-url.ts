export const PICKTORY_API = {
  login: "/oauth/login",
  logout: "/oauth/logout",
  getBundlesPreview: "/bundles/main",
  getMyBundles: "/bundles",
  getMyBundleDetail: (id: number) => `/bundles/${id}`,
  deleteMyBundle: (id: number) => `/bundles/${id}`,
  getBundleResult: (id: number) => `/bundles/${id}/result`,
  getGiftDetail: (bundleId: number, giftId: number) =>
    `/bundles/${bundleId}/gifts/${giftId}`,
  getDraftBundleGifts: (id: number) => `/bundles/${id}/gifts`,
  postBundles: "/bundles",
  putBundlesUpdate: (bundleId: number) => `/bundles/${bundleId}`,
  putDeliveryCharacter: (id: number) => `/bundles/${id}/delivery`,
  postGiftImageUpload: "/gifts/images/upload",
  openBundle: (link: string) => `/responses/bundles/${link}`,
  postBundleAnswer: (link: string) => `/responses/bundles/${link}/answers`,
};
