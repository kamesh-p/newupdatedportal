// components/ProtectedRoute.js
import { useSelector } from "react-redux";

const LeadProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user?.user);
  const type = user?.type;

  if (!isAuthenticated || type !== "teamlead") {
    // You can render alternative content here
    return (
      <p>This page is visible only for the team lead not for other users</p>
    );
  }

  return children;
};

export default LeadProtectedRoute;
