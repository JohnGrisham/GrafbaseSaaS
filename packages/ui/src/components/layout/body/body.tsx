import * as React from 'react';
export interface BodyProps {
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <main className="ui-flex ui-h-full ui-min-h-[92vh] ui-bg-white dark:ui-bg-black ui-justify-center ui-p-8">
      {children}
    </main>
  );
};
