import React from 'react';
import useSWR from 'swr';
import Projects from './Projects.tsx';
import BottomNavBar from '../bottom-nav-bar/BottomNavBar.tsx';
import Layout2 from '../../views/layout/Layout2.tsx';

const Apps = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/v1/info/test`,
    fetcher
  );

  return (
    <Layout2>
      <Projects tokens={data ? data.games : []} />
      <BottomNavBar />
    </Layout2>
  );
};

export default Apps;
