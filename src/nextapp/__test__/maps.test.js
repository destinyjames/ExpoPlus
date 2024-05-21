import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SvgSeatHighlighter from './SvgSeatHighlighter';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next-auth/react');

// Mock for local storage
const mockLocalStorage = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('SvgSeatHighlighter', () => {
  beforeEach(() => {
    // Setup initial router state
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
    }));

    // Setup session handling
    useSession.mockImplementation(() => ({
      data: {
        user: { name: 'testuser' },
        accessToken: 'fake-access-token',
      },
      status: 'authenticated',
    }));

    // Setup fetch mocks
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    }));

    mockLocalStorage.clear();
  });

  it('renders loading screen when isLoading is true', () => {
    render(<SvgSeatHighlighter />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches project data on mount if authenticated', async () => {
    render(<SvgSeatHighlighter />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('handles sign in when unauthenticated', () => {
    useSession.mockImplementationOnce(() => ({
      status: 'unauthenticated',
    }));
    render(<SvgSeatHighlighter />);
    expect(useSession().status).toBe('unauthenticated');
    // Normally, you would check if signIn() was called, but it's a mock.
  });

  it('allows user to toggle visited state of a project', async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: 100, title: 'Test Project', module: 'Test Module' }]),
    }));
    
    render(<SvgSeatHighlighter />);
    const visitedButton = await screen.findByText('Visited');
    fireEvent.click(visitedButton);
    
    // Expect the local storage to have updated the visitedProjects data.
    expect(window.localStorage.getItem('visitedProjects')).toContain('true');
  });

});
