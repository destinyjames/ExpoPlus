import { render, screen, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating Component', () => {
  test('renders default number of stars when count not provided', () => {
    render(<StarRating />);
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });

  test('renders specified number of stars', () => {
    render(<StarRating count={10} />);
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(10);
  });

  test('sets temporary rating on mouse enter and resets on mouse leave', () => {
    render(<StarRating />);
    const firstStar = screen.getAllByText("★")[0];
    fireEvent.mouseEnter(firstStar);
    expect(firstStar).toHaveStyle({ color: 'gold' });
    fireEvent.mouseLeave(firstStar);
    expect(firstStar).toHaveStyle({ color: 'grey' });
  });

  test('updates rating on star click', () => {
    render(<StarRating />);
    const thirdStar = screen.getAllByText("★")[2];
    fireEvent.click(thirdStar);
    expect(thirdStar).toHaveStyle({ color: 'gold' });
  });

  test('handleClick makes a POST request and handles response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Rating updated successfully' }),
      })
    );

    const { getAllByText } = render(<StarRating userName="john_doe" projectId="123" />);
    const firstStar = getAllByText("★")[0];
    fireEvent.click(firstStar);

    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any-value',
      },
      body: JSON.stringify({
        username: 'john_doe',
        project_id: '123',
        rating: 1
      })
    });

  });

});

