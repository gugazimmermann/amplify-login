import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../../api/auth";
import { Loading } from "../../components";
import Nav from './Nav';

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    setLoading(true);
    setUser(await Auth.GetUser());
    setLoading(false);
  };
  
  const handleSignOut = async () => {
    await Auth.SignOut();
    navigate('/');
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <main className="mx-auto h-screen">
      {loading && <Loading />}
      <Nav handleSignOut={handleSignOut} />
      <div className="mx-auto max-w-screen-lg p-4">
        <Outlet context={{ user }} />
      </div>
    </main>
  );
}
