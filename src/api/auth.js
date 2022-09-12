import { Auth as AmplifyAuth } from "aws-amplify";

const SignUp = async (email, password, locale) => {
  await AmplifyAuth.signUp({
    username: email,
    password,
    attributes: { email, locale },
  });
};

const ResendConfirmationCode = async (email) => {
  await AmplifyAuth.resendSignUp(email);
};

const ConfirmSignUp = async (email, code) => {
  await AmplifyAuth.confirmSignUp(email, code);
};

const SignIn = async (email, pwd, remember) => {
  const auth = await AmplifyAuth.signIn(email, pwd);
  if (auth.challengeName === "NEW_PASSWORD_REQUIRED")
    await AmplifyAuth.completeNewPassword(auth, pwd);
  if (remember) await AmplifyAuth.rememberDevice();
  else await AmplifyAuth.forgetDevice();
  return auth;
};

const ForgotPassword = async (email) => {
  await AmplifyAuth.forgotPassword(email);
};

const RedefinePassword = async (email, code, pwd) => {
  await AmplifyAuth.forgotPasswordSubmit(email, code, pwd);
};

const GetUser = async () => {
  const { attributes } = await AmplifyAuth.currentAuthenticatedUser();
  return attributes;
};

const SignOut = async () => {
  await AmplifyAuth.signOut({ global: true });
};

const ChangeEmail = async (email) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { email: email });
};

const ConfirmChangeEmail = async (code) => {
  await AmplifyAuth.verifyCurrentUserAttributeSubmit("email", code);
};

const ChangePassword = async (pwd, newPwd) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.changePassword(user, pwd, newPwd);
};

const ChangeLanguage = async (language) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { locale: language });
};

const GetCredentials = async () => {
  const credentials = await AmplifyAuth.currentCredentials();
  return credentials;
}

const Auth = {
  SignUp,
  ResendConfirmationCode,
  ConfirmSignUp,
  SignIn,
  ForgotPassword,
  RedefinePassword,
  GetUser,
  SignOut,
  ChangeEmail,
  ConfirmChangeEmail,
  ChangePassword,
  ChangeLanguage,
  GetCredentials
};

export default Auth;
