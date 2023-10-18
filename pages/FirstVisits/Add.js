import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Add() {
    let router = useRouter();
    // ---------------------------------
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])

    // -------------------
    const [chronicHistory, setChronicHistory] = useState(null)
    const [doctorNumber, setDoctorNumber] = useState(null)
    const [patientNumber, setPatientNumber] = useState(null)
    const [currentChronicMedication, setCurrentChronicMedication] = useState(null)
    const [knownAllegies, setKnownAllegies] = useState(null)
    const [visitDate, setVisitDate] = useState(null)

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
        let dt = Date.parse(visitDate);
        return dt > Date.parse(currentDate);
    }

    let handleSubmit = () => {
        let errors = 0;
        if (!chronicHistory) {
            displayError("chronicHistory");
            errors += 1;
        } else {
            removeError("chronicHistory");
        }

        if (!doctorNumber) {
            displayError("doctorNumber");
            errors += 1;
        } else {
            removeError("doctorNumber");
        }

        if (!patientNumber) {
            displayError("patientNumber");
            errors += 1;
        } else {
            removeError("patientNumber");
        }

        if (!currentChronicMedication) {
            displayError("currentChronicMedication");
            errors += 1;
        } else {
            removeError("currentChronicMedication");
        }

        if (!knownAllegies) {
            displayError("knownAllegies");
            errors += 1;
        } else {
            removeError("knownAllegies");
        }

        if (!validateDate()) {
            displayError("visitDate");
            errors += 1;
        } else {
            removeError("visitDate");
        }

        if (errors === 0) {
            let payload = {
                "chronicHistory": chronicHistory,
                "doctorNumber": doctorNumber,
                "currentChronicMedication": currentChronicMedication,
                "knownAllegies": knownAllegies.replace(";", ",") + ";" + visitDate + ";" + patientNumber
            }
            console.log(payload)

            fetch("https://localhost:44345/api/FirstVisits", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(res => {
                    alert("Record added successfully")
                    router.push("/FirstVisits")
                })
                .catch(err => {
                    console.log("Error:", err)
                    alert("Error:" + err)
                })
        }
    }

    useEffect(() => {
        fetch('https://localhost:44345/api/Doctors')
            .then(res => res.json())
            .then(res => {
                setDoctors(res);
                res.length > 0 ? setDoctorNumber(res[0].doctorNumber) : null
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })

        fetch('https://localhost:44345/api/Patients')
            .then(res => res.json())
            .then(res => {
                setPatients(res);
                res.length > 0 ? setPatientNumber(res[0].patientNumber) : null
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })
    }, [])

    return (
        <div className="container">
            <h1>PATIENT FIRST VISIT</h1>
            <h4>Add First visit details</h4>
            <hr />

            <div className="form-group">
                <label className="control-label">Chronic History</label>
                <input
                    id="chronicHistory" className="form-control"
                    onChange={e => setChronicHistory(e.target.value)}
                />
                <span id="chronicHistory_error" className="invalid-feedback">
                    Enter a valid chronic history, if any, or none if no history
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Doctor</label>
                <select
                    className="form-control form-select" id="doctorNumber"
                    onChange={e => setDoctorNumber(e.target.value)}
                >
                    {/* <option value="select">Select</option> */}
                    {doctors.map((item, index) => (
                        <option key={index} value={item.doctorNumber}>{item.doctorName} {item.doctorSurname} - {item.doctorNumber}</option>
                    ))}
                </select>
                <span id="doctorNumber_error" className="invalid-feedback">
                    Select a valid doctor
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Patient</label>
                <select
                    className="form-control form-select" id="patientNumber"
                    onChange={e => setPatientNumber(e.target.value)}
                >
                    {/* <option value="select">Select</option> */}
                    {patients.map((item, index) => (
                        <option key={index} value={item.patientNumber}>{item.patientName} {item.patientSurname} - {item.patientNumber}</option>
                    ))}
                </select>
                <span id="patientNumber_error" className="invalid-feedback">
                    Select a valid patient
                </span>
            </div>

            <div className="form-group">
                <label className="control-label">Current Chronic Medication</label>
                <input
                    id="currentChronicMedication" className="form-control"
                    onChange={e => setCurrentChronicMedication(e.target.value)}
                />
                <span id="currentChronicMedication_error" className="invalid-feedback">
                    Enter a valid value
                </span>
            </div>

            <div className="form-group">
                <label className="control-label">Known Allegies</label>
                <input
                    id="knownAllegies" className="form-control"
                    onChange={e => setKnownAllegies(e.target.value)}
                />
                <span id="knownAllegies_error" className="invalid-feedback">
                    Enter a valid value or none if there are no allegies
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Visit Date</label>
                <input
                    id="visitDate" className="form-control"
                    type="datetime-local"
                    onChange={e => setVisitDate(e.target.value)}
                />
                <span id="visitDate_error" className="invalid-feedback">
                    Select a valid date in the future
                </span>
            </div>

            <div className="form-group mt-2 my-4 d-flex justify-content-around">
                <Link href="/FirstVisits">
                    <a className="btn btn-warning">Back to List</a>
                </Link>
                <span className="btn btn-primary" onClick={handleSubmit}>SUBMIT</span>
            </div>
        </div>
    )
}