import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../store/slices/authSlice";

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
