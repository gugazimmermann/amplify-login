const en_us_lang = {
  Loading: "Loading",
  Email: "Email",
  Password: "Password",
  Code: "Code",
  PasswordRules: {
    Chars: "Must have at least 8 chars",
    Lowercase: "Requires Lowercase",
    Uppercase: "Requires Uppercase",
    Number: "Requires Number",
    Symbol: "Requires Symbol",
  },
  Languages: {
    "en-US": "English",
    "pt-BR": "Portuguese",
  },
  NotFound: {
    Sorry: "Sorry",
    PageNotFound: "Page Not Found",
  },
  Home: {
    CompleteProfile: "Please, complete the Profile!"
  },
  CommonError: {
    Login: "Sorry, Unable to login",
    SendCode: "Unable to send code, email is correct?",
    RedefinePassword:
      "Unable to redefine password, email, code or new password are wrong!",
    SignUp: "Unable to Register. Email already exists or Password are wrong!",
    ConfirmSignUp: "Unable to confirm registration, email or code are wrong!",
    CodeError: "Invalid verification code provided, please try again.",
    Email: "An account with the given email already exists.",
    Password: "Incorrect Password.",
    NewPassword: "Password did not conform with policy.",
    AttemptLimit: "Attempt limit exceeded, please try after some time.",
  },
  Auth: {
    SignInTitle: "Sign In",
    RememberMe: "Remember Me",
    ForgotPassword: "Forgot Password?",
    ForgotPasswordSuccess: "Check your Email",
    SignInButton: "Sign In",
    NotRegistered: "Not Registered?",
    ForgotPasswordTitle: "Forgot Password",
    SendCode: "Send Code",
    BackToSignIn: "Back to Sign In",
    RedefinePasswordTitle: "Redefine Password",
    RepeatPassword: "Repeat Password",
    RedefinePasswordSuccess: "Password changed successfully!",
    RedefinePasswordButton: "Redefine Password",
    SignUpTitle: "Sign Up",
    SignUpSuccess: "Check your Email",
    SignUpButton: "Sign Up",
    ConfirmRegistrationTitle: "Confirm Registration",
    ResendConfirmationCode: "Resend Confirmation Code",
    ResendConfirmationSuccess: "Code Resent, Check your Email",
    ConfirmRegistrationSuccess: "Confirmation successful!",
    ConfirmRegistrationButton: "Confirm",
  },
  Profile: {
    Profile: "Profile",
    SignOut: "Sign Out",
    ChangeEmail: "Change Email",
    CurrentPassword: "Current Password",
    NewPassword: "New Password",
    RepeatNewPassword: "Repeat New Password",
    ChangePassword: "Change Password",
    Language: "Language",
    ChangeLanguage: "Change Language",
    CodeAlert: "Please, check your email and send the code.",
    EmailSuccess: "Email changed successfully!",
    PasswordSuccess: "Password changed successfully!",
    Name: 'Name',
    Birthdate: 'Birth Date',
    ChangeAttributes: 'Update Profile',
    AttributesSuccess: 'Profile Updated successfully!',
  },
  KYC: {
    Welcome: {
      Button: "Welcome",
      Title: "Welcome to Video KYC",
      SubTitle: "The Video KYC (Know your Customer) process consists of 3 simple steps:",
      DescriptionOne: "Liveliness Detection - The user will do a series of random face gestures to determine whether its a live feed.",
      DescriptionTwo: "Documents Validation - upload valid ID documents to use for verification.</li>",
      DescriptionThree: "Summary - The final result of the validation.",
      Start: "Start"
    },
    Liveliness: {
      Button: "Liveliness",
      Title: "Welcome to Video KYC",
      SubTitle: "You will be asked to make a series of random gestures that will allow us to detect if it is a live stream.",
      ThankYou: "Thank You",
      FailedValidate: "Failed to validate. Try again!",
      NoFace: "Could not recognize a face. Try again.",
      MoreThanOneFace:  "More than one face. Try again.",
      Unkown: "Unkown gesture type specified",
    },
    Documents: {
      Button: "Documents",
      Title: "Documents",
    },
    Summary: {
      Button: "Summary",
      Title: "Summary",
    }
  }
};

export default en_us_lang;
