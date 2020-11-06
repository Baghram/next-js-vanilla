import React from "react";
import AppPage from "../../@crema/hoc/AppPage";
import asyncComponent from "../../@crema/utility/asyncComponent";

const Analytics = asyncComponent(() => import("@components/dashboard/Analytics"));
export default AppPage(() => <Analytics/>);
