import React, { useState } from "react";

interface Props {
  onSearch: (username: string) => void;
}

const UserSearch: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-2">GitHub Scount</h1>
      <p className="text-secondary dark:text-gray-200 mb-6">
        Enter a GitHub username to explore profile and repositories.
      </p>
      <div className="flex justify-center items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter GitHub username"
          className="px-4 py-2 w-full max-w-sm rounded-md text-gray-600 border border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={handleClick}
          className="bg-accent hover:bg-secondary text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UserSearch;
