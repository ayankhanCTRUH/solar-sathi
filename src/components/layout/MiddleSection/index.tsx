'use client';

import { useState } from 'react';
import HomePage from './components/HomePage';
import MiddleContent from './components/MiddleContent';
import PinCodeModal from './components/PinCodeModal';
import ServiceableModal from './components/ServiceableModal';
import UnServiceableModal from './components/UnServiceableModal';

const MiddleSection = () => {
  const [showHome, setShowHome] = useState(true);
  const [modalState, setModalState] = useState<{
    pinCode: boolean;
    serviceable: boolean;
    unserviceable: boolean;
  }>({
    pinCode: false,
    serviceable: false,
    unserviceable: false,
  });

  const openModal = (type: keyof typeof modalState) =>
    setModalState((prev) => ({ ...prev, [type]: true }));

  const closeModal = (type: keyof typeof modalState) =>
    setModalState((prev) => ({ ...prev, [type]: false }));

  const handlePinSubmit = () => {
    // TODO: choose which modal to open based on serviceability check
    openModal('serviceable');
  };

  return (
    <div className="flex-grow border border-[teal]">
      {showHome ? (
        <HomePage handleClick={() => setShowHome(false)} />
      ) : (
        <MiddleContent
          top={{
            titleProps: {
              content: [
                { text: 'SolarSquare Homes in' },
                { text: 'India', variant: 'blue' },
              ],
            },
            subtitleProps: {
              content: [
                {
                  text: 'Tap on a State to see homes powered by',
                  variant: 'neutral-500',
                },
                { text: 'SolarSquare', variant: 'neutral-300' },
              ],
            },
          }}
          bottom={{
            textProps: {
              content: [
                { text: 'Find out how many homes near you', break: true },
                { text: 'are' },
                { text: 'SolarSquare', variant: 'blue' },
                { text: 'homes' },
              ],
            },
            buttonProps: {
              content: 'Enter PIN Code',
              onClick: () => openModal('pinCode'),
            },
          }}
        />
      )}

      {/* Modals */}
      <PinCodeModal
        open={modalState.pinCode}
        onClose={() => closeModal('pinCode')}
        handleSubmit={handlePinSubmit}
      />
      <ServiceableModal
        open={modalState.serviceable}
        onClose={() => closeModal('serviceable')}
        handleHomeClick={() => setShowHome(true)}
        handlePinClick={() => openModal('pinCode')}
      />
      <UnServiceableModal
        open={modalState.unserviceable}
        onClose={() => closeModal('unserviceable')}
        handleHomeClick={() => setShowHome(true)}
        handlePinClick={() => openModal('pinCode')}
      />
    </div>
  );
};

export default MiddleSection;
