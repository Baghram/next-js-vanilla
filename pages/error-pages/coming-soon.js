import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const ComingSoon = asyncComponent(() => import('@components/errorPages/ComingSoon'));
export default AppPage(() => <ComingSoon/>);
