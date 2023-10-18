import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PatientDashboard() {
    let router = useRouter();
    const [user, setUser] = useState(null)
    const [Res, setRes] = useState(null)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])

    const [userExists, setUserExists] = useState(false)

    const [patientNumber, setPatientNumber] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientSurname, setPatientSurname] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [patientContact, setPatientContact] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientDOB, setPatientDOB] = useState("");

    let validateEmail = (mail) => {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(mail).toLowerCase());
    }

    let displayError = (id) => {
        let input = document.getElementById(`${id}`);
        let error_div = document.getElementById(`${id}_error`);
        error_div.style.display = "block";
        input.style.borderColor = "red";
        if (!input.className.includes("is-invalid")) {
            input.classList.add("is-invalid");
        }
    }

    let removeError = (id) => {
        let input = document.getElementById(`${id}`);
        let error_div = document.getElementById(`${id}_error`);
        error_div.style.display = "none";
        // input.style.borderColor = "#ced4da";
        input.style.borderColor = "green";
        if (input.className.includes("is-invalid")) {
            input.classList.remove("is-invalid");
        }
    }

    let validateDate = () => {
        let currentDate = new Date();
        let dt = Date.parse(patientDOB);
        return dt < Date.parse(currentDate);
    }

    let handleSubmit = () => {

        let errors = 0;
        if (!patientNumber || patientNumber.length !== 12) {
            displayError("number");
            errors += 1;
        } else {
            removeError("number");
        }

        if (!patientName) {
            displayError("name");
            errors += 1;
        } else {
            removeError("name");
        }

        if (!patientSurname) {
            displayError("surname");
            errors += 1;
        } else {
            removeError("surname");
        }

        if (!validateEmail(patientEmail)) {
            displayError("email");
            errors += 1;
        } else {
            removeError("email");
        }

        if ((patientContact[0] !== "0") || (patientContact.length !== 10)) {
            displayError("contact");
            errors += 1;
        } else {
            removeError("contact");
        }

        if ((!patientAddress) || (patientAddress.length < 10)) {
            displayError("address");
            errors += 1;
        } else {
            removeError("address");
        }

        if (!validateDate()) {
            displayError("dob");
            errors += 1;
        } else {
            removeError("dob");
        }

        if (errors === 0) {
            let payload = {
                "patientNumber": patientNumber,
                "patientName": patientName,
                "patientSurname": patientSurname,
                "patientAddress": patientAddress,
                "patientContact": Number(patientContact),
                "patientEmail": patientEmail,
                "patientDOB": patientDOB
            }
            userExists ? (
                fetch(`https://localhost:44345/api/Patients/${patientNumber}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                    .then(res => res.json())
                    .then((res) => {
                        alert("Success");
                        // router.push("/Patients");
                    })
                    .catch(err => {
                        console.log("Error:", err);
                        alert("Error: " + err)
                    })
            ) : (
                fetch(`https://localhost:44345/api/Patients`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                    .then(res => res.json())
                    .then((res) => {
                        alert("Patient record updated");
                        // router.push("/Patients");
                        router.reload()
                    })
                    .catch(err => {
                        console.log("Error:", err);
                        alert("Error: " + err)
                    })
            )

        }
    }

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')));
        let u = JSON.parse(window.localStorage.getItem('user'));
        setPatientEmail(u.email);
        document.getElementById("email").value = u.email;

        console.log('====================================');
        console.log(user);
        console.log('====================================');
        fetch(`https://localhost:44345/api/Patients`)
            .then(res => res.json())
            .then(res => {
                console.log('====================================');
                console.log(res);
                console.log('====================================');
                setRes(res)

                res.map((item, index) => {
                    if (u.email === item.patientEmail) {
                        console.log("patient:", item);
                        setUserExists(true)
                        setPatientNumber(item.patientNumber);
                        setPatientName(item.patientName);
                        setPatientSurname(item.patientSurname);
                        setPatientAddress(item.patientAddress);
                        setPatientContact(item.patientContact);
                        setPatientDOB(item.patientDOB);

                        document.getElementById("number").value = item.patientNumber;
                        document.getElementById("name").value = item.patientName;
                        document.getElementById("surname").value = item.patientSurname;
                        document.getElementById("address").value = item.patientAddress;
                        document.getElementById("dob").value = item.patientDOB;
                        document.getElementById("contact").value = item.patientContact;
                    }
                })
            })
            .catch(err => {
                console.log("Error:", err);
                alert("Error fetching data!!!")
            })
        
        // prescriptions
        fetch("https://localhost:44345/api/Prescriptions")
            .then(res => res.json())
            .then(res => {
                let myPrescriptions = []
                res.map((item, index) => {
                    if(item.patientNumber === patientNumber) {
                        myPrescriptions.push(item);
                    }
                })
                setData(myPrescriptions);
            })
            .catch(err => {
                console.log("Error fetch data: " + err);
                alert("Error fetch data: " + err);
            })
            
            
        fetch("https://localhost:44345/api/FirstVisits")
            .then(res => res.json())
            .then(res => {
            console.log("visits:", res)
                // let myVisits = []
                // res.map((item, index) => {
                //     if (item.knownAllegies.split(";")[2] === patientNumber) {
                //         myVisits.push(item);
                //     }
                // })
                setData2(res);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                alert("Error fetching data: " + err);
            })
    }, [])


    return (
        <div className="container">
            <div className="d-flex justify-content-around align-items-center">
                <h2>Patient Dashboard</h2>
                <Link href="/Auth/Logout"><a className="btn btn-warning">Logout</a></Link>
            </div>

            {!userExists && <span style={{ color: "red" }}>Please finish setting up your account!!</span>}

            <hr />
            <div className="row">
                <div>
                    <div className="form-group mt-2">
                        <label className="control-label">Patient ID</label>
                        <input
                            id="number" className="form-control"
                            type="number"
                            disabled={userExists}
                            onChange={e => setPatientNumber(e.target.value)}
                        />
                        <span id="number_error" className="invalid-feedback">
                            Enter a valid 12 digit number
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Name</label>
                        <input
                            id="name" className="form-control"
                            onChange={e => setPatientName(e.target.value)}
                        />
                        <span id="name_error" className="invalid-feedback">
                            Enter a valid name
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Surname</label>
                        <input
                            id="surname" className="form-control"
                            onChange={e => setPatientSurname(e.target.value)}
                        />
                        <span id="surname_error" className="invalid-feedback">
                            Enter a valid surname
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Address</label>
                        <input
                            id="address" className="form-control"
                            onChange={e => setPatientAddress(e.target.value)}
                        />
                        <span id="address_error" className="invalid-feedback">
                            Enter a valid physical address with at least 10 characters
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Contact</label>
                        <input
                            id="contact" className="form-control"
                            type="number"
                            onChange={e => setPatientContact(e.target.value)}
                        />
                        <span id="contact_error" className="invalid-feedback">
                            Enter a valid 10 digit contact number
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <label className="control-label">Patient Email</label>
                        <input
                            id="email" className="form-control"
                            type="email"
                            onChange={e => setPatientEmail(e.target.value)}
                        />
                        <span id="email_error" className="invalid-feedback">
                            Enter a valid email address
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <label asp-for="dob" className="control-label">Date of Birth</label>
                        <input
                            id="dob" className="form-control"
                            type="datetime-local"
                            onChange={e => setPatientDOB(e.target.value)}
                        />
                        <span id="dob_error" className="invalid-feedback">
                            Select a valid date of birth
                        </span>
                    </div>

                    <div className="form-group mt-2">
                        <span className="btn btn-primary" onClick={handleSubmit}>SUBMIT</span>
                    </div>
                </div>
            </div>
            <hr />
            {data.length > 0 &&
            <div className="container mb-4">
                <span>My Prescriptions</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                PrescriptionDate
                            </th>
                            <th>
                                MedicationNumber
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Instructions
                            </th>
                            <th>
                                Repetition
                            </th>
                            <th>
                                Filled
                            </th>
                            <th>
                                PatientNumber
                            </th>
                            <th>
                                DoctorName
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="align-middle">
                                <td>
                                    {item.prescriptionDate}
                                </td>
                                <td>
                                    {item.medicationNumber}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.instructions}
                                </td>
                                <td>
                                    {item.repetition}
                                </td>
                                <td>
                                    {item.filled}
                                </td>
                                <td>
                                    {item.patientNumber}
                                </td>
                                <td>
                                    {item.doctorName}
                                </td>

                                <td className="d-flex flex-column justify-content-center">
                                    {/* <Link href={`/Prescriptions/Edit/?id=${item.phamacistNumber}`}>
                                        <a className="btn btn-primary">Edit</a>
                                    </Link>

                                    <Link href={`/Prescriptions/Details/?id=${item.phamacistNumber}`}>
                                        <a className="btn btn-secondary my-2">Details</a>
                                    </Link>

                                    <Link href={`/Prescriptions/Delete/?id=${item.phamacistNumber}`}>
                                        <a className="btn btn-warning">Delete</a>
                                    </Link> */}
                                </td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            </div>
            }
            
            <hr />
            {data2.length > 0 &&
                <div className="container mb-4">
                <h1>My Visists</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Chronic History
                            </th>
                            <th>
                                Current Chronic Medication
                            </th>
                            <th>
                                Known Allegies
                            </th>
                            <th>
                                Doctor
                            </th>
                            <th>
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data2.map((item, index) => {
                            if (item.knownAllegies.split(";")[2] === patientNumber)
                        return (
                            <tr key={index}>
                                <td>
                                    {item.chronicHistory}
                                </td>
                                <td>
                                    {item.currentChronicMedication}
                                </td>
                                <td>
                                    {item.knownAllegies.split(";")[0]}
                                </td>
                                <td>
                                    {item.doctorNumber}
                                </td>
                                <td>
                                    {item.knownAllegies.split(";")[1]}
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                </div>
                
            }
        </div>
    )
}
