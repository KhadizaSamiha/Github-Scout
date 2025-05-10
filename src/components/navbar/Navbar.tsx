import Bookmark from "./Bookmark";
import ThemeToggle from "./ThemeToggle";


const Navbar = () => {
  return (
    <div className="flex justify-end gap-3 my-5">
      <Bookmark/>
      <ThemeToggle/>
    </div>
  );
};

export default Navbar;