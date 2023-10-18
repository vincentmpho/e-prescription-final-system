import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Edit() {
    let router = useRouter();
    const { id } = router.query;
    const [original, setOriginal] = useState(null)
    
    const [medicationNumber, setMedicationNumber] = useState(null);
    const [dosage, setDosage] = useState(null);
    const [activeEngredients, setActiveEngredients] = useState(null);
    const [strengths, setStrengths] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [contraIndicationR, setContraIndicationR] = useState(null);

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
    
    let dataChanged = (load) => {
        if (load.medicationNumber !== original.medicationNumber) {
            return true;
        }
        if (load.dosage !== original.dosage) {
            return true;
        }
        if (load.activeEngredients !== original.activeEngredients) {
            return true;
        }
        if (load.strengths !== original.strengths) {
            return true;
        }
        if (load.schedule !== original.schedule) {
            return true;
        }
        if (load.contraIndicationR !== original.contraIndicationR) {
            return true;
        }
        return false
    }

    let handleSubmit = () => {
        let errors = 0;
        if (!medicationNumber || medicationNumber.length !== 12) {
            displayError("medicationNumber");
            errors += 1;
        } else {
            removeError("medicationNumber");
        }

        if (!dosage) {
            displayError("dosage");
            errors += 1;
        } else {
            removeError("dosage");
        }

        if (!activeEngredients) {
            displayError("activeEngredients");
            errors += 1;
        } else {
            removeError("activeEngredients");
        }

        if (!strengths) {
            displayError("strengths");
            errors += 1;
        } else {
            removeError("strengths");
        }

        if (!schedule) {
            displayError("schedule");
            errors += 1;
        } else {
            removeError("schedule");
        }

        if (!contraIndicationR) {
            displayError("contraIndicationR");
            errors += 1;
        } else {
            removeError("contraIndicationR");
        }

        let payload = {
            medicationNumber: medicationNumber,
            dosage: dosage,
            activeEngredients: activeEngredients,
            strengths: strengths,
            schedule: schedule,
            contraIndicationR: contraIndicationR
        }

        // console.log(JSON.stringify(payload));
        if (errors === 0) {
            if(dataChanged(payload)) {
                fetch(`https://localhost:44345/api/Medications/${id}`, {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
                    .then(() => {
                        alert("Success");
                        router.push("/Medications");
                    })
                    .catch(err => {
                        console.log("Error:", err);
                        alert("Error: " + err)
                    })
            } else {
                alert("No changes were made!!!")
            }
            
        }
    }
    
    useEffect(() => {
        fetch(`https://localhost:44345/api/Medications/${id}`)
            .then(res => res.json())
            .then(res => {
                setOriginal(res)
                
                setMedicationNumber(res.medicationNumber);
                setDosage(res.dosage);
                setActiveEngredients(res.activeEngredients);
                setSchedule(res.schedule);
                setStrengths(res.strengths);
                setContraIndicationR(res.contraIndicationR);

                document.getElementById("medicationNumber").value = res.medicationNumber
                document.getElementById("dosage").value = res.dosage
                document.getElementById("activeEngredients").value = res.activeEngredients
                document.getElementById("schedule").value = res.schedule
                document.getElementById("strengths").value = res.strengths
                document.getElementById("contraIndicationR").value = res.contraIndicationR
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })
    }, [])
    return (
        <div className="container">
            <h1>Modify Medication</h1>
            <hr />
            <div className="signin-form">
                <div className="form-group">
                    <label className="control-label">Medication Number</label>
                    <input
                        id="medicationNumber" className="form-control"
                        type="number"
                        disabled
                    />
                    <span id="medicationNumber_error" className="invalid-feedback">
                        Enter a valid 12 digit number
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Dosage</label>
                    <input
                        id="dosage" className="form-control"
                        onChange={e => setDosage(e.target.value)}
                    />
                    <span id="dosage_error" className="invalid-feedback">
                        Enter a valid dosage
                    </span>
                </div>

                <div className="form-group">
                    <label asp-for="ActiveEngredients" className="control-label">Active Engredients</label>
                    <input
                        id="activeEngredients" className="form-control"
                        onChange={e => setActiveEngredients(e.target.value)}
                    />
                    <span id="activeEngredients_error" className="invalid-feedback">
                        Enter valid active ingredients
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Strengths</label>
                    <input
                        id="strengths" className="form-control"
                        onChange={e => setStrengths(e.target.value)}
                    />
                    <span id="strengths_error" className="invalid-feedback">
                        Enter the strengths of the medication
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Schedule</label>
                    <input
                        id="schedule" className="form-control"
                        onChange={e => setSchedule(e.target.value)}
                    />
                    <span id="schedule_error" className="invalid-feedback">
                        Enter a valid schedule
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Contra-indications</label>
                    <input
                        id="contraIndicationR" className="form-control"
                        onChange={e => setContraIndicationR(e.target.value)}
                    />
                    <span id="contraIndicationR_error" className="invalid-feedback">
                        Enter a valid value
                    </span>
                </div>
                <div className="form-group mt-2 my-4 d-flex justify-content-around">
                    <Link href="/Medications">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                    <span className="btn btn-primary" onClick={handleSubmit}>Update</span>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}
