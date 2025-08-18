import Button from '@/components/ui/Button';
import MixColorsText from '@/components/ui/MixColorsText';
import Modal from '@/components/ui/Modal';
import { MiddleSectionModalStateProps, ServiceModalProps } from '@/types';
import Image from 'next/image';
import AutoRedirectBody from './AutoRedirect';
import { formatNumWithUnits } from '@/lib/utils';

const ServiceableModal = ({
  open,
  data,
  onClose,
  handleHomeClick,
  handlePinClick,
}: ServiceModalProps & {
  data: MiddleSectionModalStateProps['serviceable'];
}) => {
  if (data === false) return;

  const { pinCode, city, count, lifetimeSavings } = data;

  const handleRedirection = () => {
    handleHomeClick();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      footer={<AutoRedirectBody handleRedirection={handleRedirection} />}
    >
      <div className="font-dm-sans bg-background-dark-400 flex w-[800px] flex-col gap-12 p-8 text-white">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <MixColorsText
              content={[
                { text: 'SolarSquare Homes in', break: true },
                { text: pinCode, variant: 'blue' },
                { text: `(${city})` },
              ]}
              className="justify-center text-center [&>span:first-child]:mb-2 [&>span:first-child]:font-semibold [&>span:last-child]:text-[28px] [&>span:last-child]:leading-[39px] [&>span:last-child]:font-normal [&>span:nth-last-child(2)]:text-[28px] [&>span:nth-last-child(2)]:leading-[39px]"
            />
            <div className="font-poppins relative h-48 text-[144px] font-bold">
              <span className="text-secondary-500 absolute inset-0 -translate-y-2">
                {count}
              </span>
              <span className="text-transparent [-webkit-text-stroke:1px_var(--color-secondary-500)]">
                {count}
              </span>
            </div>
            <div className="text-background-200 text-2xl leading-8 -tracking-[0.96px]">
              SolarSquare homes around you!
            </div>
          </div>
          <div className="flex w-fit items-center gap-4 rounded-2xl border border-green-600 bg-green-600 px-6 py-2">
            <div className="flex gap-2">
              <Image
                height={0}
                width={0}
                sizes="100vw"
                alt="money"
                src="/icons/money.svg"
                className="h-16 w-14"
              />
              <div className="text-green-success-500 text-[40px] font-bold -tracking-[0.8px]">
                {
                  formatNumWithUnits({
                    num: lifetimeSavings,
                    isRupees: true,
                    unitHighlighted: false,
                  })[0].text
                }
              </div>
            </div>
            <div className="text-2xl leading-8 font-semibold -tracking-[0.96px] text-neutral-400">
              Savings generated near you
            </div>
          </div>
        </div>
        <Button
          content="Enter Another PIN Code"
          className="py-6 text-[40px] leading-14 -tracking-[0.8px]"
          onClick={() => {
            handlePinClick();
            onClose();
          }}
        />
      </div>
    </Modal>
  );
};

export default ServiceableModal;
