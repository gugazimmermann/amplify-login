import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { ROUTES, TYPES } from "../../constants";
import Auth from "../../api/auth";
import { Loading, Nav } from "../../components";

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const loadUser = async (force) => {
    if (!user || force === true) {
      setLoading(true);
      try {
        const attributes = await Auth.GetUser();
        setUser(attributes);
        dispatch({ type: TYPES.UPDATE_LANG, payload: attributes.locale });
        setLoading(false);
      } catch (error) {
        navigate(ROUTES[state.lang].SIGN_IN);
      }
    }
  };

  const handleSignOut = async () => {
    await Auth.SignOut();
    navigate(ROUTES[state.lang].SIGN_IN);
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) return <Loading />

  return (
    <main className="mx-auto h-screen">
      {loading && <Loading />}
      <Nav user={user} handleSignOut={handleSignOut} />
      <div className="mx-auto max-w-screen-lg p-4">
        <Outlet context={{ user, loadUser, setLoading }} />
      </div>
    </main>
  );
}
