'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EmployeeForm from '@/components/EmployeeForm';
import { apiGet, apiSend } from '@/lib/api';
import type { CreateEmployee, Employee } from '@/types/employee';

export default function EditEmployeePage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [emp, setEmp] = useState<Employee | null>(null);

    useEffect(() => {
        apiGet<Employee>(`/api/Employees/${id}`).then(setEmp).catch(console.error);
    }, [id]);

    async function save(form: CreateEmployee) {
        await apiSend(`/api/Employees/${id}`, 'PUT', { id, ...form });
        router.push('/employees');
    }

    if (!emp) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
            <EmployeeForm initial={emp} onSubmit={save} submitText="Update" />
        </div>
    );
}