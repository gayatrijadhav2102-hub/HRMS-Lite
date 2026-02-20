import { useState, useEffect } from "react";
import api from "../services/api";

function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [data, setData] = useState({
        employee: "",
        date: "",
        status: "Present",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await api.get("employees/");
        setEmployees(res.data);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitAttendance = async () => {
        try {
            await api.post("attendance/", data);
            setMessage("Attendance Marked Successfully!");
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // If duplicate attendance
                if (errorData.date) {
                    setMessage(errorData.date);
                } else {
                    setMessage("Attendance already marked.");
                }
            } else {
                setMessage("Server error.");
            }
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
                Mark Attendance
            </div>

            <div className="card-body">

                {message && (
                    <div className="alert alert-info">{message}</div>
                )}

                <div className="mb-3">
                    <select
                        className="form-select"
                        name="employee"
                        onChange={handleChange}
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.fullname} ({emp.employeeid})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <select
                        className="form-select"
                        name="status"
                        onChange={handleChange}
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" onClick={submitAttendance}>
                    Submit
                </button>

            </div>
        </div>
    );
}

export default Attendance;