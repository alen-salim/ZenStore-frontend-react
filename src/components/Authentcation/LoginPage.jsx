import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./LoginPage.css";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters." }),
});

const LoginPage = () => {
  const [loginError, setLoginError] = useState("");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (FormData) => {
    try {
      await login(FormData);

      //refreshes the page on login, redirects to homepage
      const { state } = location;

      window.location = state ? state.from : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setLoginError(err.response.data.message);
        console.log(loginError);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align-center form-page">
      <form
        action=""
        className="authentication-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form-inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              // ref={nameRef}
              className="form-text-input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form-error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              // ref={phoneRef}
              className="form-text-input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form-error">{errors.password.message}</em>
            )}
          </div>

          {loginError && <em className="form-error">{loginError}</em>}

          <button type="submit" className="search-button form-submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
