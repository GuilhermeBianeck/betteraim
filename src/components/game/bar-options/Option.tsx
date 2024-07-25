import React from 'react';

type Props = {
  setFunction: () => void;
  condition?: boolean;
  icon: string;
  alt: string;
};

const Option: React.FC<Props> = ({ setFunction, condition, icon, alt }) => (
  <button
    className="bar__options-item"
    onClick={setFunction}
    style={{ filter: condition ? 'brightness(180%)' : 'initial' }}
  >
    <img alt={alt} src={icon} />
  </button>
);

export default Option;
