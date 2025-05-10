import { useEffect, useState } from "react";
import { GitHubRepo } from "@/types/github";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoRepo } from "react-icons/go";
import { BookmarkCheck } from "lucide-react";

const Bookmark = () => {
  const [bookmarkedRepos, setBookmarkedRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedRepos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookmarkedRepos(parsed);
        }
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage", error);
      }
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2.5 rounded-full text-xl bg-gray-700 dark:bg-gray-200">
          <BookmarkCheck />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Bookmarked Repositories ({bookmarkedRepos.length})
          </DialogTitle>
        </DialogHeader>

        {bookmarkedRepos.length === 0 ? (
          <p className="text-muted-foreground">No bookmarks found.</p>
        ) : (
          <ul className="space-y-6 mt-4">
            {bookmarkedRepos.map((repo) => {
              const repoId = `${repo.owner.login}/${repo.name}`;

              return (
                <li
                  key={repoId}
                  className="p-6 rounded-xl shadow-md bg-blue-100 dark:bg-muted"
                >
                  <div className="flex items-center gap-1 dark:text-gray-200 text-gray-600">
                    <GoRepo className="text-md" />
                    <h4 className="text-xl font-bold flex items-center">
                      {repo.name}
                      {!repo.private && (
                        <span className="ml-1 text-xs text-green-500">
                          (public)
                        </span>
                      )}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex gap-8 mt-4 text-sm text-gray-700 dark:text-gray-200">
                    <p>
                      <span className="font-semibold">Stars:</span>{" "}
                      {repo.stargazers_count}
                    </p>
                    <p>
                      <span className="font-semibold">Forks:</span>{" "}
                      {repo.forks_count}
                    </p>
                    <p>
                      <span className="font-semibold">Language:</span>{" "}
                      {repo.language || "Not specified"}
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        • {repo.license.name} License
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Bookmark;
