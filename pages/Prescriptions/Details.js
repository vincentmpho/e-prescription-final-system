import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Details() {
    let router = useRouter();
    const { id } = router.query;
    
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

    useEffect(() => {
        fetch(`https://localhost:44345/api/Prescriptions/${id}`)
            .then(res => res.json())
            .then(res => {
            
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

                // document.getElementById("doctorName").value = res.doctorName
                // document.getElementById("patientNumber").value = res.patientNumber
                // document.getElementById("filled").value = res.filled
                // document.getElementById("repetition").value = res.repetition
                // document.getElementById("instructions").value = res.instructions
                // document.getElementById("quantity").value = res.quantity
                // document.getElementById("medicationNumber").value = res.medicationNumber
                // document.getElementById("prescriptionDate").value = res.prescriptionDate
                // document.getElementById("prescriptionId").value = res.prescriptionId
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
                <input type="text" className="form-control" value={prescriptionId} />
            </div>

            <div className="signin-form">
                <div className="form-group mt-2">
                    <label className="control-label">Prescription Date</label>
                    <input type="text" className="form-control" value={prescriptionDate} />
                </div>

                <div className="form-group mt-2">
                    <label className="control-label">Medication Number</label>
                    <input type="text" className="form-control" value={medicationNumber} />
                </div>

                <div className="form-group mt-2">
                    <label asp-for="Quantity" className="control-label">Quantity (ml/g)</label>
                    <input type="text" className="form-control" value={quantity} />
                </div>

                <div className="form-group mt-2">
                    <label className="control-label">Instructions</label>
                    <input type="text" className="form-control" value={instructions} />
                </div>
                
                <div className="form-group mt-2">
                    <label className="control-label">Filled</label>
                    <input type="text" className="form-control" value={filled} />
                </div>

                <div className="form-group mt-2">
                    <label className="control-label">Repetition</label>
                    <input type="text" className="form-control" value={repetition} />
                </div>

                <div className="form-group mt-2">
                    <label className="control-label">Patient</label>
                    <input type="text" className="form-control" value={patientNumber} />
                </div>

                <div className="form-group mt-2">
                    <label className="control-label">Doctor</label>
                    <input type="text" className="form-control" value={doctorName}/>
                </div>

                <div className="form-group mt-2 my-4">
                    <Link href="/Prescriptions">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
