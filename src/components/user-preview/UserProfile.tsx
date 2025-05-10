// components/user-preview/UserProfile.tsx
import React from "react";
import { GitHubUser } from "@/types/github";

interface UserProfileProps {
  userData: GitHubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
    <div className="mt-10 text-center bg-gradient-to-b from-[#213448] to-[#547792] dark:from-[hsl(181,40%,47%)] dark:to-[hsl(186,36%,71%)] text-white p-8 rounded-xl shadow-lg">
      <img
        src={userData.avatar_url}
        alt="avatar"
        className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-md"
      />
      <a
        href={`https://github.com/${userData.login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        <h2 className="mt-4 text-2xl font-bold">
          {userData.name} <span className="font-light">| {userData.login}</span>
        </h2>
      </a>

      <p className="mt-2 text-lg">Feni, Bangladesh</p>
      <p className="mt-2">
        <span className="font-semibold">Followers:</span> {userData.followers}
      </p>

      <div className="mt-4 flex items-center gap-4 justify-center">
        <p>
          <span className="font-semibold">Total Stars:</span>{" "}
          {userData.repos
            ? userData.repos.reduce(
                (total, repo) => total + repo.stargazers_count,
                0
              )
            : 0}
        </p>
        <p>
          <span className="font-semibold">Total Forks:</span>{" "}
          {userData.repos
            ? userData.repos.reduce(
                (total, repo) => total + repo.forks_count,
                0
              )
            : 0}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
