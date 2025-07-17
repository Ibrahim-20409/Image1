import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS, axiosInstance } from "../../api/ApiConfig";

const UserDetails = ({ userData, closeViewModal }) => {
  const [isViewMode, setIsViewMode] = useState(false); // To handle view/edit toggle
  const {
    register,
    handleSubmit,
    setValue, // Use this to populate form fields
    reset,
    formState: { errors },
  } = useForm();

  // Initialize the form with userData on modal open
  useEffect(() => {
    if (userData) {
      // Set initial values from userData
      setValue("username", userData.username || "");
      setValue("identity", userData.identity || "");
      setValue("password", userData.password || "");
      setValue(
        "is_active",
        userData?.is_active === true
          ? "1"
          : userData?.is_active === false
          ? "0"
          : "select"
      );
      setValue("role", userData.role || "select");
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isViewMode) {
        console.log("View Mode: No changes submitted");
        return;
      }
      if (!userData?.user_id) {
        throw new Error("User ID is missing!");
      }
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.USERS}${userData.user_id}`,
        data
      );
      console.log("User Updated:", response.data);
      alert("User updated successfully!");
      reset();

      // Get the button element and trigger the click
      const closeButton = document.getElementById("closeViewModal");
      if (closeButton) {
        closeButton.click(); // Trigger the click event on the button
      } else {
        console.log("Close button not found!");
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  const handleToggleView = () => {
    setIsViewMode((prev) => !prev); // Toggle between view and edit mode
  };

  const userDeleteRequest = async () => {
    try {
      if (isViewMode) {
        console.log("View Mode: No changes submitted");
        return; // Do nothing when in view mode
      }
      if (!userData?.user_id) {
        throw new Error("User ID is missing!");
      }

      // Ask for confirmation
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      );
      if (!isConfirmed) {
        console.log("User deletion canceled by the user.");
        return; // Exit if the user cancels the action
      }

      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.USERS}${userData.user_id}`
      );
      console.log("User Deleted:", response.data);
      alert("User deleted successfully!");
      reset();

      // Get the button element and trigger the click
      const closeButton = document.getElementById("closeViewModal");
      if (closeButton) {
        closeButton.click(); // Trigger the click event on the button
      } else {
        console.log("Close button not found!");
      }
    } catch (error) {
      console.error("Error deleting user details:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative rounded-lg border border-gray-100 text-center shadow-xl bg-white max-w-full">
        <button
          className="absolute -end-1 -top-1 rounded-full border border-gray-300 bg-gray-100 p-1"
          onClick={closeViewModal}
          id="closeViewModal"
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

        <section className="overflow-y-auto max-h-[90vh] rounded-lg shadow-2xl p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-lg sm:p-6"
          >
            <div className="mx-auto max-w-lg mb-3 text-center shadow-inner ">
              <h1 className="text-2xl font-bold sm:text-3xl bg-indigo-600 text-white p-2 rounded">
                User Modification!
              </h1>
            </div>

            {/* View Edit Toggle */}
            <div className="flex items-center justify-end space-x-4 mb-3">
              <div className="border border-gray-300 shadow-lg rounded-lg p-3 transform hover:scale-105 transition-all flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-800">
                  View
                </span>

                <label
                  htmlFor="AcceptConditions"
                  className="relative inline-block h-6 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-red-500"
                >
                  <input
                    type="checkbox"
                    id="AcceptConditions"
                    className="peer sr-only"
                    checked={!isViewMode} // Set to true when editing, false when viewing
                    onChange={handleToggleView} // Toggle view/edit mode
                  />
                  <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                </label>

                <span className="text-sm font-medium text-gray-900 dark:text-gray-800">
                  Edit
                </span>
              </div>
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
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 disabled:opacity-80 disabled:bg-gray-200 dark:disabled:bg-gray-700"
                  disabled={isViewMode} // Disable input in view mode
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
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 disabled:opacity-80 disabled:bg-gray-200 dark:disabled:bg-gray-700"
                  disabled={isViewMode} // Disable input in view mode
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              {/* Status Field */}
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
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 disabled:opacity-80 disabled:bg-gray-200 dark:disabled:bg-gray-700"
                  disabled={isViewMode} // Disable input in view mode
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
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 disabled:opacity-80 disabled:bg-gray-200 dark:disabled:bg-gray-700"
                  disabled={isViewMode} // Disable input in view mode
                >
                  <option value="select" disabled>
                    Select
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
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
                  {...register("password")}
                  placeholder="Update existing password or leave blank to keep the old one"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 disabled:opacity-80 disabled:bg-gray-200 dark:disabled:bg-gray-700"
                  disabled={isViewMode} // Disable input in view mode
                />
              </div>
            </div>

            <div className="w-full flex gap-4 justify-center my-4">
              <button
                className="inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-500 disabled:opacity-80 disabled:bg-gray-700 dark:disabled:bg-gray-700"
                disabled={isViewMode} // Disable button in view mode
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default form submit behavior
                  userDeleteRequest(); // Call your delete logic
                }}
              >
                Delete
              </button>

              {/* Border */}

              <button
                className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500 disabled:opacity-80 disabled:bg-gray-200 disabled:text-gray-700 disabled:border-gray-700"
                type="submit"
                disabled={isViewMode} // Disable button in view mode
              >
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
