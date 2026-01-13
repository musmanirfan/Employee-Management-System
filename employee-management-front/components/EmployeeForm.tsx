import { CreateEmployee, Employee } from '@/types/employee'
import React, { useState } from 'react'

function EmployeeForm({
    initial, submitText = 'save',
    onSubmit,
}: {
    initial?: Partial<Employee>; submitText?: string; onSubmit: (data: CreateEmployee) => Promise<void>;
}) {

    const [form, setForm] = useState<CreateEmployee>(
        {
            name: initial?.name ?? '',
            email: initial?.email ?? '',
            phone: initial?.phone ?? '',
            salary: initial?.salary ?? 0,
            department: initial?.department ?? '',
        }

    )
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const set = (k: keyof CreateEmployee) => (e: any) =>
        setForm((p) => ({ ...p, [k]: k === 'salary' ? Number(e.target.value) : e.target.value }))

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true); setErr(null);
        try { await onSubmit(form) 
            console.log(form);
        }
        catch (ex: any) { setErr(ex?.message ?? 'failed'); }
        finally { setBusy(false) }
    }

    const input = 'w-full rounded border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
    return (
        <form onSubmit={submit} className="space-y-4">
            {err && <div className="rounded border border-red-200 bg-red-50 text-red-700 px-3 py-2">{err}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm mb-1">Name</label>
                    <input className={input} value={form.name} onChange={set('name')} required />
                </div>
                <div><label className="block text-sm mb-1">Email</label>
                    <input className={input} type="email" value={form.email} onChange={set('email')} required />
                </div>
                <div><label className="block text-sm mb-1">Phone</label>
                    <input className={input} value={form.phone} onChange={set('phone')} />
                </div>
                <div><label className="block text-sm mb-1">Department</label>
                    <input className={input} value={form.department} onChange={set('department')} />
                </div>
                <div className="md:col-span-2"><label className="block text-sm mb-1">Salary</label>
                    <input className={input} type="number" value={form.salary} onChange={set('salary')} />
                </div>
            </div>
            <button disabled={busy} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                {busy ? 'Saving...' : submitText}
            </button>
        </form>
    )
}

export default EmployeeForm