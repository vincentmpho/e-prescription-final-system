import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Add() {
    let router = useRouter();

    // ---------------------------------
    const [doctor, setDoctor] = useState(null)
    const [doctorName, setDoctorName] = useState("")
    const [patient, setPatient] = useState(null)
    const [patientNumber, setPatientNumber] = useState('')
    const [filled, setFilled] = useState(false)
    const [repetition, setRepetition] = useState("")
    const [instructions, setInstructions] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [medication, setMedication] = useState(null)
    const [medicationNumber, setMedicationNumber] = useState(null)
    const [prescriptionDate, setPrescriptionDate] = useState("")
    const [prescriptionId, setPrescriptionId] = useState("")
    // ---------------------------------
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [medications, setMedications] = useState([])

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
        let dt = Date.parse(prescriptionDate);
        return dt < Date.parse(currentDate);
    }

    let handleSubmit = () => {
        let errors = 0;
        // if (!prescriptionId || prescriptionId.length !== 12) {
        //     displayError("prescriptionId");
        //     errors += 1;
        // } else {
        //     removeError("prescriptionId");
        // }

        if (!repetition) {
            displayError("repetition");
            errors += 1;
        } else {
            removeError("repetition");
        }

        if (!doctorName) {
            displayError("doctorName");
            errors += 1;
        } else {
            removeError("doctorName");
        }

        if (!instructions) {
            displayError("instructions");
            errors += 1;
        } else {
            removeError("instructions");
        }

        if (!medicationNumber) {
            displayError("medicationNumber");
            errors += 1;
        } else {
            removeError("medicationNumber");
        }

        if (!validateDate(prescriptionDate)) {
            displayError("prescriptionDate");
            errors += 1;
        } else {
            removeError("prescriptionDate");
        }

        if (!patientNumber) {
            displayError("patientNumber");
            errors += 1;
        } else {
            removeError("patientNumber");
        }

        if (!quantity) {
            displayError("quantity");
            errors += 1;
        } else {
            removeError("quantity");
        }

        let payload = {
            // prescriptionId: Number(prescriptionId),
            prescriptionDate: prescriptionDate,
            medicationNumber: medicationNumber,
            medication: null,
            quantity: Number(quantity),
            instructions: instructions,
            repetition: repetition,
            filled: false,
            patientNumber: patientNumber,
            patient: null,
            doctorName: doctorName,
            doctor: null
        }

        console.log(JSON.stringify(payload));
        if (errors === 0) {

            fetch("https://localhost:44345/api/Prescriptions")
                .then(res => res.json())
                .then(res => {
                    let found = false;
                    res.map((item, index) => {
                        if (item.prescriptionId === prescriptionId) {
                            found = true;
                            alert("Prescription number already exists!!!");
                        }
                    })
                    if (!found) {
                        fetch('https://localhost:44345/api/Prescriptions', {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })
                            .then(res => res.json())
                            .then(res => {
                                alert("Success");
                                router.push("/Prescriptions");
                            })
                            .catch(err => {
                                console.log("Error:", err);
                                alert("Error: " + err)
                            })
                    }
                })
                .catch(err => {
                    alert("Error fetching data!!!");
                    console.log("Error:", err);
                })
        }
    }

    useEffect(() => {
        fetch('https://localhost:44345/api/Doctors')
            .then(res => res.json())
            .then(res => {
                setDoctors(res);
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })

        fetch('https://localhost:44345/api/Medications')
            .then(res => res.json())
            .then(res => {
                setMedications(res);
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })

        fetch('https://localhost:44345/api/Patients')
            .then(res => res.json())
            .then(res => {
                setPatients(res);
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })
    }, [])

    return (
        <div className="container">
            <h1>Create</h1>

            <h4>Prescription</h4>
            <hr />

            {/* <div className="form-group mt-2">
                <label className="control-label">Prescription ID</label>
                <input
                    id="prescriptionId" className="form-control"
                    type="number"
                    onChange={e => setPrescriptionId(e.target.value)}
                />
                <span id="prescriptionId_error" className="invalid-feedback">
                    Enter a valid 12 digit prescription number
                </span>
            </div> */}

            <div className="form-group mt-2">
                <label className="control-label">Prescription Date</label>
                <input
                    id="prescriptionDate" className="form-control"
                    type="datetime-local"
                    onChange={e => setPrescriptionDate(e.target.value)}
                />
                <span id="prescriptionDate_error" className="invalid-feedback">
                    Select a valid date
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Medication Number</label>
                <select
                    id="medicationNumber" className="form-control"
                    onChange={e => setMedicationNumber(e.target.value)}
                >
                    <option value="select">Select</option>
                    {medications.map((item, index) => (
                        <option value={item.medicationNumber} key={index}>{item.medicationNumber}</option>
                    ))}
                </select>
                <span id="medicationNumber_error" className="invalid-feedback">
                    Select a valid medication number
                </span>
            </div>

            <div className="form-group mt-2">
                <label asp-for="Quantity" className="control-label">Quantity (ml/g)</label>
                <input
                    id="quantity" className="form-control" type="number"
                    onChange={e => setQuantity(e.target.value)}
                />
                <span id="quantity_error" className="invalid-feedback">
                    How much of the medicine should be taken at a time
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Instructions</label>
                <input
                    id="instructions" className="form-control"
                    onChange={e => setInstructions(e.target.value)}
                />
                <span id="instructions_error" className="invalid-feedback">
                    Please enter valid instruction
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Repetition</label>
                <input
                    id="repetition" className="form-control"
                    onChange={e => setRepetition(e.target.value)}
                />
                <span id="repetition_error" className="invalid-feedback">
                    How often is the medication repeated?
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Patient</label>
                <select
                    className="form-control" id="patientNumber"
                    onChange={e => setPatientNumber(e.target.value)}
                >
                    <option value="select">Select</option>
                    {patients.map((item, index) => (
                        <option key={index} value={item.patientNumber}>{item.patientName} {item.patientSurname} - {item.patientNumber}</option>
                    ))}
                </select>
                <span id="patientNumber_error" className="invalid-feedback">
                    Select a valid patient
                </span>
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Doctor</label>
                <select
                    className="form-control" id="doctorName"
                    onChange={e => setDoctorName(e.target.value)}
                >
                    <option value="select">Select</option>
                    {doctors.map((item, index) => (
                        <option key={index} value={item.doctorNumber}>{item.doctorName} {item.doctorSurname} - {item.doctorNumber}</option>
                    ))}
                </select>
                <span id="doctorName_error" className="invalid-feedback">
                    Select a valid doctor
                </span>
            </div>

            <div className="form-group mt-2 my-4 d-flex justify-content-around">
                <Link href="/Prescriptions">
                    <a className="btn btn-warning">Back to List</a>
                </Link>
                <span className="btn btn-primary" onClick={handleSubmit}>SUBMIT</span>
            </div>
        </div>
    )
}
