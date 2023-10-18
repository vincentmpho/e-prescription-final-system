import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Edit() {
    let router = useRouter();
    const { id } = router.query;
    const [original, setOriginal] = useState(null)
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

    let dataChanged = (load) => {
        if (load.doctorName !== original.doctorName) {
            return true;
        }
        if (load.patientNumber !== original.patientNumber) {
            return true;
        }
        if (load.filled !== original.filled) {
            return true;
        }
        if (load.repetition !== original.repetition) {
            return true;
        }
        if (load.instructions !== original.instructions) {
            return true;
        }
        if (load.quantity !== original.quantity) {
            return true;
        }
        if (load.medicationNumber !== original.medicationNumber) {
            return true;
        }
        if (load.prescriptionDate !== original.prescriptionDate) {
            return true;
        }
        return false
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
        let dt = Date.parse(prescriptionDate);
        return dt < Date.parse(currentDate);
    }

    let handleSubmit = () => {
        let errors = 0;

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
            prescriptionId: Number(id),
            prescriptionDate: prescriptionDate,
            medicationNumber: medicationNumber,
            medication: null,
            quantity: Number(quantity),
            instructions: instructions,
            repetition: repetition,
            filled: filled,
            patientNumber: patientNumber,
            patient: null,
            doctorName: doctorName,
            doctor: null
        }

        // console.log(JSON.stringify(payload));
        if (errors === 0) {
            if (dataChanged(payload)) {
                if (checkValidity()) {
                    fetch(`https://localhost:44345/api/Prescriptions/${id}`, {
                        method: "put",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    })
                        .then((res) => {
                            alert("Success");
                            router.push("/Prescriptions");
                        })
                        .catch(err => {
                            console.log("Error:", err);
                            alert("Error: " + err);
                        })
                }

            } else {
                alert("No changes were made!!!")
            }

        }
    }

    let checkValidity = () => {
        fetch('https://localhost:44345/api/Prescriptions')
            .then(res => res.json())
            .then(res => {
                res.map((item, index) => {
                    if (item.patientNumber = patientNumber) {
                        if (item.medicationNumber = medicationNumber) {
                            if ((new Date().getTime() - new Date(item.prescriptionDate).getTime()) / (1000 * 60 * 60 * 24) >= 30) {
                                alert("You cannot fill the same prescription for\nthe same patient in less than 30 days!!!")
                                return false;
                            }
                        }
                    }
                })
                return true;
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
                return false;
            })
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

        fetch(`https://localhost:44345/api/Prescriptions/${id}`)
            .then(res => res.json())
            .then(res => {
                setOriginal(res)
                setDoctor(res.doctor)
                setDoctorName(res.doctorName)
                setPatient(res.patient)
                setPatientNumber(res.patientNumber)
                setFilled(res.filled)
                setRepetition(res.repetition)
                setInstructions(res.instructions)
                setQuantity(res.quantity)
                setMedication(res.medication)
                setMedicationNumber(res.medicationNumber)
                setPrescriptionDate(res.prescriptionDate)
                setPrescriptionId(res.prescriptionId)

                document.getElementById("doctorName").value = res.doctorName
                document.getElementById("patientNumber").value = res.patientNumber
                document.getElementById("filled").value = res.filled
                document.getElementById("repetition").value = res.repetition
                document.getElementById("instructions").value = res.instructions
                document.getElementById("quantity").value = res.quantity
                document.getElementById("medicationNumber").value = res.medicationNumber
                document.getElementById("prescriptionDate").value = res.prescriptionDate
                document.getElementById("prescriptionId").value = res.prescriptionId
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

            <div className="form-group mt-2">
                <label className="control-label">Prescription ID</label>
                <input
                    id="prescriptionId" className="form-control"
                    type="number"
                    disabled
                />
            </div>

            <div className="signin-form">
                <div className="form-group mt-2">
                    <label className="control-label">Prescription Date</label>
                    <input
                        id="prescriptionDate" className="form-control"
                        type="datetime-local"
                        onChange={e => setPrescriptionDate(e.target.value)}
                        disabled
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
                        disabled
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
                    <label className="control-label form-check-label">Filled</label>
                    <input
                        className="form-check-input" type="checkbox"
                        id="filled"
                        onChange={e => { console.log(e.target.checked); setFilled(e.target.checked); }}
                    />
                    <span id="filled_error" className="invalid-feedback">
                        Enter a valid selection
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
                            <option key={index} value={item.patientNumber}>{item.patientNumber}</option>
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
                    <span className="btn btn-primary" onClick={handleSubmit}>UPDATE</span>
                </div>
            </div>
        </div>
    )
}
