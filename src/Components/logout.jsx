import { useEffect } from "react";
import auth from "../services/authService";

function Logout() {
  useEffect(() => {
    const performAction = async function () {
      auth.logout();
      window.location = "/";
    };

    performAction();
  });

  return null;
}

export default Logout;
