import { PICKTORY_API } from "../api-url";
import axiosInstance from "../axiosInstance";
import { handleAxiosError } from "@/utils/axios";

export const uploadGiftImages = async (
  formData: FormData,
): Promise<string[]> => {
  try {
    const response = await axiosInstance.post(
      PICKTORY_API.postGiftImageUpload,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.result.uploadedUrls;
  } catch (error) {
    return handleAxiosError(error, "이미지 업로드 실패");
  }
};
