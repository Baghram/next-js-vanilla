import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const Maintenance = asyncComponent(() => import('@components/errorPages/Maintenance'));
export default AppPage(() => <Maintenance/>);
