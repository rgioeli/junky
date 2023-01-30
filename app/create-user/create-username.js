"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateUsername = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const handleOnChange = (e) => {
    const value = e.target.value.replace(/[^\w]/g, "");
    setInputValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch("/api/user/create-username", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
        method: "PUT",
      });

      const response = await request.json();
      router.replace("/");
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <div className=" relative mt-10 flex flex-col justify-center items-center max-w-md">
      <div className="relative z-10 p-5 gap-y-5 bg-white w-full border-2 border-purple-900 flex flex-col justify-center items-center">
        <h1 className="text-lg text-purple-900">Choose a username</h1>
        <p>Assign a username to your account.</p>
        <form onSubmit={handleSubmit} className="">
          <div className="space-x-2 flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg border-2 border-purple-900 text-purple-900"
              placeholder="Enter a username"
              onChange={handleOnChange}
              value={inputValue}
              maxLength={16}
              minLength={3}
            />
            <button
              type="submit"
              className="p-2 rounded-lg text-white bg-gradient-to-l from-purple-900 to-purple-700"
            >
              Submit
            </button>
          </div>
          <p className="mt-5 text-sm text-purple-900">
            Username can include numbers, letters and underscore characters. 3
            character minimum, 16 character limit.
          </p>
        </form>
      </div>
      <div className="bg-gradient-to-l from-purple-900 to-purple-700 absolute top-5 -right-5 w-full h-full z-0">
        qwewqe
      </div>
    </div>
  );
};

export default CreateUsername;
