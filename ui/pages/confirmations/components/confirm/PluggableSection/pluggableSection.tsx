import React from 'react';
import { useSelector } from 'react-redux';

import { currentConfirmationSelector } from '../../../../../selectors';
import { Confirmation } from '../../../types/confirm';
import MyPluggableSection from './myPluggableSection';

const PluggableSections = [MyPluggableSection];

const PluggableSection: React.FC = () => {
  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as Confirmation;

  if (!currentConfirmation) {
    return null;
  }

  return (
    <>
      {PluggableSections.map((SectionComponent: any) => {
        return <SectionComponent confirmation={currentConfirmation} />;
      })}
    </>
  );
};

export default PluggableSection;
