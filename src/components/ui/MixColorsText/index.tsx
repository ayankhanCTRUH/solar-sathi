import { MixColorsTextProps } from '@/types';

const MixColorsText = ({ className = '', content }: MixColorsTextProps) => {
  const color = (value: string) => {
    return value === 'blue'
      ? 'text-secondary-500'
      : value
        ? value
        : 'text-white';
  };

  return (
    <h1 className={`font-poppins flex flex-wrap ${className}`}>
      {content.map((item, index) => {
        return (
          <span
            key={index}
            className={`font-poppins text-[54px]/[76px] font-bold -tracking-[1.08px] ${item.break ? 'w-full' : ''} ${color((item.variant || item.color) as string)}`}
          >
            {item.text}&nbsp;
          </span>
        );
      })}
    </h1>
  );
};

export default MixColorsText;
