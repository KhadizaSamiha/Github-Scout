import { GitHubRepo } from "@/types/github";
import React from "react";
import { FaGithub, FaBookmark } from "react-icons/fa"; // Importing bookmark icon

interface RepoCardProps {
  repo: GitHubRepo;
  isBookmarked: boolean;
  onBookmark: (repo: GitHubRepo) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, isBookmarked, onBookmark }) => {
  return (
    <li className="p-6 rounded-xl shadow-xl bg-blue-100">
      <div className="flex items-center gap-3">
        <FaGithub className="text-gray-700 text-xl" /> {/* Repo icon */}
        <h4 className="text-2xl font-bold text-accent flex items-center">
          {repo.name}
          {repo.private === false && (
            <span className="ml-2 text-xs text-green-500">(public)</span> // Display public label
          )}
        </h4>
      </div>
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
        <button
          onClick={() => onBookmark(repo)}
          className="text-gray-600 hover:text-yellow-500"
        >
          <FaBookmark className={`text-lg ${isBookmarked ? "text-yellow-500" : ""}`} />
        </button>
        {repo?.license && (
          <span className="text-sm text-gray-500">• {repo.license.name} License</span>
        )}
      </div>
    </li>
  );
};

export default RepoCard;
