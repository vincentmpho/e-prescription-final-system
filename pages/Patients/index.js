import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Index() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:44345/api/Patients")
        .then(res => res.json())
        .then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            setData(res);
        })
        .catch(err => {
            console.log("Error fetching data:" + err)
            alert("Error fetching data:" + err);
        })
    }, [])
    
    if(!data) {
        return(
            <div className="container d-flex flex-grow-1 align-items-center justify-content-center">Loading...</div>
        )
    }
    return (
        <div className="container">
            <h1>Patients</h1>
            <p>
                <Link href="/Patients/Add"><a className="btn btn-primary">Create New</a></Link>
            </p>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Surname
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Contact
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            PatientDOB
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="align-middle">
                            <td>
                                {item.patientName}
                            </td>
                            <td>
                                {item.patientSurname}
                            </td>
                            <td>
                                {item.patientAddress}
                            </td>
                            <td>
                                {item.patientContact}
                            </td>
                            <td>
                                {item.patientEmail}
                            </td>
                            <td>
                                {item.patientDOB}
                            </td>
                            <td className="d-flex align-items-center justify-content-evenly flex-wrap">
                                <Link
                                    href={`/Patients/Edit?id=${item.patientNumber}`}
                                >
                                    <a className="btn btn-secondary m-2">Edit</a>
                                </Link>
                                <Link
                                    href={`/Patients/Details?id=${item.patientNumber}`}
                                >
                                    <a className="btn btn-primary">Details</a>
                                </Link>
                                <Link
                                    href={`/Patients/Delete?id=${item.patientNumber}`}
                                >
                                    <a className="btn btn-danger">Delete</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}
