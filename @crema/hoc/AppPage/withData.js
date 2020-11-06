import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import Loader from "../../core/Loader";

export default (ComposedComponent) => (props) => {
  const { user, loading } = useSelector(({ auth }) => auth);
  useEffect(() => {
    if (!user) {
      Router.push("/signin");
    }
  }, [user]);
  if (loading) return <Loader />;
  if (!user) return <Loader />;

  return <ComposedComponent {...props} />;
};
