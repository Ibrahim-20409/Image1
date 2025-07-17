import React from "react";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS, axiosInstance } from "../../api/ApiConfig";

const UserRegister = ({ closeRegisterModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.USERS, data);
      console.log("User Created:", response.data);
      alert("User created successfully!");
      reset();
      const closeButton = document.getElementById("closeRegisterModal");
      if (closeButton) {
        closeButton.click();
      } else {
        console.log("Close button not found!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative rounded-lg border border-gray-100 text-center shadow-xl bg-white">
        <button
          className="absolute -end-1 -top-1 rounded-full border border-gray-300 bg-gray-100 p-1"
          onClick={closeRegisterModal}
          id="closeRegisterModal"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <section className="overflow-hidden rounded-lg shadow-2xl p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-lg sm:p-6 "
          >
            <div className="mx-auto max-w-lg mb-7 text-center">
              <h1 className="text-2xl font-bold sm:text-3xl bg-indigo-600 text-white p-2 rounded">
                User Registration!
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-base font-bold text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", { required: true })}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Identity Field */}
              <div>
                <label
                  htmlFor="identity"
                  className="block text-base font-bold text-black"
                >
                  Identity
                </label>
                <input
                  type="text"
                  id="identity"
                  {...register("identity", { required: true })}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-bold text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {})}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Role Field */}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              {/* Password Field */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-base font-bold text-black"
                >
                  Status
                </label>
                <select
                  id="is_active"
                  {...register("is_active", { required: true })}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  defaultValue="select"
                >
                  <option value="select" disabled>
                    Select...
                  </option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              {/* Role Field */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-base font-bold text-black"
                >
                  Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: true })}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  defaultValue="select"
                >
                  <option value="select" disabled>
                    Select
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              {/* Status Field */}
            </div>

            {/* <div className="mt-4">
              <label className="block text-base font-bold text-black mb-2">
                Site Access
              </label>
              <fieldset>
                <legend className="sr-only">Checkboxes</legend>

                <div className="space-y-2">
                  <label
                    htmlFor="One"
                    className="flex cursor-pointer items-start gap-4"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="One"
                        {...register("site_access")}
                        id="One"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <strong className="font-medium text-gray-900 dark:text-gray-200">
                        One
                      </strong>
                    </div>
                  </label>

                  <label
                    htmlFor="Two"
                    className="flex cursor-pointer items-start gap-4"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="Two"
                        {...register("site_access")}
                        id="Two"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <strong className="font-medium text-gray-900 dark:text-gray-200">
                        Two
                      </strong>
                    </div>
                  </label>
                </div>
              </fieldset>
            </div> */}

            <button
              type="submit"
              className="w-full my-4 gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 p-1 text-white font-bold transition-colors hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <span className="transition-colors">Submit</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UserRegister;
