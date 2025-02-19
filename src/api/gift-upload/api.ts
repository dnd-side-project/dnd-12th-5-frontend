{
  /** 이미지 업로드 API */
}

export const uploadGiftImages = async (
  formData: FormData,
): Promise<string[]> => {
  const response = await fetch("/api/v1/gifts/images/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const data = await response.json();
  return data.result.uploadedUrls as string[];
};
