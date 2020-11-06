import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index'
import asyncComponent from "../@crema/utility/asyncComponent";

const Error404 = asyncComponent(() => import('@components/errorPages/Error404/index'));
export default AppPage(() => <Error404/>);
