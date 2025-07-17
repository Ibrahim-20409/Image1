import React, { useState, useContext } from "react";
import { useNavigate } from "react-router"; // Correct import path for useNavigate
import ConnectNmeaModal from "./ConnectNmeaModal"; // Import your modal component
import AuthContext from "../context/AuthProvider";

const SideBar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const { setAuth } = useContext(AuthContext);

  const handleLogoutUser = async () => {
    try {
      localStorage.removeItem("access_token");
      setAuth({ username: null, role: null, identity: null, loggedIn: false });
      navigate("/login"); // Navigate to login after logout
    } catch (error) {
      console.error("Error Logging Out.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <>
      <nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="px-2 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar} // Toggle sidebar when clicked
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a className="hidden md:flex md:me-20">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Space Division
                </span>
              </a>
            </div>

            <div className="flex-grow text-center items-center">
              <button
                type="button"
                className="py-2 px-4 md:mr-60 text-sm font-medium text-white focus:outline-none bg-green-600 rounded-full border border-green-700 hover:bg-green-700 hover:shadow-inner focus:z-10 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 dark:bg-green-700 dark:text-white dark:border-green-600 dark:hover:text-green dark:hover:bg-green-800 transition"

                onClick={openModal}
              >
                Status: Active
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-10 w-30 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full p-2 pt-20 overflow-y-auto bg-white dark:bg-gray-900 flex flex-col">
          <ul className="space-y-2 font-medium flex-grow">
            <li>
              <button
                onClick={() => navigate("/constellation")} // Navigate to /users
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                  viewBox="105 105 300 300"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M 338.545 109.589 L 330.590 117.084 349.784 136.278 L 368.978 155.472 376.489 148.011 C 381.943 142.593, 384 139.848, 384 137.987 C 384 135.999, 380.219 131.666, 367.183 118.712 C 356.757 108.350, 349.632 102.018, 348.433 102.047 C 347.370 102.073, 342.920 105.466, 338.545 109.589 M 319.234 129.265 C 314.705 133.817, 311 137.987, 311 138.531 C 311 139.837, 347.223 176, 348.532 176 C 349.089 176, 353.244 172.281, 357.766 167.735 L 365.989 159.470 346.729 140.228 L 327.469 120.987 319.234 129.265 M 297.230 151.269 C 292.154 156.367, 288 160.984, 288 161.529 C 288 162.835, 324.221 199, 325.530 199 C 326.085 199, 330.799 194.723, 336.005 189.495 L 345.470 179.990 326.495 160.995 C 316.059 150.548, 307.281 142, 306.990 142 C 306.699 142, 302.307 146.171, 297.230 151.269 M 187.885 166.330 C 185.897 167.068, 182.971 168.597, 181.382 169.728 C 176.570 173.154, 167.998 182.760, 166.453 186.457 C 164.480 191.179, 164.660 198.657, 166.863 203.500 C 170.439 211.361, 169.809 211.710, 190.324 190.484 L 209.078 171.080 205.289 168.593 C 200.576 165.500, 192.834 164.493, 187.885 166.330 M 271.692 175.851 C 264.151 183.503, 261 187.401, 261 189.075 C 261 190.659, 263.164 193.631, 267.499 197.999 L 273.998 204.549 266.232 212.269 L 258.465 219.990 243.494 204.994 L 228.522 189.997 209.262 209.238 L 190.002 228.479 205.007 243.507 L 220.012 258.535 212.230 266.271 L 204.449 274.007 198.003 267.503 C 193.210 262.667, 190.910 261.036, 189.029 261.139 C 187.205 261.239, 183.443 264.449, 175.529 272.658 L 164.558 284.039 183.516 303.016 L 202.474 321.994 213.304 311.247 C 219.260 305.336, 224.567 299.717, 225.097 298.759 C 226.471 296.277, 224.207 292.403, 217.983 286.581 L 212.791 281.725 220.389 274.127 L 227.986 266.530 236.264 274.765 C 240.817 279.294, 244.811 283, 245.139 283 C 245.468 283, 247.483 279.988, 249.618 276.308 C 255.800 265.650, 266.581 255.552, 281.611 246.342 C 283.340 245.283, 282.780 244.455, 275.015 236.585 L 266.530 227.986 274.256 220.260 L 281.981 212.535 288.766 219.267 C 292.497 222.970, 296.172 226, 296.932 226 C 297.693 226, 303.654 220.727, 310.179 214.282 L 322.044 202.563 303.282 183.782 C 292.963 173.452, 284.039 165, 283.452 165 C 282.865 165, 277.573 169.883, 271.692 175.851 M 192.960 194.069 L 174.657 213.137 180.589 219.069 L 186.520 225 205.489 206.011 L 224.459 187.022 218.511 181.011 C 215.239 177.705, 212.270 175, 211.913 175 C 211.555 175, 203.027 183.581, 192.960 194.069 M 305.914 247.368 C 290.788 250.855, 277.678 258.393, 266.869 269.817 C 258.023 279.166, 253.792 286.051, 249.709 297.739 C 245.725 309.140, 244.787 326.384, 247.480 338.670 C 249.188 346.461, 256.128 363, 257.689 363 C 258.703 363, 363 258.774, 363 257.761 C 363 256.584, 352.098 251.420, 344.500 248.999 C 335.823 246.234, 314.707 245.341, 305.914 247.368 M 318.481 308.250 C 292.085 334.788, 268.065 359.054, 265.103 362.175 L 259.717 367.850 264.480 373.425 C 268.028 377.577, 269.916 379, 271.879 379 C 273.988 379, 279.311 374.202, 298.485 355.015 L 322.455 331.030 326.685 335.182 C 330.649 339.071, 330.880 339.600, 330.339 343.542 C 329.197 351.874, 333.680 358.625, 342.012 361.122 C 347.273 362.698, 353.959 360.232, 357.691 355.339 C 361.244 350.681, 361.921 342.946, 359.206 338.025 C 356.356 332.858, 349.827 329.684, 343.518 330.398 C 338.711 330.941, 338.385 330.813, 334.260 326.764 L 329.984 322.568 354.492 297.988 C 367.971 284.469, 379 272.727, 379 271.895 C 379 271.063, 378.438 269.655, 377.750 268.766 C 376.170 266.723, 368.034 260, 367.142 260 C 366.774 260, 344.876 281.712, 318.481 308.250 M 150.735 296.764 L 141.008 306.527 160.268 325.768 L 179.528 345.009 189.500 335 L 199.471 324.991 180.496 305.996 C 170.059 295.548, 161.282 287, 160.991 287 C 160.700 287, 156.085 291.394, 150.735 296.764 M 128.996 318.504 L 120.525 327.019 139.753 346.247 L 158.981 365.475 167.485 357.015 L 175.989 348.556 157.244 329.541 C 146.935 319.084, 138.268 310.406, 137.983 310.258 C 137.699 310.110, 133.655 313.821, 128.996 318.504 M 109.169 338.393 C 104.377 343.335, 102 346.572, 102 348.154 C 102 351.647, 134.525 384, 138.036 384 C 139.836 384, 142.668 381.868, 148.008 376.492 L 155.465 368.985 136.492 349.992 C 126.057 339.547, 117.254 331, 116.929 331 C 116.604 331, 113.112 334.327, 109.169 338.393 M 368 347.804 C 368 356.878, 356.675 368, 347.435 368 C 345.143 368, 345 368.331, 345 373.639 L 345 379.279 350.189 378.664 C 364.868 376.925, 379 362.112, 379 348.462 L 379 345 373.500 345 C 368.141 345, 368 345.072, 368 347.804 M 383.577 347.250 C 383.323 348.488, 382.827 351.275, 382.476 353.445 C 381.595 358.880, 377.635 366.356, 372.940 371.450 C 368.395 376.380, 359.288 381.544, 353.500 382.473 C 344.489 383.919, 345 383.492, 345 389.580 L 345 395.123 349.750 394.481 C 361.915 392.839, 372.287 387.688, 380.645 379.139 C 386.572 373.075, 392.420 362.301, 393.474 355.500 C 393.815 353.300, 394.318 350.038, 394.592 348.250 L 395.091 345 389.564 345 C 384.637 345, 383.988 345.244, 383.577 347.250 M 398.227 353.096 C 394.747 376.975, 375.206 395.841, 351.133 398.565 L 345 399.258 345 404.772 L 345 410.285 351.068 409.651 C 382.165 406.400, 406.463 382.214, 409.624 351.366 L 410.276 345 404.842 345 L 399.407 345 398.227 353.096" />
                </svg>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/monitoring")} // Navigate to /analysis
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 3v18h18v-2H5V3H3zm4 10h2v4H7v-4zm4-4h2v8h-2v-8zm4-4h2v12h-2V5z" />
                </svg>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/users")} // Use navigate to go to /sites
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="-1 -1 21 21"
                  aria-hidden="true"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"></path>
                </svg>
              </button>
            </li>

            
          </ul>

          <ul>
            <li>
              <button
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                onClick={handleLogoutUser}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  ></path>
                </svg>
                {/* <span className="ms-3 whitespace-nowrap">Sign Out</span> */}
              </button>
            </li>
          </ul>
        </div>
      </aside>
      {isModalOpen && <ConnectNmeaModal closeModal={closeModal} />}
    </>
  );
};

export default SideBar;
