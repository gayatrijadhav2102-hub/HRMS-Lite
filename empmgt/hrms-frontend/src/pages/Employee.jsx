import { useEffect, useState } from "react";
import api from "../services/api";

function Employees() {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const res = await api.get("employees/");
        setEmployees(res.data);
    };

    const deleteEmployee = async (id) => {
        await api.delete(`employees/${id}/`);
        fetchEmployees();
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                Employee List
            </div>

            <div className="card-body">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.employeeid}</td>
                                <td>{emp.fullname}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteEmployee(emp.employeeid)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Employees;