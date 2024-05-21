import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages/index";
import "@testing-library/jest-dom";
import { useRouter } from 'next/router';
import { CredentialsProvider } from 'next-auth/providers/credentials';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

// Setup mock return values or functions
useRouter.mockImplementation(() => ({
    push: jest.fn(),
    pathname: '/current-path',
    query: {},
    asPath: '',
}));


test('handles successful registration', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User registered successfully' } });
  
    const { getByLabelText, getByRole } = render(<SignUp />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'newpassword' } });
    fireEvent.submit(getByRole('button', { name: /sign up/i }));
  
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    await waitFor(() => expect(mockedRouter.push).toHaveBeenCalledWith('/login'));
  });
  
  test('displays error message when registration fails', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: 'Username is already taken.'
        }
      }
    });
  
    const { getByLabelText, getByRole, findByText } = render(<SignUp />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'existinguser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.submit(getByRole('button', { name: /sign up/i }));
  
    const errorMessage = await findByText(/username is already taken/i);
    expect(errorMessage).toBeInTheDocument();
  });
  
  test('handles successful registration', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User registered successfully' } });
  
    const { getByLabelText, getByRole } = render(<SignUp />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'newpassword' } });
    fireEvent.submit(getByRole('button', { name: /sign up/i }));
  
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    await waitFor(() => expect(mockedRouter.push).toHaveBeenCalledWith('/login'));
  });
  
  test('sets session and JWT token after successful sign-in', async () => {
    const userToken = { name: 'testuser', token: 'jwt_token' };
    signIn.mockResolvedValue({ ok: true, user: userToken });
    
    const { getByLabelText, getByRole } = render(<SignIn csrfToken="fake_csrf_token" />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.submit(getByRole('button', { name: /sign in/i }));
  
    await waitFor(() => expect(sessionStorage.setItem).toHaveBeenCalledWith('token', userToken.token));
  });
  
  