import PageTransition from '@/components/PageTransition';
import { ReactNode } from 'react';

export default function BlogTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
