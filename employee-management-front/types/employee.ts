export type Employee = {
    id: string;
    name : string;
    email: string;
    phone : string; 
    salary : number;
    department : string;
}


export type CreateEmployee = Omit<Employee, 'id'>;

