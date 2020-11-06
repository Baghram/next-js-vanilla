import React, { useEffect } from "react";
import Router from "next/router";
import { initialUrl } from "../../../shared/constants/AppConst";
import { useSelector } from "react-redux";
import Loader from "../../core/Loader";

export default (ComposedComponent) => (props) => {
  const { user, loading } = useSelector(({ auth }) => auth);
  useEffect(() => {
    if (user) {
      Router.push(initialUrl);
    }
  }, [user]);
  if (loading) return <Loader />;
  if (user) return <Loader />;

  return <ComposedComponent {...props} />;
};
