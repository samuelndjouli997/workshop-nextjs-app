import React from 'react';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-full max-w-full p-4 md:px-6">{children}</div>
    </>
  );
}