import { useState } from 'react';
import { signupFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateSignupForm } from '../utils/validation';

const fields = signupFields;

export default function Signup() {
  const navigate = useNavigate();

  // Initialize state inside component (not outside)
  const [signupState, setSignupState] = useState(() => {
    const initialState = {};
    fields.forEach((field) => (initialState[field.id] = ''));
    initialState.gender = '';
    initialState.birthday = '';
    return initialState;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupState({ ...signupState, [id]: value });

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    const validation = validateSignupForm(signupState);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    createAccount();
  };

  const createAccount = async () => {
    setIsSubmitting(true);

    try {
      let { data, error } = await supabase.auth.signUp({
        email: signupState['email-address'],
        password: signupState.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        localStorage.setItem('user_id', data.user.id);
        toast('Welcome to Sandbox');
        navigate(`/home/${data.user.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            error={errors[field.id]}
          />
        ))}

        {/* Gender and Birthday section - no nested form */}
        <div className="flex flex-col space-y-4 my-5">
          <div className="flex items-center">
            <label className="text-gray-700">Gender:</label>
            <div className="ml-2 flex space-x-2">
              <label className="text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="male"
                  checked={signupState.gender === 'male'}
                  onChange={handleChange}
                  className="accent-blue-600"
                />{' '}
                Male
              </label>
              <label className="text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="female"
                  checked={signupState.gender === 'female'}
                  onChange={handleChange}
                  className="accent-blue-600"
                />{' '}
                Female
              </label>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="birthday" className="text-gray-700">
              Birthday:
            </label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              value={signupState.birthday}
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <FormAction
          handleSubmit={handleSubmit}
          text={isSubmitting ? 'Creating account...' : 'Signup'}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
