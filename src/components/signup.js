import React, { useState } from "react";
import styles from "../css/login.module.css";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gender: "",
    skills: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const len = formData.username.length;
    if (len<4 || len>32) {
      newErrors.username = "username should have characters between 4 to 32";
    }
    // Regex for password validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;
    if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must contain at least one letter, one number, and one special character.';
    }

    if(!formData.skills){
        newErrors.skills = 'You must Select a skill'
    }

    if(!formData.gender){
        newErrors.gender = 'You must select a gender'
    }

    return newErrors;
  };
  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault()
      setFormData({
          username: "",
          password: "",
          gender: "",
          skills: "",
        });
        setErrors({});
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
        const url = "http://localhost:5000/users/register"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            gender: formData.gender,
            skills: formData.skills
        })
        });
        if (response.status === 409) {
          setErrors({
            username:"Username already taken!!"
          })
          return;
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        navigate('/');
        alert("Account created successfully")

      } catch (error) {
        console.error("Error fetching data:", error);
      }

  };
  return (
    <div className={"mt-5 d-flex justify-content-center align-items-center mb-4 " + styles.home}>
      <form
        onSubmit={handleSubmit}
        className={
          "shadow py-3 px-5 mb-5 bg-white rounded border border-dark " +
          styles.main
        }
      > <h2 className="text-center mb-2">User Data</h2>
        <div class="row mb-3">
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
            {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
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
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
        </div>
        <fieldset class="row mb-3">
          <legend class="col-form-label col-sm-2 pt-0">Gender:</legend>
          
          <div class={"col-sm-10 " + styles.radio}>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="gridRadios1"
                value="male"
                checked={formData.gender === "male" ? true : false}
                onChange={handleChange}
              />
              
              <label class="form-check-label" for="gridRadios1">
                Male
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="gridRadios2"
                value="female"
                checked={formData.gender === "female" ? true : false}
                onChange={handleChange}
              />
              <label class="form-check-label" for="gridRadios2">
                Female
              </label>
            </div>
            {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
          </div>
        </fieldset>
        <fieldset class="row mb-3">
          <legend class="col-form-label col-sm-2 pt-0">Skills:</legend>
          <div class="col-sm-10">
            <select
              class="form-select"
              aria-label="Default select example"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            >
              <option value="">Select a Skill</option>
              <option value="react">React</option>
              <option value="js">Js</option>
              <option value="backend">Backend</option>
              <option value="api">API</option>
            </select>
            {errors.skills && <div style={{ color: 'red' }}>{errors.skills}</div>}
          </div>
        </fieldset>
        <div className="mt-4">
          <button class="btn btn-primary me-4 " onClick={handleReset}>
            Reset
          </button>
          <button type="submit" class="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
