import { useCookies  } from "react-cookie";

export const useCookie = () => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 1);

  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  const setAuthCookie = (token : any) => {
    setCookie("auth", token, { path: "/", expires });
  };

  const removeAuthCookie = () => {
    removeCookie("auth");
  };

  return {
    auth: cookies.auth,
    setAuthCookie,
    removeAuthCookie,
  };
};