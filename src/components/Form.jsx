const Form = ({ className, children }) => (
  <form className={`${className && className } flex flex-wrap bg-white p-4 rounded-md shadow-md`}>
    {children}
  </form>
);

export default Form;
