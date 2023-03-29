type Props = {
  message: string;
};

export default function Success({ message }: Props) {
  return (
    <div className="h-screen flex flex-col justify-center max-w-3xl mx-auto">
      <div className="sm:text-2xl text-xl">{message}</div>
    </div>
  );
};
