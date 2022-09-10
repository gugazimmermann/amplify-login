const Alert = ({ type, text }) => (
  <div
    className={`my-2 text-center 
    ${!text && "hidden"} ${
      type === "error"
        ? "text-red-600"
        : type === "info"
        ? "text-indigo-600"
        : type === "warning"
        ? "bg-amber-400 text-white border border-amber-600 py-2"
        : "text-emerald-600"
    }`}
  >
    <p>{text}</p>
  </div>
);

export default Alert;
