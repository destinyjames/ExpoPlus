import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
  
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
  
    // Retrieve the username and token from local storage
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username_for_otp');    
    const email = localStorage.getItem('email_for_otp');    
    const otp = localStorage.getItem('otp');    


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
           otp: otp,
          email: email,
          username: username, // Include the username in the request body
          new_password: newPassword,
          confirm_password: confirmPassword
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Handle successful password update here
        // Possibly redirect to the sign-in page or a confirmation page
        router.push('/login');
      } else {
        // Handle errors, show message to the user
        setMessage(data.message || 'Failed to update password.');
      }
    } catch (error) {
      // Handle failure to connect to the server
      setMessage('An error occurred while updating the password.');
    }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {message && <p className="text-center text-red-500 text-xs">{message}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
