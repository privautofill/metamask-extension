import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { currentConfirmationSelector } from '../../../../../selectors';
import { Confirmation } from '../../../types/confirm';

const DisplayComponent: React.FC = (props: any) => {
  const { title, expandable } = props;
  const [isExpanded, setExpanded] = useState(false);
  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as Confirmation;

  if (!currentConfirmation) {
    return null;
  }

  return (
    <>
      <button onClick={() => setExpanded(!isExpanded)}>{title}</button>
      {isExpanded && expandable}
    </>
  );
};

export default DisplayComponent;
