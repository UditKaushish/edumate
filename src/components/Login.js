import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import GoogleButton from 'react-google-button';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  const handleLogin = () => {
    setEmail("");
    setPassword("");
    setError("Login functionality is not available in this demo.");
  };

  const handleGoogleSignIn = () => {
    setError("Google Sign-In functionality is not available in this demo.");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4 animate-fade-in">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-10 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6 text-center text-base-100">Login</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4 w-full">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-bold text-base-100">Email:</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-base-100 placeholder-gray-500"
                placeholder="testify4us@gmail.com"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text font-bold text-base-100">Password:</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-base-100 placeholder-gray-500"
                placeholder="Testify@123"
              />
            </div>
            <div className='flex justify-center'>
              <button type="submit" className="btn btn-neutral w-40 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out">Login</button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4 animate-fade-in">{error}</p>}
          <div className="mt-6 w-full flex justify-center animate-fade-in">
            <GoogleButton onClick={handleGoogleSignIn} className="transition-transform transform hover:scale-105 duration-300" />
          </div>
          <p className="mt-4 text-center text-base-100">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
