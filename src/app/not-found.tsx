const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-lg text-gray-600">페이지를 찾을 수 없습니다.</p>
      <a href="/" className="mt-4 rounded bg-[#ff564a] px-4 py-2 text-white">
        홈으로 이동
      </a>
    </div>
  );
};

export default NotFound;
