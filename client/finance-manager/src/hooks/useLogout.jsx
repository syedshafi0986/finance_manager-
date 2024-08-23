import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate= useNavigate()

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");


    // Dispatch LOGOUT action to clear user from context
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };

  return { logout };
};
