import { Link } from "react-router";
import UserName from "../features/user/UserName";
import { useSelector } from "react-redux";

function Header() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <header>
      <Link to="/">The Pizza Slice Co.</Link>

      <input placeholder="Search order #"></input>

      {userName && <UserName userName={userName} />}
    </header>
  );
}

export default Header;
