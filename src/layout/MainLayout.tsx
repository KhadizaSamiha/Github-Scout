// components/MainLayout.tsx
import { useState } from "react";
import axios, { AxiosError } from "axios";
import UserSearch from "@/components/user-search/UserSearch";
import UserProfile from "@/components/user-preview/UserProfile";
import { GitHubUser } from "@/types/Github";


const MainLayout = () => {
   const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");

  const handleUserSearch = async (username: string) => {
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
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10">
      <UserSearch onSearch={handleUserSearch} />

      {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

      {/* If userData exists, render UserProfile */}
      {userData && <UserProfile userData={userData}/>}
    </div>
  );
};

export default MainLayout;
