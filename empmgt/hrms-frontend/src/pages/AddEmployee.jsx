import { useState } from "react";
import api from "../services/api";

function AddEmployee() {
    const [form, setForm] = useState({
        employeeid: "",
        fullname: "",
        email: "",
        department: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
    };

    const handleSubmit = async () => {
        try {
            const res = await api.post("employees/", form);

            setSuccess("Employee added successfully!");
            setErrors({});

            // Clear form
            setForm({
                employeeid: "",
                fullname: "",
                email: "",
                department: "",
            });

        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert("Server error.");
            }
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
                Add Employee
            </div>

            <div className="card-body">

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                {/* Employee ID */}
                <div className="mb-3">
                    <input
                        className={`form-control ${errors.employeeid ? "is-invalid" : ""}`}
                        name="employeeid"
                        placeholder="Employee ID"
                        value={form.employeeid}
                        onChange={handleChange}
                    />
                    {errors.employee_id && (
                        <div className="invalid-feedback">
                            {errors.employeeid[0]}
                        </div>
                    )}
                </div>

                {/* Full Name */}
                <div className="mb-3">
                    <input
                        className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                        name="fullname"
                        placeholder="Full Name"
                        value={form.fullname}
                        onChange={handleChange}
                    />
                    {errors.full_name && (
                        <div className="invalid-feedback">
                            {errors.full_name[0]}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <input
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email[0]}
                        </div>
                    )}
                </div>

                {/* Department */}
                <div className="mb-3">
                    <input
                        className={`form-control ${errors.department ? "is-invalid" : ""}`}
                        name="department"
                        placeholder="Department"
                        value={form.department}
                        onChange={handleChange}
                    />
                    {errors.department && (
                        <div className="invalid-feedback">
                            {errors.department[0]}
                        </div>
                    )}
                </div>

                <button className="btn btn-success w-100" onClick={handleSubmit}>
                    Add Employee
                </button>

            </div>
        </div>
    );
}

export default AddEmployee;