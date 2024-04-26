import React, { useState } from "react";
import styles from "../css/login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const len = formData.username.length;
    if (len < 4 || len > 32) {
      newErrors.username = "username should have characters between 4 to 32";
    }
    // Regex for password validation
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;
    // if (!passwordRegex.test(formData.password)) {
    //   newErrors.password =
    //     "Password must contain at least one letter, one number, and one special character.";
    // }

    return newErrors;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      username: "",
      password: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const url = "http://localhost:5000/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.status === 400) {
        
        setErrors({
          invalid: "Invalid Username or password"
        })
        throw new Error("Invalid credentials");
      }

      navigate("/");
      alert("You're logged in successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  return (
    <div
      className={
        "mt-5 d-flex justify-content-center align-items-center mb-4" +
        styles.home
      }
    >
      <form
        onSubmit={handleSubmit}
        className={
          "shadow py-3 px-5 mb-5 bg-white rounded border border-dark " +
          styles.main
        }
      >
      <h2 className="text-center mb-2">Login</h2>
        <div class="row mb-3 mt-5">
          <label for="username" class="col-sm-2 col-form-label">
            Username:
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              name="username"
            />
            {errors.username && (
              <div style={{ color: "red" }}>{errors.username}</div>
            )}
          </div>
        </div>
        <div class="row mb-3">
          <label for="password" class="col-sm-2 col-form-label">
            Password:
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.invalid && (
              <div style={{ color: "red" }}>{errors.invalid}</div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button class="btn btn-primary me-4 " onClick={handleReset}>
            Reset
          </button>
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
