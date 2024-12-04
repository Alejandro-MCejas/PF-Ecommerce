import { changePassword } from "@/helpers/auth.helper";
import { useState } from "react";

const ChangePassword = () => {
  const [emailToSend, setEmailToSend] = useState<string>(""); // Estado para el email
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Mensaje de retroalimentación

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailToSend(event.target.value); // Actualiza el estado del email
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Previene el comportamiento por defecto
    event.stopPropagation(); // Evita que el evento burbujee al formulario padre

    try {
      const response = await changePassword(emailToSend); // Llamada a la API para cambiar la contraseña
      console.log("Response from password change:", response);
      setFeedbackMessage("An email has been sent to reset your password.");
      setEmailToSend(""); // Limpia el email
    } catch (error) {
      console.error("Error changing password:", error);
      setFeedbackMessage("Failed to send the email. Please try again.");
    }
  };

  return (
    <div className="text-sm text-gray-600 w-full">
      {showForm ? (
        <div className="w-full flex flex-col items-start bg-gray-100 p-4 rounded-md shadow-md space-y-2">
          <label htmlFor="email" className="text-gray-700">
            Enter your email:
          </label>
          <input
            id="email"
            type="email"
            value={emailToSend}
            onChange={handleInputChange}
            className="w-full border rounded-md px-2 py-1"
            placeholder="example@example.com"
            required
          />
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send Email
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
         
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-blue-500 underline"
        >
          Change your password
        </button>
      )}
    </div>
  );
};

export default ChangePassword;
