import React, { useEffect } from 'react';
import { useGame } from 'context/Provider';
import { bubbleAdd } from 'utils';
import './bubble-scheme.scss';
import { nanoid } from 'nanoid';

const BubblesScheme: React.FC = () => {
  const {
    setTimer,
    state: {
      phase,
      windowDimensions,
      bubbleSize,
      isResizing,
      isPaused,
      bubblesQuantity,
      situation,
      isWindowFetched,
      isGaming,
      isDragable,
      isDraging,
      bubbles,
    },
    setClickQuantity,
    setBubbles,
  } = useGame();

  useEffect(() => {
    if (situation === 'start' && isWindowFetched) {
      setTimer(phase * 1000 + 40000);

      let counter = 1000;
      let bubblesInsertedQuantity = 0;
      
      const RecursiveTimeout = () => {
        setBubbles({
          type: 'add',
          content: bubbleAdd(nanoid(), windowDimensions, bubbleSize),
        });

        bubblesInsertedQuantity++;
        counter = counter * 1.5 - phase * 100;

        const lowTimeout = setTimeout(RecursiveTimeout, counter);

        if (bubblesInsertedQuantity === bubblesQuantity) {
          clearTimeout(lowTimeout);
        }
      };

      const bubblesTimeout = setTimeout(RecursiveTimeout, counter);

      return () => clearTimeout(bubblesTimeout);
    }
  }, [situation, isWindowFetched, setTimer, phase, windowDimensions, bubbleSize, bubblesQuantity, setBubbles]);

  const handleClick = (id: string) => {
    if (!isPaused && !isDragable) {
      setClickQuantity('increase');
      setBubbles({ type: 'delete', content: id });

      setTimeout(() => {
        setBubbles({
          type: 'add',
          content: bubbleAdd(nanoid(), windowDimensions, bubbleSize),
        });
      }, 2000);
    }
  };

  const handleTimeout = (id: string) => {
    if (!isResizing) {
      setClickQuantity('decrease');
    }

    setBubbles({ type: 'delete', content: id });

    setTimeout(() => {
      setBubbles({
        type: 'add',
        content: bubbleAdd(nanoid(), windowDimensions, bubbleSize),
      });
    }, 2000);
  };

  return (
    <ul data-testid="bubbles-list" className="bubble-scheme">
      {!isResizing &&
        !isDraging &&
        isGaming &&
        bubbles.map((bubble) => (
          <li
            data-testid="bubble-item"
            key={bubble.id}
            id={bubble.id}
            style={{
              left: bubble.left,
              top: bubble.top,
              width: bubble.width,
              height: bubble.width,
              animation: isPaused
                ? 'bubblesAnimation 3s ease-in-out alternate forwards paused'
                : 'bubblesAnimation 3s ease-in-out alternate forwards',
            }}
            className="bubble-scheme__bubbles"
            onMouseDown={() => handleClick(bubble.id)}
            onAnimationEnd={() => handleTimeout(bubble.id)}
          />
        ))}
    </ul>
  );
};

export default BubblesScheme;
