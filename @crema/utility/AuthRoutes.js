import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "./AppContext";
import { useAuthToken } from "./AppHooks";
import PropTypes from "prop-types";

const AuthRoutes = ({ children }) => {
  const router = useRouter();
  const { query } = router;

  const { changeNavStyle, updateThemeMode, setRTL } = useContext(
    AppContext
  );
   useAuthToken();

  useEffect(() => {
    function handleQueryParams() {
      if (query.layout) {
        changeNavStyle(query.layout);
      }
      if (query.mode) {
        updateThemeMode(query.mode);
      }
      if (query.rtl) {
        setRTL(true);
      }
    }

    if (query) {
      handleQueryParams();
    }
  }, []);
  return <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired
};
