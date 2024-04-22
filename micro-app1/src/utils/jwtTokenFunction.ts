import Cookies from "universal-cookie";
const cookies = new Cookies();

export function parseJwt(): any {
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : cookies.get("authToken");
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
