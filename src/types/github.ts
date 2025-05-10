// types/Github.ts

export interface GitHubRepoOwner {
  login: string;
  id: number; 
}

export interface GitHubRepo {
  name: string;
  description?: string; 
  stargazers_count: number;
  forks_count: number;
  language?: string; 
  license?: { name: string }; 
  owner: GitHubRepoOwner;
  private: boolean;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  repos: GitHubRepo[];
}
