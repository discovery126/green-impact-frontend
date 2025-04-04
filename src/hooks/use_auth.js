import { useSelector } from "react-redux";

export function userAuth() {
  const { auth, roles } = useSelector((state) => state.user);

  return {
    auth,
    roles
  };
}
