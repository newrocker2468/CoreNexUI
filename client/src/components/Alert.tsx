import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

interface RootLayoutProps {
    children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
      <div>
        <main>{children}</main>
        <Toaster />
      </div>
    );
}
