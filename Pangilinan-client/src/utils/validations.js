/**
 * Validation utility functions for form inputs
 */

export const validations = {
  // Password must be at least 8 characters
  validatePassword: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  },

  // Contact number must be 11 digits
  validateContactNumber: (contact) => {
    if (!contact) return 'Contact number is required';
    const digits = contact.replace(/\D/g, '');
    if (digits.length !== 11) return 'Contact number must be exactly 11 digits';
    return '';
  },

  // Age must be a number only
  validateAge: (age) => {
    if (!age) return 'Age is required';
    if (isNaN(age)) return 'Age must be a number';
    const ageNum = parseInt(age);
    if (ageNum < 1 || ageNum > 120) return 'Age must be between 1 and 120';
    return '';
  },

  // Username must not contain spaces
  validateUsername: (username) => {
    if (!username) return 'Username is required';
    if (username.includes(' ')) return 'Username must not contain spaces';
    if (username.length < 3) return 'Username must be at least 3 characters';
    return '';
  },

  // Email validation
  validateEmail: (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  },

  // First name validation
  validateFirstName: (firstName) => {
    if (!firstName) return 'First name is required';
    if (firstName.trim().length < 2) return 'First name must be at least 2 characters';
    return '';
  },

  // Last name validation
  validateLastName: (lastName) => {
    if (!lastName) return 'Last name is required';
    if (lastName.trim().length < 2) return 'Last name must be at least 2 characters';
    return '';
  }
};
