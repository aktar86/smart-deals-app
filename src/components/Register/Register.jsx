import axios from "axios";
import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { charLength, log } from "firebase/firestore/pipelines";

const Register = () => {
  const { createUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        return alert("Passwords do not match");
      }

      console.log("1. Form data:", data);

      const result = await createUser(data.email, data.password);

      console.log("2. Firebase user created:", result);
      console.log("3. Firebase UID:", result.user.uid);

      const userInfo = {
        name: data.name,
        email: data.email,
        uid: result.user.uid,
      };

      console.log("4. Sending to database:", userInfo);

      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/user`,
        userInfo,
      );

      console.log("5. Database response:", response.data);

      // navigate(location.state?.from || "/");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("ERROR CODE:", error.code);
      console.log("ERROR MESSAGE:", error.message);
    }
  };

  return (
    <div>
      <div>hello</div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-base-content">Create account</h2>
        <p className="text-base-content/60 mt-1">
          Start finding smart deals today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-error text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            placeholder="Min. 6 characters"
            className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters required",
              },
            })}
          />
          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-medium">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Re-enter your password"
            className={`input input-bordered w-full ${errors.confirmPassword ? "input-error" : ""}`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-error text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full mt-2"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-center text-base-content/60 text-sm mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
