import React from 'react';
import AuthLayout from './AuthLayout';

export default (ComposedComponent) => (props) => {
  return (
    <AuthLayout>
      <ComposedComponent {...props} />
    </AuthLayout>
  );
};
