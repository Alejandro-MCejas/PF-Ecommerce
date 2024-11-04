import { IRegisterError } from "@/interfaces/IRegisterError";
import { IRegisterProps } from "@/interfaces/IRegisterProp";

const validateRegisterForm = (data: IRegisterProps, excludedFields: string[] = []): IRegisterError => {
  const errors: IRegisterError = {};

  // Helper para verificar si un campo está excluido
  const isExcluded = (field: string) => excludedFields.includes(field);

  // Validación del email
  if (!isExcluded("email")) {
    if (!data.email?.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errors.email = "Correo electrónico inválido.";
    }
  }

  // Validación del nombre de usuario
  if (!isExcluded("username")) {
    if (!data.username?.trim()) {
      errors.username = "El nombre es obligatorio.";
    } else if (!/^[a-zA-ZñÑ\s]+$/.test(data.username)) {
      errors.username = "El nombre no debe tener números ni símbolos.";
    } else if (/\s{2,}/.test(data.username)) {
      errors.username = "El nombre no debe tener más de dos espacios consecutivos.";
    }
  }

  // Validación de la dirección
  if (!isExcluded("address")) {
    if (!data.address?.trim()) {
      errors.address = "La dirección es obligatoria.";
    }
  }

  // Validación de la contraseña
  if (!isExcluded("password")) {
    if (!data.password?.trim()) {
      errors.password = "La contraseña es obligatoria.";
    } else if (data.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
    } else if (data.password.length > 20) {
      errors.password = "La contraseña debe tener menos de 20 caracteres.";
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = "La contraseña debe tener al menos una letra mayúscula.";
    } else if (!/[a-z]/.test(data.password)) {
      errors.password = "La contraseña debe tener al menos una letra minúscula.";
    } else if (!/[!@#$%^&*]/.test(data.password)) {
      errors.password = "La contraseña debe contener al menos un carácter especial.";
    } else if (/\s/.test(data.password)) {
      errors.password = "La contraseña no debe contener espacios.";
    }
  }

  return errors;
};

export default validateRegisterForm;
