import React from 'react';
import SessionWrapper from '@/components/SessionWrapper';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="m-4 items-center justify-center">
      <Dashboard></Dashboard>
    </main>
  );
}
