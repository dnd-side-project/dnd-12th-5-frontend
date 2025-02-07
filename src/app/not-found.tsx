const NotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-2">페이지를 찾을 수 없습니다.</p>
      <a href="/" className="mt-4 px-4 py-2 bg-[#ff564a] text-white rounded">
        홈으로 이동
      </a>
    </div>
  );
};

export default NotFound;
