import Router from 'next/router';
import React from 'react';

export default function ErrorPage() {
  React.useEffect(() => {
    Router.push('/')
  });

  return null
};
