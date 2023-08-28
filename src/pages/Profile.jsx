import React, { useContext } from "react";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { Context, server } from "../main";

const Profile = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated, setLoading, loading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const profileContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f7f7f7",
    padding: "20px", // Add some padding for better spacing
    boxSizing: "border-box", // Include padding in the total element size
  };

  const h1Style = {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  };

  const pStyle = {
    fontSize: "16px",
    color: "#666",
  };

  // Responsive styles using media queries
  const responsiveStyles = {
    h1Style: {
      fontSize: "32px",
    },
    pStyle: {
      fontSize: "20px",
    },
  };

  return loading ? (
    <div style={profileContainerStyle}>
      <Loader />
    </div>
  ) : (
    <div style={profileContainerStyle}>
      <h1 style={{ ...h1Style, ...responsiveStyles.h1Style }}>{user?.name}</h1>
      <p style={{ ...pStyle, ...responsiveStyles.pStyle }}>{user?.email}</p>
    </div>
  );
};

export default Profile;
