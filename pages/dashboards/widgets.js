import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const Widgets = asyncComponent(() => import('@components/dashboard/Widgets'));
export default AppPage(() => <Widgets/>);
