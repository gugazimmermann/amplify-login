import { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { AppContext } from "./context";
import { ROUTES, TYPES } from "./constants";
import { Loading } from "./components";

const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const AuthLayout = lazy(() => import("./pages/auth/AuthLayout"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const RedefinePassword = lazy(() => import("./pages/auth/RedefinePassword"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ConfirmSignUp = lazy(() => import("./pages/auth/ConfirmSignUp"));

const Layout = lazy(() => import("./pages/Layout/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (searchParams.get("lang"))
      dispatch({ type: TYPES.UPDATE_LANG, payload: searchParams.get("lang") });
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES[state.lang].SIGN_IN} element={<SignIn />} />
          <Route
            path={ROUTES[state.lang].FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route
            path={ROUTES[state.lang].REDEFINE_PASSWORD}
            element={<RedefinePassword />}
          />
          <Route path={ROUTES[state.lang].SIGN_UP} element={<SignUp />} />
          <Route
            path={ROUTES[state.lang].CONFIRM_SIGN_UP}
            element={<ConfirmSignUp />}
          />
        </Route>
        <Route element={<Layout />}>
          <Route path={ROUTES[state.lang].HOME} element={<Home />} />
          <Route path={ROUTES[state.lang].PROFILE} element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
