import { IRegisterError } from "@/interfaces/IRegisterError";
import { IRegisterProps } from "@/interfaces/IRegisterProp";

const validateRegisterForm = (data: IRegisterProps, excludedFields: string[] = []): IRegisterError => {
  const errors: IRegisterError = {};

  // Helper to check if a field is excluded
  const isExcluded = (field: string) => excludedFields.includes(field);

  // Email validation
  if (!isExcluded("email")) {
    if (!data.email?.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errors.email = "Invalid email address.";
    }
  }

  // Username validation
  if (!isExcluded("name")) {
    if (!data.name?.trim()) {
      errors.name = "Username is required.";
    } else if (/\s/.test(data.name)) {
      errors.name = "Username must not contain spaces.";
    } else if (!/^[a-zA-ZñÑ\s]+$/.test(data.name)) {
      errors.name = "Username should not contain numbers or symbols.";
    } else if (/\s{2,}/.test(data.name)) {
      errors.name = "Username should not have more than two consecutive spaces.";
    }
  }

  // Address validation
  if (!isExcluded("address")) {
    if (!data.address?.trim()) {
      errors.address = "Address is required.";
    }
  }

  // Phone validation
  if (!isExcluded("phone")) {
    if (!data.phone?.trim()) {
      errors.phone = "Phone is required.";
    } else if (!/^\d+$/.test(data.phone)) {
      errors.phone = "Phone must contain only numbers.";
    } else if (data.phone.length < 10 || data.phone.length > 15) {
      errors.phone = "Phone must be between 10 and 15 digits.";
    }
  }

  // Password validation
  if (!isExcluded("password")) {
    if (!data.password?.trim()) {
      errors.password = "Password is required.";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (data.password.length > 20) {
      errors.password = "Password must be less than 20 characters.";
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(data.password)) {
      errors.password = "Password must include at least one lowercase letter.";
    } else if (!/[!@#$%^&*]/.test(data.password)) {
      errors.password = "Password must include at least one special character.";
    } else if (/\s/.test(data.password)) {
      errors.password = "Password must not contain spaces.";
    }
  }

  // Confirm Password validation
  if (!isExcluded("confirmPassword")) {
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return errors;
};

export default validateRegisterForm;
