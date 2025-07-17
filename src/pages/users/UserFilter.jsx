import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";

const UserFilter = ({ isOpen, onClose, onSearch }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      u01: "",
      a11: false,
      d12: false,
      u13: false,
      a21: false,
      i22: false,
    },
  });
  const onSubmit = (data) => {
    onSearch(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex w-[300px] max-w-[300px]">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => onClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative flex-1 mt-20 sm:px-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="relative">
                      <label htmlFor="Search" className="sr-only">
                        Search for...
                      </label>

                      <input
                        {...register("u01")} // Register the input to React Hook Form
                        type="text"
                        id="Search"
                        placeholder="Username"
                        className="w-full px-4 rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <details className="overflow-hidden rounded border border-gray-300 dark:border-gray-600 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-2 px-4 text-gray-900 transition dark:bg-gray-900 dark:text-white">
                        <span className="text-sm font-medium"> Role </span>

                        <span className="transition group-open:-rotate-180">
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
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </summary>

                      <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                        <ul className="space-y-1 border-t border-gray-200 p-4 dark:border-gray-700">
                          <li>
                            <label className="inline-flex items-center gap-2">
                              <Controller
                                name="a11"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="checkbox"
                                    className="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                                  />
                                )}
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Administrators
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterPreOrder"
                              className="inline-flex items-center gap-2"
                            >
                              <Controller
                                name="d12"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="checkbox"
                                    id="FilterPreOrder"
                                    className="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                                  />
                                )}
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Developers
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterOutOfStock"
                              className="inline-flex items-center gap-2"
                            >
                              <Controller
                                name="u13"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="checkbox"
                                    id="FilterOutOfStock"
                                    className="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                                  />
                                )}
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Users
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </details>
                    <details className="overflow-hidden rounded border border-gray-300 dark:border-gray-600 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white py-2 px-4 text-gray-900 transition dark:bg-gray-900 dark:text-white">
                        <span className="text-sm font-medium"> Status </span>

                        <span className="transition group-open:-rotate-180">
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
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </summary>

                      <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                        <ul className="space-y-1 border-t border-gray-200 p-4 dark:border-gray-700">
                          <li>
                            <label className="inline-flex items-center gap-2">
                              <Controller
                                name="a21" // The name of the field in the form state
                                control={control} // Link the field to React Hook Form's control
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    {...field} // Spread the props provided by Controller to the checkbox
                                    className="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                                  />
                                )}
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Active
                              </span>
                            </label>
                          </li>

                          <li>
                            <label className="inline-flex items-center gap-2">
                              <Controller
                                name="i22" // The name of the field in the form state
                                control={control} // Link the field to React Hook Form's control
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    {...field} // Spread the props provided by Controller to the checkbox
                                    className="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                                  />
                                )}
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Inactive
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </details>
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center justify-between mb-4 gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 p-1 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                  >
                    <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
                      Search
                    </span>

                    <span className="shrink-0 rounded-full border border-current bg-white p-1 text-indigo-600 group-active:text-indigo-500">
                      <svg
                        className="size-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UserFilter;
