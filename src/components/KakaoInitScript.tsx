"use client";

import Script from "next/script";

const KakaoInitScript = () => {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
      integrity={process.env.NEXT_PUBLIC_SDK_INTEGRITY}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }
      }}
    />
  );
};

export default KakaoInitScript;
