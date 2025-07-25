'use client';
// import PageOne from './components/PageOne';
import MiddleContent from './components/MiddleContent';

const MiddleSection = () => {
  return (
    <div className="flex-1 border border-[teal]">
      {/* <PageOne /> */}
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
              {
                text: 'Find out how many homes near you are',
              },
              { text: 'SolarSquare', variant: 'blue' },
              { text: 'homes' },
            ],
          },
          buttonProps: { content: 'Enter PIN Code', onClick: () => {} },
        }}
      />
    </div>
  );
};

export default MiddleSection;
