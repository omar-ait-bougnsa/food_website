import { useState } from "react";

const URL = "http://localhost:9090/api";

async function sendlogin(
  email: string,
  password: string,
  setMessage: (msg: string) => void,
  setMessageType: (type: "success" | "error" | "") => void,
  onSuccess: () => void
) {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await response.json();
  if (response.status === 200) {
    console.log("Login successful");
    setMessage("Login successful! Redirecting...");
    setMessageType("success");
    setTimeout(() => onSuccess(), 2000);
  } else {
    console.log("Login failed");
    setMessage(data.error || "Login failed");
    setMessageType("error");
  }
}

async function sendregester(
  username: string,
  regemail: string,
  regpass: string,
  setMessage: (msg: string) => void,
  setMessageType: (type: "success" | "error" | "") => void,
  onSuccess: () => void
) {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: regemail,
      password: regpass,
    }),
  });
  const data = await response.json();
  if (response.status === 201) {
    setMessage("Registration successful! Redirecting...");
    setMessageType("success");
    setTimeout(() => onSuccess(), 2000);
  }
  else {
    console.log("Registration failed");
    setMessage(data.error || "Registration failed");
    setMessageType("error");
  }
}

function Register({ onRegisterSuccess, onBackToLogin }: { onRegisterSuccess: () => void; onBackToLogin: () => void })
{
  const [regemail, setRegemail] = useState("");
  const [regpass, setRegpass] = useState("");
  const [username, setusername] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleRegister = async () =>
  {
    await sendregester(username, regemail, regpass, setMessage, setMessageType, onRegisterSuccess);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-lg bg-indigo-100 rounded-md">
        <h2 className="block text-center font-semibold text-2xl mb-6">Register</h2>
        <input
          className="input"
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="email"
          placeholder="Your Email"
          value={regemail}
          onChange={(e) => setRegemail(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="password"
          placeholder="Your Password"
          value={regpass}
          onChange={(e) => setRegpass(e.target.value)}
        />
        <br />
        <button className="loginbuten" onClick={handleRegister}>
          <h2>Register</h2>
        </button>
        {message && (
          <div
            className={
              messageType === "success"
                ? "bg-green-200 text-green-800 p-3 mt-4 rounded"
                : "bg-red-200 text-red-900 p-3 mt-4 rounded"
            }
          >
            {message}
          </div>
        )}
        <button className="mt-4 text-blue-600 underline" onClick={onBackToLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

function Sing({ setShowfunction }: any)
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Email and password are required");
      setMessageType("error");
      return;
    }
    await sendlogin(email, password, setMessage, setMessageType, () => setShowfunction("home"));
  };

  return (
    <div>
      {isRegister ? (
        <Register onRegisterSuccess={() => setShowfunction("home")} onBackToLogin={() => setIsRegister(false)} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-96 p-6 shadow-lg bg-indigo-100 rounded-md">
            <h2 className="block text-center font-semibold text-2xl mb-6">Login</h2>
            <input
              className="input"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              className="input"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="loginbuten" onClick={handleLogin}>
              <h2>Login</h2>
            </button>
            {message && (
              <div
                className = {
                  messageType === "success"
                    ? "bg-green-200 text-green-800 p-3 mt-4 rounded"
                    : "bg-red-200 text-red-800 p-3 mt-4 rounded"
                }
              >
                {message}
              </div>
            )}
            <p className="mt-4 text-center">Create a new account?</p>
            <button className="text-blue-600 underline block mx-auto" onClick={() => setIsRegister(true)}>
              Click here
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sing;