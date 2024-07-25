import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { render } from 'components/utils';
import { leftRandomPosition } from 'utils';

beforeEach(() => {
  jest.useFakeTimers();
});

test('if game works correctly', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /bubbles Play/i }));

  await waitFor(() => {
    expect(
      screen.queryByRole('button', { name: /bubbles Play/i })
    ).not.toBeInTheDocument();
  });

  const gameWindow = screen.getByTestId('game-window');
  expect(gameWindow).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId('bubbles-list')).toBeInTheDocument();
  });

  act(() => {
    let counter = 1000;
    let bubblesInsertedQuantity = 0;

    const recursiveTimeout = () => {
      bubblesInsertedQuantity++;
      counter = counter * 1.5 - 100;

      const lowTimeout = setTimeout(recursiveTimeout, counter);

      if (bubblesInsertedQuantity === 5) {
        clearInterval(lowTimeout);
        expect(screen.getAllByTestId('bubble-item').length).toBe(5);
      }
    };

    setTimeout(recursiveTimeout, counter);

    jest.runAllTimers();
  });

  userEvent.click(screen.getByRole('button', { name: /pause/i }));

  expect(screen.getAllByTestId('bubble-item')[0]).toHaveStyle(
    `animation: bubblesAnimation 3s ease-in-out alternate forwards paused`
  );

  userEvent.click(screen.getByRole('button', { name: /pause/i }));

  expect(screen.getAllByTestId('bubble-item')[0]).toHaveStyle(
    `animation: bubblesAnimation 3s ease-in-out alternate forwards`
  );
});

test('if the limits of generated random positions work correctly', () => {
  const position = Number(leftRandomPosition({ gameWidth: 744, bubbleSize: 40 }).slice(0, -2));
  expect(position).toBeGreaterThanOrEqual(0);
  expect(position).toBeLessThanOrEqual(744);
});
