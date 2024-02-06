// components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user?.user);
  const type = user?.type;
  const router = useRouter();

  if (!isAuthenticated || type != "hr") {
    router.push("/Login");
    return null;
  }

  //   if (type != "hr") {
  //     router.push("/Login");
  //     return null;
  //   }

  return children;
};

export default ProtectedRoute;
