import { Link } from "react-router-dom";

const AuthLink = ({ to, text, size }) => {
  return (
    <Link
      to={to}
      className={`text-indigo-500 hover:text-amber-500 duration-200 transition ease-in-out ${size && `text-${size}`}`}
    >
      {text}
    </Link>
  );
};

export default AuthLink;
