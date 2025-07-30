const PulseDot = ({ className }: { className: string }) => {
  return (
    <div
      className={`bg-secondary-500 absolute h-[26px] w-[26px] rounded-full ${className}`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className={`animate-pulseAnimation absolute h-full w-full rounded-full bg-inherit opacity-80`}
          style={{ animationDelay: `${index * 500}ms` }}
        />
      ))}
    </div>
  );
};

export default PulseDot;
