import React, { useState } from "react";
import Swal from "sweetalert2";
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      // Realizar el POST al backend
      const response = await fetch(`${APIURL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
console.log(response);

      if (response.ok) {
        Swal.fire({
          title: "Email Sent!",
          text: "Check your inbox to reset your password.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setEmail(""); // Limpiar el campo de email
        setShowForm(false); // Cerrar el formulario
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Failed to send email.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="text-sm text-gray-600">
      {showForm ? (
        <div
          className="flex flex-col items-start bg-gray-100 p-4 rounded-md shadow-md space-y-2"
        >
          <label htmlFor="email" className="text-gray-700">
            Enter your email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            className="w-full border rounded-md px-2 py-1"
            placeholder="example@example.com"
            required
          />
          <div className="flex space-x-2">
            <button
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
          onClick={() => setShowForm(true)}
          className="text-blue-500 underline"
        >
          Change your password
        </button>
      )}
    </div>
  );
}
export default ChangePassword;
