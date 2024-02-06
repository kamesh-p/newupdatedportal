// components/ProtectedRoute.js
import { useSelector } from "react-redux";

const TeammemberProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user?.user);
  const type = user?.type;

  if (!isAuthenticated || type !== "teammember") {
    // You can render alternative content here
    return <p>You are not authorized to view this page. </p>;
  }

  return children;
};

export default TeammemberProtectedRoute;
