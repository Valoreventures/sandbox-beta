import { useState } from 'react';
import { loginFields } from '../constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateLoginForm } from '../utils/validation';

const fields = loginFields;

export default function Login() {
  const navigate = useNavigate();

  // Initialize state inside component (not outside)
  const [loginState, setLoginState] = useState(() => {
    const initialState = {};
    fields.forEach((field) => (initialState[field.id] = ''));
    return initialState;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginState({ ...loginState, [id]: value });

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    const validation = validateLoginForm(loginState);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    authenticateUser();
  };

  const authenticateUser = async () => {
    setIsSubmitting(true);

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: loginState['email-address'],
        password: loginState.password,
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
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
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
      </div>
      <ToastContainer />
      <FormExtra />
      <FormAction
        handleSubmit={handleSubmit}
        text={isSubmitting ? 'Logging in...' : 'Login'}
        disabled={isSubmitting}
      />
    </form>
  );
}
