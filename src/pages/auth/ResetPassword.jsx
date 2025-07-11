import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Resetting password with token:", token, "New password:", data.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>
        <PrimaryButton type="submit" className="w-full">Reset Password</PrimaryButton>
      </form>
    </div>
  );
};

export default ResetPassword;
