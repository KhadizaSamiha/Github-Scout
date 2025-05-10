import React, { useState, useEffect } from "react";
import { GitHubRepo } from "@/types/github";
import { GoRepo } from "react-icons/go";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserReposProps {
  repos: GitHubRepo[];
}

const UserRepos: React.FC<UserReposProps> = ({ repos }) => {
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedRepos");
    if (saved) {
      setBookmarked(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (repo: GitHubRepo) => {
    const repoId = `${repo.owner.login}/${repo.name}`;
    let updatedBookmarks: string[];

    if (bookmarked.includes(repoId)) {
      updatedBookmarks = bookmarked.filter((id) => id !== repoId);
      toast.error(`Removed ${repo.name} from bookmarks.`);
    } else {
      updatedBookmarks = [...bookmarked, repoId];
      toast.success(`Bookmarked ${repo.name}!`);
    }

    setBookmarked(updatedBookmarks);
    localStorage.setItem("bookmarkedRepos", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="my-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <h3 className="text-2xl font-semibold text-primary">Repositories: {repos.length}</h3>
      <ul className="mt-6 space-y-6">
        {repos.map((repo) => {
          const repoId = `${repo.owner.login}/${repo.name}`;
          const isBookmarked = bookmarked.includes(repoId);

          return (
            <li key={repo.name} className="p-6 rounded-xl shadow-xl bg-blue-100 relative">
              <button
                onClick={() => toggleBookmark(repo)}
                className="absolute top-4 right-4 text-xl text-accent hover:text-blue-800"
                title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
              >
                {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
              </button>

              <div className="flex items-center gap-1">
                <GoRepo className="text-accent text-md" />
                <h4 className="text-xl font-bold text-accent flex items-center">
                  {repo.name}
                  {!repo.private && (
                    <span className="ml-1 text-xs text-green-500">(public)</span>
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
                {repo?.license && (
                  <span className="text-sm text-gray-500">• {repo.license.name} License</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserRepos;
