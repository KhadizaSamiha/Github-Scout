// components/MainLayout.tsx
import { useState } from "react";
import axios, { AxiosError } from "axios";
import UserSearch from "@/components/user-search/UserSearch";
import UserProfile from "@/components/user-preview/UserProfile";
import UserRepos from "@/components/user-preview/UserRepos";
import { GitHubUser } from "@/types/github";
import { debounce } from "lodash";

const MainLayout = () => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserSearch = debounce(async (username: string) => {
    setUserData(null);
    setError("");
    setLoading(true);

    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);

      setUserData({
        ...res.data,
        repos: reposRes.data,
      });
      setError("");
    } catch (err) {
      const axiosErr = err as AxiosError;
      setUserData(null);
      if (axiosErr.response?.status === 404) {
        setError("User not found.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10">
      <UserSearch onSearch={(username: string) => handleUserSearch(username)} />

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

      {userData && (
        <>
          <UserProfile userData={userData} />
          {userData.repos && <UserRepos repos={userData.repos} />}
        </>
      )}
    </div>
  );
};

export default MainLayout;
