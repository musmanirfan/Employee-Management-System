"use client"

import EmployeeForm from '@/components/EmployeeForm';
import { apiSend } from '@/lib/api';
import { CreateEmployee } from '@/types/employee';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AddEmployeePage() {
    const router = useRouter();

    async function create(form: CreateEmployee) {
        await apiSend('/api/Employees', 'POST', form);
        router.push('/employees')
    }
    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>Add New Employee</h2>
            <EmployeeForm onSubmit={create} submitText='Save' />
        </div>
    )
}
