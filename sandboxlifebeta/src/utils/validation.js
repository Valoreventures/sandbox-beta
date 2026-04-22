export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const validateFullName = (name) => {
  if (!name || name.trim() === '') {
    return 'Full name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
};

export const validateLoginForm = (formState) => {
  const errors = {};

  const emailError = validateEmail(formState['email-address']);
  if (emailError) errors['email-address'] = emailError;

  const passwordError = validatePassword(formState.password);
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignupForm = (formState) => {
  const errors = {};

  const nameError = validateFullName(formState.fullname);
  if (nameError) errors.fullname = nameError;

  const emailError = validateEmail(formState['email-address']);
  if (emailError) errors['email-address'] = emailError;

  const passwordError = validatePassword(formState.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(
    formState.password,
    formState['confirm-password']
  );
  if (confirmError) errors['confirm-password'] = confirmError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
