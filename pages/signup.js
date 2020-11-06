import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index'
import asyncComponent from "../@crema/utility/asyncComponent";

const SignUP = asyncComponent(() => import('@components/auth/Signup/index'));
export default AppPage(() => <SignUP/>);
