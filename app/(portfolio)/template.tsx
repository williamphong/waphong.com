import PageTransition from '@/components/PageTransition';
import { ReactNode } from 'react';

export default function PortfolioTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
