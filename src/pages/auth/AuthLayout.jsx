import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const [img, setImg] = useState();

  return (
    <section className="h-screen mx-auto bg-white">
      <div className="container h-full fixed">
        <div className="h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
          <div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0">
            {img && <img src={img} alt="SignUp" className="w-full" />}
          </div>
          <div className="w-10/12 md:w-5/12 lg:w-4/12">
            <Outlet context={{ setImg }}/>
          </div>
        </div>
      </div>
    </section>
  );
}
