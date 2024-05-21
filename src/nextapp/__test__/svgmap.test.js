import { render, fireEvent } from '@testing-library/react';
import Groundfloor from './Groundfloor';

describe('Groundfloor Component', () => {
  it('should add path ID to hoveredPaths on mouse enter', () => {
    const { getByTestId } = render(<Groundfloor />);
    const path = getByTestId('pathlg27');
    fireEvent.mouseEnter(path);
    expect(path.style.opacity).toBe('1');
  });

  it('should remove path ID from hoveredPaths on mouse leave', () => {
    const { getByTestId } = render(<Groundfloor />);
    const path = getByTestId('pathlg27');
    fireEvent.mouseEnter(path);
    fireEvent.mouseLeave(path);
    expect(path.style.opacity).toBe('0');
  });

  it('should handle multiple paths correctly', () => {
    const { getByTestId } = render(<Groundfloor />);
    const path1 = getByTestId('pathlg27');
    const path2 = getByTestId('pathlg26');
    fireEvent.mouseEnter(path1);
    fireEvent.mouseEnter(path2);
    fireEvent.mouseLeave(path1);
    expect(path1.style.opacity).toBe('0');
    expect(path2.style.opacity).toBe('1');
  });

  it('should not add the same path ID twice on re-entering', () => {
    const { getByTestId } = render(<Groundfloor />);
    const path = getByTestId('pathlg27');
    fireEvent.mouseEnter(path);
    fireEvent.mouseLeave(path);
    fireEvent.mouseEnter(path);
    // Assuming some function to check the internal state or direct checking via mock
    // This test might require a more complex setup to directly check component state.
    expect(path.style.opacity).toBe('1');
  });
});
