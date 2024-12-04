
import { changePassword } from "@/helpers/auth.helper";
import { useState } from "react";

const ChangePassword = () => {
  const [emailToSend, setEmailToSend] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailToSend(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await changePassword(emailToSend);
    console.log(response);

  };

  return (
    <div className="text-sm text-gray-600">
      {showForm ? (

        <div className="flex flex-col items-start bg-gray-100 p-4 rounded-md shadow-md space-y-2">

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

};


export default ChangePassword;

