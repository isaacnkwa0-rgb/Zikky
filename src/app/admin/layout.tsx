import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import NextAuthProvider from '@/components/SessionProvider';
import AdminShell from '@/components/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <NextAuthProvider session={session}>
      <AdminShell>{children}</AdminShell>
    </NextAuthProvider>
  );
}
