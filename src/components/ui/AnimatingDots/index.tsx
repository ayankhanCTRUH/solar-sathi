const AnimatingDots = ({ color }: { color: string }) => {
  return (
    <div className="flex space-x-3">
      <div
        className={`animate-pulse-scale h-3.5 w-3.5 rounded-full ${color}`}
      />
      <div
        className={`animate-pulse-scale h-3.5 w-3.5 rounded-full ${color}`}
        style={{ animationDelay: '0.3s' }}
      />
      <div
        className={`animate-pulse-scale h-3.5 w-3.5 rounded-full ${color}`}
        style={{ animationDelay: '0.6s' }}
      />
    </div>
  );
};

export default AnimatingDots;
