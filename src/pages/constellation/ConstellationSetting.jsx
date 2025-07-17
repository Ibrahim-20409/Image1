import React from "react";

const ConstellationSetting = () => {
  return (
    <fieldset>
      <legend className="sr-only">Checkboxes</legend>

      <div className="flex space-x-4">
        {" "}
        {/* Flexbox for inline layout */}
        {[
          {
            id: "Option1",
            name: "John Clapton",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            id: "Option2",
            name: "Peter Mayer",
            description: "Lorem ipsum dolor sit amet consectetur.",
          },
          {
            id: "Option3",
            name: "Eric King",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            id: "Option4",
            name: "David Foster",
            description: "Lorem ipsum dolor sit amet consectetur elit.",
          },
        ].map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
          >
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id={option.id}
              />
            </div>

            <div>
              <strong className="font-medium text-gray-900">
                {option.name}
              </strong>
              <p className="mt-1 text-pretty text-sm text-gray-700">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default ConstellationSetting;
