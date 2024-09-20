
import { useState } from "react";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
      <form  className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-600" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Login
        </button>
        <div className="text-sm text-center text-gray-600">
          Not a member?{" "}
         
        </div>
      </form>
    </div>
  </div>   

)
}

export default Login