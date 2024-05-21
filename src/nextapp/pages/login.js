import { useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';

export default function SignIn({ csrfToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State variable for error message
  const router = useRouter();

    const handleForgotPasswordClick = () => {
       router.push('/forgot-password'); // replace with your actual forgot password page path
    };
    const handleCreateAccountClick = () => {
      // Function to handle create account click
      router.push('/register'); // Replace '/register' with the path to your registration page
    };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Attempt to sign in
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    });
    

    // Check if sign-in was successful
    if (result.ok) {
      const checkPrefResult = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/check-preferences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
    });
    if (checkPrefResult.ok) {
      const { exists } = await checkPrefResult.json();
      if (exists) {
          router.push('/recommended'); // User exists in preferences, go to recommended
      } else {
          router.push('/preferences'); // User does not exist, go to preferences
      }}
    } else {
      // Handle errors, e.g., show an error message
      setError('Invalid username or password');  // Set the error message
      console.error('Sign-in failed:', result.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div><NavBar/> </div>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center"
      >
        <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input 
            name='username'
            type='text'
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            name='password'
            type='password'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Display error message */}
        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}
        
        <div className="flex items-center justify-centre">
        <button 
          type='submit'
          className="bg-blue-500 justify-centre hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign in
        </button>
      </div>
      
      {/* Link to Forgot Password page */}
      <div className="text-center mt-4">
        <a
          onClick={handleForgotPasswordClick}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer hover:underline"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center mt-2">

              <a 
              onClick={handleCreateAccountClick}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer hover:underline">
                

                Create Account
              </a>
          </div>

      </form>
    </div>
  )
}
