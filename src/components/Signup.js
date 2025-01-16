import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GoogleButton from 'react-google-button';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = () => {
    const errors = {};
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Password contains invalid characters.';
    } else if (!uppercaseRegex.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter.';
    } else if (!specialCharRegex.test(password)) {
      errors.password = 'Password must contain at least one special character like "@", "#", "!" etc.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMessage("User registered successfully!");
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4 animate-fade-in">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-10 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4 w-full">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text font-bold text-gray-800">Username:</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-bold text-gray-800">Email:</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text font-bold text-gray-800">Password:</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
              {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text font-bold text-gray-800">Confirm Password:</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
              {errors.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword}</p>}
            </div>
            <div className='flex justify-center'>
              <button type="submit" className="btn btn-neutral w-40 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out">Sign Up</button>
            </div>
          </form>
          {message && <p className="text-gray-800 mt-4 animate-fade-in">{message}</p>}
          <div className="mt-6 w-full flex justify-center animate-fade-in">
            <GoogleButton onClick={handleGoogleSignUp} className="transition-transform transform hover:scale-105 duration-300" />
          </div>
          <p className="mt-4 text-center text-gray-800">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
