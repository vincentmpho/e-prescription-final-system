import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Edit() {
    let router = useRouter();
    let { id } = router.query;

    const [patientNumber, setPatientNumber] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientSurname, setPatientSurname] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [patientContact, setPatientContact] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientDOB, setPatientDOB] = useState("");

    useEffect(() => {
        fetch(`https://localhost:44345/api/Patients/${id}`)
            .then(res => res.json())
            .then(res => {

                document.getElementById("number").value = res.patientNumber;
                document.getElementById("name").value = res.patientName;
                document.getElementById("surname").value = res.patientSurname;
                document.getElementById("address").value = res.patientAddress;
                document.getElementById("dob").value = res.patientDOB;
                document.getElementById("email").value = res.patientEmail;
                document.getElementById("contact").value = res.patientContact;
            })
            .catch(err => {
                console.log("Error:", err);
                alert("Error fetching data!!!")
            })
    }, [])
    
    return (
        <div className="container">
            <h4>Patient Details</h4>
            <hr />
            <div className="row">
                <div>
                    <div className="form-group mt-2">
                        <label className="control-label">Patient ID</label>
                        <input
                            id="number" className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Name</label>
                        <input
                            id="name" className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Surname</label>
                        <input
                            id="surname" className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Address</label>
                        <input
                            id="address" className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Contact</label>
                        <input
                            id="contact" className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Email</label>
                        <input
                            id="email" className="form-control"
                            disabled

                        />
                    </div>

                    <div className="form-group mt-2">
                        <label asp-for="dob" className="control-label">Date of Birth</label>
                        <input
                            id="dob" className="form-control"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="form-group mt-2 mx-2">
                <Link href="/Patients">
                    <a className="btn btn-warning">BACK</a>
                </Link>
            </div>
        </div>
    )
}
