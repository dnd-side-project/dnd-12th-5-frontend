const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="text-xs font-medium text-symantic-negative">{message}</p>
  );
};

export default ErrorMessage;
