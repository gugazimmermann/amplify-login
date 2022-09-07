import { Link } from "react-router-dom";

const Title = ({ text, color, size, back }) => (
  <h1
    className={`${!color ? "text-indigo-500" : color} ${
      !size ? "text-xl" : size
    } font-bold mb-2`}
  >
    {back && (
      <Link to={back}>
        <i className="bx bx-left-arrow-circle mr-2" />
      </Link>
    )}
    {text}
  </h1>
);

export default Title;
