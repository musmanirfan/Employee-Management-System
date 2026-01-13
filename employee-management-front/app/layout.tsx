import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Employee Management (Next)' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <header className="bg-dark border-b">
          <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold">EmployeeManagement.UI</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/employees" className="hover:text-blue-600">Employees</Link>
              <Link href="/employees/add" className="hover:text-blue-600">Add Employee</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}