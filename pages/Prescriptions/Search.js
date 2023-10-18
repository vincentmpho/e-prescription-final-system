import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Search() {
    const [data, setData] = useState([])
    
    let onChange = (val) => {
        console.log(val)
        let allRows = document.querySelectorAll(".data-row");
        allRows.forEach(item => {
            let v = item.getElementsByClassName("data-row-patient")[0].innerHTML;
            if (v.includes(val)) {
                item.style.display = "table-row";
            } else {
                item.style.display = "none";
            }
        })
    }

    useEffect(() => {
        fetch("https://localhost:44345/api/Prescriptions")
            .then(res => res.json())
            .then(res => {
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
            <div className="container py-2">
                <input type="text" id="search_value" onChange={e => onChange(e.target.value)} placeholder="Search..." />
            </div>
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
                        <tr key={index} className="data-row">
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
                            <td className="data-row-patient">
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
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>

        </div>
    )
}
