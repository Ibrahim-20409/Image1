import React, { useEffect, useState } from "react";
import { API_ENDPOINTS, axiosInstance } from "../../api/ApiConfig";
import UserFilter from "./UserFilter";
import UserDetails from "./UserDetails";
import UserRegister from "./UserRegister";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const closeViewModal = () => setIsViewModalOpen(false);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  async function getData(PageNo) {
    try {
      // Include PageNo as a query parameter in the request
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.USERS}?page=${PageNo}`
      );
      const data = response.data.data;
      if (Array.isArray(data)) {
        setUserData(data);
      } else {
        console.error("Unexpected data format:", data);
      }
      const count = response.data.count;
      setUserCount(count);
    } catch (error) {
      console.error("Error getting user list:", error);
    }
  }

  useEffect(() => {
    getData(currentPageNo); // Pass the current page number as the argument
  }, [currentPageNo]);

  const handleClose = () => setIsDrawerOpen(false);

  function totalPageCounts(num) {
    const result = num / 7;
    const remainder = result % 1;
    return remainder > 0.1 ? Math.ceil(result) : Math.floor(result);
  }

  function setUserDetails(userId) {
    const selectedUser = userData.find((user) => user.user_id === userId);
    setSelectedData(selectedUser); // Set the selected user data
    setIsViewModalOpen(true);
  }

  const buildQueryParams = (filterData) => {
    const params = new URLSearchParams();

    for (const key in filterData) {
      if (filterData[key] !== undefined && filterData[key] !== null) {
        params.append(key, filterData[key]);
      }
    }

    return params.toString();
  };

  async function getFilteredData(queryParams = "") {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.USERS_LIST_SEARCH}?${queryParams}`
      );
      const data = response.data.data;
      if (Array.isArray(data)) {
        setUserData(data);
      } else {
        console.error("Unexpected data format:", data);
      }
      const count = response.data.count;
      setUserCount(count);
    } catch (error) {
      console.error("Error getting user list:", error);
    }
  }

  const handleSearch = (filterData) => {
    console.log("Searching for:", filterData);
    const queryParams = buildQueryParams(filterData);
    getFilteredData(queryParams);
  };

  return (
    <div className="p-1">
      <div className="p-1 border-2 border-gray-200 border-dashed rounded-none dark:border-gray-700">
        <div className="rounded-none border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto rounded-none">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    Identity
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    Role
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {userData.length > 0 ? (
                  userData.map((user) => (
                    <tr
                      key={user.user_id}
                      className="*:whitespace-nowrap *:px-4 *:py-2"
                    >
                      <td className="font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </td>
                      <td className="text-gray-700 dark:text-gray-200">
                        {user.identity}
                      </td>
                      <td className="text-gray-700 dark:text-gray-200">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </td>
                      {user.is_active ? (
                        <td className="text-gray-700 dark:text-gray-200">
                          <span
                            className={`inline-flex items-center justify-center rounded-full border border-emerald-500 text-emerald-700 dark:text-emerald-100 px-2.5 py-0.5`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="-ms-1 me-1.5 size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="whitespace-nowrap text-sm">Active</p>
                          </span>
                        </td>
                      ) : (
                        <td className="whitespace-nowrap text-gray-700 dark:text-gray-200">
                          <span className="inline-flex items-center justify-center rounded-full border border-red-500 px-2.5 py-0.5 text-red-700 dark:text-red-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="-ms-1 me-1.5 size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                            </svg>
                            Inactive
                          </span>
                        </td>
                      )}
                      <td className="text-gray-700 dark:text-gray-200">
                        <button
                          onClick={() => setUserDetails(user.user_id)} // Wrap it in a function to call on click
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
            <ol className="flex justify-end gap-1 text-xs font-medium items-center">
              <li>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="block size-9 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white inline-block border-e p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:border-e-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  title="Create Filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14.75c-4.97 0-9 1.657-9 3.75V20a1 1 0 001 1h16a1 1 0 001-1v-1.5c0-2.093-4.03-3.75-9-3.75zM19 8h3m-1.5-1.5v3"
                    />
                  </svg>
                </button>
              </li>

              <li>
                <button
                  className="block size-9 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                  onClick={() => setCurrentPageNo(1)}
                >
                  1
                </button>
              </li>
              <li>
                <div className="max-w-xs mx-auto">
                  <div className="relative flex items-center max-w-[11rem]">
                    {/* Decrement Button */}
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="pageno-input"
                      className="bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:border-gray-600 hover:bg-gray-700 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      onClick={() =>
                        setCurrentPageNo((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <svg
                        className="size-2 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    {/* Input Field */}
                    <input
                      type="text"
                      id="pageno-input"
                      data-input-counter
                      data-input-counter-min="1"
                      data-input-counter-max="5"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      value={currentPageNo}
                      readOnly
                      required
                    />
                    <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                      <svg
                        className="size-3 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>Page#</span>
                    </div>

                    {/* Increment Button */}
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="pageno-input"
                      className="bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:border-gray-600 hover:bg-gray-700 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      onClick={() =>
                        setCurrentPageNo((prev) =>
                          Math.min(prev + 1, totalPageCounts(userCount))
                        )
                      }
                    >
                      <svg
                        className="size-2 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>

              <li>
                <button
                  className="block size-9 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                  onClick={() => setCurrentPageNo(totalPageCounts(userCount))}
                >
                  {totalPageCounts(userCount)}
                </button>
              </li>

              {false && (
                <li>
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="block size-9 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white inline-block border-e p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:border-e-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                    title="Create Filter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
      {
        <UserFilter
          isOpen={isDrawerOpen}
          onClose={handleClose}
          onSearch={handleSearch}
        />
      }
      {isViewModalOpen && (
        <UserDetails userData={selectedData} closeViewModal={closeViewModal} />
      )}
      {isRegisterModalOpen && (
        <UserRegister closeRegisterModal={closeRegisterModal} />
      )}
    </div>
  );
};

export default Users;
