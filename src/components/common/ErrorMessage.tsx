interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="text-symantic-negative text-xs mt-1">{message}</p>;
};

export default ErrorMessage;
