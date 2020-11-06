import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const Error500 = asyncComponent(() => import('@components/errorPages/Error500'));
export default AppPage(() => <Error500/>);
