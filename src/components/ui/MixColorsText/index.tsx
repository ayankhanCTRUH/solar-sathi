import { MixColorsTextProps, TextItem } from '@/types';

const MixColorsText = ({ className = '', content }: MixColorsTextProps) => {
  const color = (value: TextItem['variant'] | TextItem['color']) => {
    return value === 'blue'
      ? 'text-secondary-500'
      : value === 'neutral-300'
        ? 'text-background-400'
        : value === 'neutral-500'
          ? 'text-neutral-dark-500'
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
            className={`font-poppins text-[54px]/[76px] font-bold -tracking-[1.08px] ${item.break ? 'w-full' : ''} ${color(item.variant || item.color)}`}
          >
            {item.text}&nbsp;
          </span>
        );
      })}
    </h1>
  );
};

export default MixColorsText;
