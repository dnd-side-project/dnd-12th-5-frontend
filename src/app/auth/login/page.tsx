// 카카오 로그인 페이지

"use client";

import Image from "next/image";

import KakaoLogin from "/public/icons/btn_login_kakao.svg";

const Page = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex flex-col justify-center items-center pt-6 gap-8">
      <section className="w-[340px] h-[442px] bg-gray-100">그래픽</section>
      <section>
        <button onClick={loginHandler}>
          <Image src={KakaoLogin} alt="KakaoLoginBtn" />
        </button>
      </section>
    </div>
  );
};

export default Page;
