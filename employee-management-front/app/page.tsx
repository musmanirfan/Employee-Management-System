export default function Home() {
  return (
    <>
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold">Welcome to EmployeeManagement UI</h1>
        <a href="/employees" className="inline-block mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          Explore Employees List
        </a>
      </div>
    </>
  );
}