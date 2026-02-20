import { Link } from "react-router-dom";

function Layout({ children }) {
    return (
        <div className="d-flex">

            {/* Sidebar */}
            <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
                <h4 className="text-center mb-4">HRMS Admin</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/">Employees</Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/add">Add Employee</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/attendance">Attendance</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Top Navbar */}
                <nav className="navbar navbar-light bg-light shadow-sm px-4">
                    <span className="navbar-brand mb-0 h5">HR Management System</span>
                </nav>

                <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
                    {children}
                </div>
            </div>

        </div>
    );
}

export default Layout;