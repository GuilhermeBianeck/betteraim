import React from 'react';
import { useGame } from 'context/Provider';
import pausesvg from 'assets/graphics/pauseicon.svg';
import './pause-icon.scss';

const PauseIcon: React.FC = () => {
  const {
    state: { isPaused },
  } = useGame();

  return isPaused ? (
    <img alt="paused" src={pausesvg} className="pause-icon" />
  ) : null;
};

export default PauseIcon;
