import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { jwtDecode } from "jwt-decode";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUser({ roles: decoded.roles }));
      } catch (e) {
        console.error("Ошибка при декодировании токена", e);
      }
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
