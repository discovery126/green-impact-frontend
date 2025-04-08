import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUser({ roles: decoded.roles }));
      } catch (e) {
        localStorage.removeItem("token");
        console.error("Ошибка при декодировании токена", e);
      }
    }
  }, [dispatch, auth]);

  return null;
};

export default AuthLoader;
