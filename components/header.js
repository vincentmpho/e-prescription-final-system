import React, { useEffect, useState } from 'react';
import HeaderStyles from '../styles/header.module.css';
import Link from 'next/link';

export default function Header() {
    let u = null;
    const [user, setUser] = useState(null);

    useEffect(() => {
        // setUser(JSON.parse(window.localStorage.getItem('user')));
        setUser(JSON.parse(window.localStorage.getItem('user')));
        console.log("header user:", user);
    }, []);

    return (

        <header>
            {user && <div className="bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    {/* logged in ? */}
                    <div className="d-flex align-items-center justify-content-around">
                        <span className="navbar-brand"> HMSHome</span>
                        {user && <span href="/Auth/" id="username">Hello {user.email}!({user.type.toLowerCase()})</span>}
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="d-flex flex-grow-1 justify-content-between align-items-center flex-wrap">

                        {user.type.toLowerCase() === "admin" && <span className="nav-item m-2" id={HeaderStyles.doctors_link}>
                            <Link href="/Doctors"><a className="btn btn-primary">Doctors</a></Link>
                        </span>}

                        {user.type.toLowerCase() === "admin" && (<span className="nav-item m-2" id={HeaderStyles.practices_link}>
                            <Link href="/MedicalPractices"><a className="btn btn-primary">MedicalPractices</a></Link>
                        </span>)}

                        {user && user.type.toLowerCase() === "admin" && <span className="nav-item m-2" id={HeaderStyles.medications_link}>
                            <Link href="/Medications"><a className="btn btn-primary">Medications</a></Link>
                        </span>}

                        {user.type.toLowerCase() === "admin" && <span className="nav-item m-2" id={HeaderStyles.phamacies_link}>
                            <Link href="/Phamacies"><a className="btn btn-primary">Phamacies</a></Link>
                        </span>}

                        {user.type.toLowerCase() === "admin" && <span className="nav-item m-2" id={HeaderStyles.phamacists_link}>
                            <Link href="/Phamacists"><a className="btn btn-primary">Phamacists</a></Link>
                        </span>}

                        {(user.type.toLowerCase() === "admin") && <span className="nav-item m-2" id={HeaderStyles.prescriptions_link}>
                            <Link href="/Prescriptions"><a className="btn btn-primary">Prescriptions</a></Link>
                        </span>}

                        {user.type.toLowerCase() === "doctor" && <span className="nav-item m-2" id={HeaderStyles.patients_link}>
                            <Link href="/Patients"><a className="btn btn-primary">Patients</a></Link>
                        </span>}

                        {user.type.toLowerCase() === "doctor" && <span className="nav-item m-2" id={HeaderStyles.visits_link}>
                            <Link href="/FirstVisits"><a className="btn btn-primary">Visits</a></Link>
                        </span>}
                        
                        {user.type.toLowerCase() === "phamacist" && <span className="nav-item m-2" id={HeaderStyles.visits_link}>
                            <Link href="/Prescriptions/Search"><a className="btn btn-primary">Fill Prescription</a></Link>
                        </span>}

                        {user && <span className="nav-item m-2">
                            <Link href="/Auth/Logout"><a className="btn btn-warning">Logout</a></Link>
                        </span>}
                        {!user && <span className="nav-item m-2">
                            <Link href="/Auth/Register"><a className="btn btn-link">Register</a></Link>
                        </span>}
                        {!user && <span className="nav-item m-2">
                            <Link href="/Auth/Login"><a className="btn btn-link">Login</a></Link>
                        </span>}
                    </div>
                </div>
            </div>}

        </header>
    )
}
