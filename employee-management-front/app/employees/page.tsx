'use client';

import { useEffect, useState } from 'react';
import type { Employee } from '@/types/employee';
import { apiGet, apiSend } from '@/lib/api';
import Link from 'next/link';

export default function EmployeesPage() {
    const [data, setData] = useState<Employee[]>([]);
    const [q, setQ] = useState('');

    async function load() {
        const res = await apiGet<Employee[]>('/api/Employees');
        setData(res);
    }
    useEffect(() => { load().catch(console.error); }, []);

    const filtered = data.filter(e =>
        [e.name, e.email, e.department, e.phone].some(v => (v ?? '').toLowerCase().includes(q.toLowerCase()))
    );

    async function remove(id: string) {
        if (!confirm('Delete this employee?')) return;
        await apiSend(`/api/Employees/${id}`, 'DELETE');
        await load();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Employees</h2>
                <div className="flex gap-2">
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search"
                        className="rounded border border-zinc-300 px-3 py-2" />
                    <Link href="#" className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700">Search</Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-zinc-200">
                    <thead className="bg-dark border-b">
                        <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
                            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Salary</th><th>Department</th><th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filtered.map(e => (
                            <tr key={e.id} className="[&>td]:px-3 [&>td]:py-2">
                                <td className="max-w-[220px] truncate">{e.id}</td>
                                <td>{e.name}</td><td>{e.email}</td><td>{e.phone}</td>
                                <td>{e.salary}</td><td>{e.department}</td>
                                <td className="text-right">
                                    <Link href={`/employees/${e.id}/edit`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                                    <button onClick={() => remove(e.id)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={7} className="px-3 py-6 text-center text-zinc-500">No records.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}