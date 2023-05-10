import { apiInstance } from "../Api/api";

export const setAuthorizationHeader = (token: string): void => {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return nameRegex.test(name);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.{6,})/;
  return passwordRegex.test(password);
};

export const validateCity = (city: string): boolean => {
  const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  return cityRegex.test(city);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\+?\d{0,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};
