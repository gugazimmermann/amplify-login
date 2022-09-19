/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { ROUTES, TYPES } from "../../constants";
import Auth from "../../api/auth";
import Queries from "../../api/queries";
import Mutations from "../../api/mutations";
import { Loading, Nav } from "../../components";

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(async ({force, email, locale}) => {
    if (!state.user || force === true) {
      let user = await Queries.GetUserByEmail(email);
      if (!user) user = await Mutations.CreateUser(email, locale);
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });
    }
  }, [dispatch, state.user]);

  const handleSignOut = async () => {
    await Auth.SignOut();
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    navigate(ROUTES[state.lang].SIGN_IN);
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const attributes = await Auth.GetUser();
        await loadUser({
          email: attributes.email,
          locale: attributes.locale,
        });
      } catch (error) {
        navigate(ROUTES[state.lang].SIGN_IN);
      }
    };

    isUserLoggedIn();
  }, [loadUser, navigate, state.lang]);

  if (!state.user) return <Loading />;

  return (
    <main className="mx-auto max-w-screen-lg h-screen">
      {loading && <Loading />}
      <Nav handleSignOut={handleSignOut} />
      <div className="h-full -mt-12 pt-12">
        <Outlet context={{ loadUser, setLoading }} />
      </div>
    </main>
  );
}
