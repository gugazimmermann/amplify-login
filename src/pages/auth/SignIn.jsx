import { useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import SignInImage from "../../images/signin.svg";

export default function SignIn() {
  const { setImg } = useOutletContext();

  useEffect(() => {
    setImg(SignInImage);
  }, [setImg]);

  return (
    <form>
      <div className="mb-4">
        <input
          type="email"
          className="block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          className="block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-indigo-500 checked:border-indigo-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label className="form-check-label inline-block" htmlFor="checkbox">
            Remember Me
          </label>
        </div>
        <Link
          to="/forgorpassword"
          className="text-indigo-500 hover:text-amber-500 duration-200 transition ease-in-out"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="button"
        className="bg-indigo-500 cursor-pointer hover:bg-amber-500 hover:shadow-md focus:bg-amber-500 focus:shadow-md focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-md inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full"
      >
        Sign In
      </button>
      <div className="w-full text-center mt-6">
        <Link
          to="/signup"
          className="text-xl text-indigo-500 hover:text-amber-500 duration-200 transition ease-in-out"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
