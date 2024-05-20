import React from 'react';
import { useSelector } from 'react-redux';

import { currentConfirmationSelector } from '../../../../../selectors';
import { Confirmation } from '../../../types/confirm';

const PluggableSections = [
  ({ confirmation }: any) => <div>{confirmation?.id}</div>,
];

const PluggableSection: React.FC = () => {
  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as Confirmation;

  if (!currentConfirmation) {
    return null;
  }

  return (
    <>
      {PluggableSections.map((SectionComp: any) => {
        return <SectionComp confirmation={currentConfirmation} />;
      })}
    </>
  );
};

export default PluggableSection;
