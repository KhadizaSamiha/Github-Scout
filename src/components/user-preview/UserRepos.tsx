import React from "react";
import { GitHubRepo } from "@/types/Github";

interface UserReposProps {
  repos: GitHubRepo[];
}

const UserRepos: React.FC<UserReposProps> = ({ repos }) => {
  return (
    <div className="my-6">
      <h3 className="text-2xl font-semibold text-primary">Repositories: {repos.length}</h3>
      <ul className="mt-6 space-y-6">
        {repos.map((repo) => (
          <li key={repo.name} className="p-6 rounded-xl shadow-xl bg-blue-100">
            <h4 className="text-2xl font-bold text-accent">{repo.name}</h4>
            <p className="mt-2 text-sm text-gray-600">{repo.description || "No description provided."}</p>
            <div className="flex gap-8 mt-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Stars:</span> {repo.stargazers_count}
              </p>
              <p>
                <span className="font-semibold">Forks:</span> {repo.forks_count}
              </p>
              <p>
                <span className="font-semibold">Language:</span> {repo.language || "Not specified"}
              </p>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <a
                href={`https://github.com/${repo.owner.login}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Repository
              </a>
              {repo?.license && (
                <span className="text-sm text-gray-500">• {repo.license.name} License</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;
