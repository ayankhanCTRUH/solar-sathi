import Button from '@/components/ui/Button';
import MixColorsText from '@/components/ui/MixColorsText';
import { MiddleContentProps } from '@/types';

const MiddleContent = ({
  top: { titleProps, subtitleProps },
  bottom: { textProps, buttonProps },
}: MiddleContentProps) => {
  return (
    <div className="flex h-[calc(100%-74px)] flex-col items-center justify-between bg-blue-950 pt-12 pb-4 text-white">
      <div className="flex flex-col items-center gap-2">
        <MixColorsText {...titleProps} />
        <MixColorsText
          {...subtitleProps}
          className={`[&>span]:font-dm-sans [&>span]:text-[32px] [&>span]:leading-[45px] [&>span]:font-normal [&>span]:-tracking-[1.28px] [&>span:last-child]:font-medium ${subtitleProps?.className ?? ''}`}
        />
      </div>
      <div className="bg-background-dark-300 flex w-3xl gap-6 rounded-xl border border-neutral-100 px-6 py-4">
        <MixColorsText
          {...textProps}
          className={`[&>span]:font-dm-sans w-3/5 [&>span]:text-2xl [&>span]:font-normal [&>span:nth-last-child(2)]:font-bold ${textProps?.className ?? ''}`}
        />
        <Button
          {...buttonProps}
          className={`!h-fit !max-w-[282px] ${buttonProps?.className ?? ''}`}
        />
      </div>
    </div>
  );
};

export default MiddleContent;
