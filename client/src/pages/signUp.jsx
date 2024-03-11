import React, { useState } from "react";
import { useFormik } from "formik";
import signupSchema from "../schemas/signUpSchema.jsx";
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "../firebase.js";


const SignUp = () => {


  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    terms: false,
  };

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const actionCodeSettings = {
    url: 'https://localhost:5173/verified/',
    handleCodeInApp:true,
  };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      validateOnBlur: false,
      onSubmit: async (values, action) => {
        const formData = {
          name: values.name,
          email: values.email,
          password: values.password,
        }
        try {
          const data = await axios.post("/auth/signUp", formData, {
            withCredentials:true,
          });
          console.log(data)
          if (data.success === false) {
            setError(data.message);
            return;
          }    
          const auth = getAuth(app);
          sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
            .then(() => {
              action.resetForm();
              setMessage("You are registered successfully! Check your email for verification.");
            })
            .catch((error) => {
              console.error("Error sending verification email:", error);
              setError("Error creating account. Please try again.");
            })
        } catch (error) {
          console.log( error);
          setError("Something went wrong!");
        }
      },
    });

    return (
    <div className="flex flex-col items-center p-20">
      <h1 className="text-4xl p-5">Sign Up</h1>
      <form
        className="px-20 py-14 rounded bg-slate-200 flex flex-col gap-2 border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col border rounded p-2">
          <label htmlFor="name" className="input-label">
            Name:
          </label>
          <input
            type="name"
            autoComplete="off"
            name="name"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 rounded"
          />
          {touched.name && errors.name ? (
            <p className="text-sm text-red-700">{errors.name}</p>
          ) : null}
        </div>
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
        <div className="flex flex-col border rounded p-2">
          <label htmlFor="confirm_password" className="input-label">
            Confirm Password:
          </label>
          <input
            type="password"
            autoComplete="off"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm Password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 rounded"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <p className="text-sm text-red-700">{errors.confirm_password}</p>
          ) : null}
        </div>
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={values.terms}
              onChange={handleChange}
              autoComplete="off"
            />
            <p className="">Terms & Conditions.</p>
          </div>
          <button className="bg-slate-500 text-white p-2 rounded hover:opacity-80" type="submit">
            Register
          </button>
        </div>
        {errors.terms && touched.terms ? (
          <p className="text-sm text-red-700">{errors.terms}</p>
        ) : null}
      </form>
      {error && !message && <p className="text-white bg-red-700 rounded pt-2 m-10">{error}</p>}
      {message && <p className="text-white bg-green-700 rounded p-2 mt-10">{message}</p>}
    </div>
  );
};

export default SignUp;
