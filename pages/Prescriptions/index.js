import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Index() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:44345/api/Prescriptions")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setData(res);
            })
            .catch(err => {
                console.log("Error fetch data: " + err);
                alert("Error fetch data: " + err);
            })
    }, [])
    
    return (
        <div className="container">
            <h1>Prescriptions</h1>
            <p>
                <Link href="/Prescriptions/Add"><a className="btn btn-primary">Add New Prescription</a></Link>
            </p>
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
                                {item.filled ? "true" : "false"}
                            </td>
                            <td>
                                {item.patientNumber}
                            </td>
                            <td>
                                {item.doctorName}
                            </td>
                            
                            <td className="d-flex flex-column justify-content-center">
                                {!item.filled && 
                                <Link href={`/Prescriptions/Edit/?id=${item.prescriptionId}`}>
                                    <a className="btn btn-primary">Edit</a>
                                </Link>}

                                <Link href={`/Prescriptions/Details/?id=${item.prescriptionId}`}>
                                    <a className="btn btn-secondary my-2">Details</a>
                                </Link>

                                <Link href={`/Prescriptions/Delete/?id=${item.prescriptionId}`}>
                                    <a className="btn btn-warning">Delete</a>
                                </Link>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>

        </div>
    )
}
