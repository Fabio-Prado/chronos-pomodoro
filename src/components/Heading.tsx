import type { ReactNode } from 'react';

type HeadingProps = {
  children: ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return <h1>{children}</h1>;
}