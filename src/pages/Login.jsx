import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthProvider";
import { API_ENDPOINTS, axiosInstance } from "../api/ApiConfig";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    localStorage.removeItem("access_token");
    try {
      // const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
      // localStorage.setItem("access_token", response.data.access_token);
      setAuth({
        username: "shahab",
        role: "ddeveloper",
        identity: "acp0755",
        loggedIn: true,
      });
      reset();
      console.log("Redirecting");
      navigate("/constellation");
    } catch (error) {
      console.log("Error Signing In.", error);
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        {/* Background Video */}
        <div className="fixed w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source
              src="/satellite-positioning-search-display-to-indicate-reception_2709684.mp4"
              // src="WhatsApp Video 2025-06-11 at 13.53.31_aee8b168.mp4"
              // src="3.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Login Form */}
        <section className="relative z-10 w-full max-w-md px-6 py-8 mx-auto">
          <div className="flex flex-col items-center">
            
            <div className="w-full bg-white/30 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800/30 dark:border-gray-400 backdrop-blur-sm">

              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to continue!
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      {...register("username", { required: true, maxLength: 30 })}
                      autoComplete="username"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      autoComplete="current-password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500 dark:text-gray-300">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a className="text-sm font-medium text-gray-300 hover:underline dark:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? Contact{" "}
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Administrator
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;