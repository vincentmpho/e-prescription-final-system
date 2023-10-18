import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Delete() {

    let router = useRouter();
    let { id } = router.query;
    
    const [patientNumber, setPatientNumber] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientSurname, setPatientSurname] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [patientContact, setPatientContact] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientDOB, setPatientDOB] = useState("");
    
    let deletePatient = () => {
        fetch(`https://localhost:44345/api/Patients/${id}`, {
            method: "DELETE",
        })
        .then(res => {
            alert("Success");
            router.push("/Patients");
        })
        .catch(err => {
            console.log("Error deleting patient record: " + err);
            alert("Error deleting patient record: " + err);
        })
    }
    
    useEffect(() => {
        fetch(`https://localhost:44345/api/Patients/${id}`)
            .then(res => res.json())
            .then(res => {
                setPatientNumber(res.patientNumber);
                setPatientName(res.patientName);
                setPatientSurname(res.patientSurname);
                setPatientAddress(res.patientAddress);
                setPatientContact(res.patientContact);
                setPatientEmail(res.patientEmail);
                setPatientDOB(res.patientDOB);
            })
            .catch(err => {
                console.log("Error:", err);
                alert("Error fetching data!!!")
            })
    }, [])
    
    
    return (
        <div className="container">
            <h3>Are you sure you want to delete this?</h3>
            <h4>Patient</h4>
            <hr />
            <dl className="row">
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Number</dt>
                    <dd className="input-group-text col-sm-6">{patientNumber}</dd>
                </p>
                
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Name</dt>
                    <dd className="input-group-text col-sm-6">{patientName}</dd>
                </p>
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Surname</dt>
                    <dd className="input-group-text col-sm-6">{patientSurname}</dd>
                </p>
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Address</dt>
                    <dd className="input-group-text col-sm-6">{patientAddress}</dd>
                </p>
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Contact</dt>
                    <dd className="input-group-text col-sm-6">{patientContact}</dd>
                </p>
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Email</dt>
                    <dd className="input-group-text col-sm-6">{patientEmail}</dd>
                </p>
                <p className="row d-flex justify-content-between align-items-center">
                    <dt className="col-sm-4">Patient Date of Birth</dt>
                    <dd className="input-group-text col-sm-6">{patientDOB}</dd>
                </p>
            </dl>
            <div className="container d-flex align-items-center justify-content-around">
                <span className="btn btn-danger" onClick={deletePatient}>DELETE</span>
                <Link href="/Patients/">
                    <a className="btn btn-primary">Back</a>
                </Link>
            </div>
        </div>
    )
}
