interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({
  message,
}: ErrorMessageProps) {
  return (
    <div className="border border-red-300 bg-red-50 text-red-700 p-4 rounded-lg">
      {message}
    </div>
  );
}

export default ErrorMessage;