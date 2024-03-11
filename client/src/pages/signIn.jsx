import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validateOnBlur: false,
      onSubmit: async (values, action) => {
        const formData = {
          email: values.email,
          password: values.password,
        };
        try {
          const data = await axios.post("/auth/signIn", formData, {
            withCredentials: true,
          });
          console.log(data);
          if (data.success === false) {
            setError(data.message);
            return;
          }
          navigate("/createPost");
        } catch (error) {
          console.log(error);
          setError("Something went wrong!");
        }
      },
    });


  return (
    <div className="flex flex-col items-center p-20">
      <p>You are verified successfully, now please sign in!</p>
      <h1 className="text-4xl p-5">Sign In</h1>
      <form
        className="px-20 py-14 rounded bg-slate-200 flex flex-col gap-2 border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col border rounded p-2">
          <label htmlFor="email" className="input-label">
            Email:
          </label>
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 rounded"
          />
          {errors.email && touched.email ? (
            <p className="text-sm text-red-700">{errors.email}</p>
          ) : null}
        </div>
        <div className="flex flex-col border rounded p-2">
          <label htmlFor="password" className="input-label">
            Password:
          </label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 rounded"
          />
          {errors.password && touched.password ? (
            <p className="text-sm text-red-700">{errors.password}</p>
          ) : null}
        </div>          
          <button
            className="bg-slate-500 text-white p-2 rounded hover:opacity-80"
            type="submit"
          >
            Log In
          </button>
        {errors.terms && touched.terms ? (
          <p className="text-sm text-red-700">{errors.terms}</p>
        ) : null}
      </form>
      {error && !message && (
        <p className="text-white bg-red-700 rounded pt-2 m-10">{error}</p>
      )}
      {message && (
        <p className="text-white bg-green-700 rounded p-2 mt-10">{message}</p>
      )}
    </div>
  );
};

export default SignIn;
