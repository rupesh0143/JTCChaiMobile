export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: { screen: keyof AuthStackParamList } | undefined;
  Main: { screen: keyof MainTabParamList } | undefined;
};