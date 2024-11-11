import { ILoginError, ILoginProps } from "@/components/Login/TypesLogin";

export function validateLoginform(values: ILoginProps): ILoginError {
  const errors: ILoginError = {};

  if (values.name && (!/^[a-zA-Z\d\.\-]+$/.test(values.name))) {
    errors.name = "Nombre no válido.";
  }

  return errors;
};
