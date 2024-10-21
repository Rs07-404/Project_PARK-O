import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/LoginHook";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  return (
    <div className="chatBox">
      <div className="headText">
        Login{" "}
        <div className="brand">
          Park- <div className="color-red">O</div>
        </div>
      </div>
      <div className="loginBox">
        <form onSubmit={handleSubmit} className="loginForm">
          <div>
            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="inputForm"
              value={inputs.username}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="inputForm"
              value={inputs.password}
              onChange={changeHandler}
            />
          </div>
          <div>
            <button className="btn">{!loading ? "Login" : "Loading"}</button>
            <div>
              <Link to={"/signup"} className="link">
                Don't have an account ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
