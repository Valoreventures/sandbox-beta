import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {
  const InputComponent = ({ label, type, placeholder }) => {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          placeholder={placeholder}
        />
      </div>
    );
  };
  
  // CheckboxComponent.jsx
  const CheckboxComponent = ({ label }) => {
    return (
      <div className="flex items-center mb-4">
        <input id="termsAndConditions" type="checkbox" className="mr-2" />
        <label htmlFor="termsAndConditions" className="text-sm">
          {label}
        </label>
      </div>
    );
  };
  
  // ButtonComponent.jsx
  const ButtonComponent = ({ text }) => {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        {text}
      </button>
    );
  };
  
  // LoginPage.jsx
  const LoginPage = () => {
    return (
      <div className="w-full max-w-xs m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <InputComponent label="First Name" type="text" placeholder="John" />
          <InputComponent label="Last Name" type="text" placeholder="Doe" />
          <InputComponent label="Email" type="email" placeholder="john@example.com" />
          <InputComponent label="Password" type="password" placeholder="******************" />
          <CheckboxComponent label="I accept the Terms and Conditions" />
          <ButtonComponent text="Sign In" />
        </form>
      </div>
    );
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>  
  // <LoginPage></LoginPage>
       
  )
}

export default App
