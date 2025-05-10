# 🔍 GitHub User Explorer

A modern React application that allows you to search for any GitHub username and view their profile and public repositories. It includes language-based filtering, pagination or infinite scroll, and repository bookmarking using localStorage.

## 🚀 Live Demo
👉 [GitHub User Explorer Live](https://github.com/KhadizaSamiha/Github-Scout.git)

---

## 🎯 Features

### 🔍 User Search
- ✅ Search input for GitHub usernames
- ✅ Debounced search with 500ms delay to reduce unnecessary API calls
- ✅ Displays user profile info (avatar, name, bio, followers)

### 📂 Repositories
- ✅ Fetches all public repositories of the user

### 📌 Bookmarks
- ✅ Bookmark repositories using `localStorage`
- ✅ View bookmarked repositories in a modal/dialog

### 💅 UI/UX Enhancements
- ✅ Responsive design (mobile-friendly)
- ✅ Loading spinner during data fetch
- ✅ Dark mode toggle
- ✅ Error handling (e.g., user not found)
- ✅ Displays total stars and forks per repository

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/github-user-explorer.git
cd github-user-explorer
npm install
npm run dev
