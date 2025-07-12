// src/components/DeclineReasonModal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

const DeclineReasonModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Reason for Declining",
  placeholder = "Explain why you're declining this job...",
  confirmText = "Submit Reason",
  cancelText = "Cancel"
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    onConfirm(data.reason);
    reset(); // Reset form fields
    onClose();
  };

  const handleClose = () => {
    reset(); // Reset form fields
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Please provide a reason:
            </label>
            <textarea
              {...register("reason", { 
                required: "Reason is required",
                minLength: {
                  value: 10,
                  message: "Please provide at least 10 characters"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              placeholder={placeholder}
            ></textarea>
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeclineReasonModal;