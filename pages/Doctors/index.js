import React, { useEffect, useState } from "react";
import Link from 'next/link';

export default function Index() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch("https://localhost:44345/api/Doctors")
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => {
            alert("Error fetching data from api: " + err);
        })
    }, [])
    return (
        <div className="container">
            <h1>Doctors</h1>

            <p>
                <Link href="/Doctors/Add"><a className="btn btn-primary">Create New</a></Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Qualification</th>
                        <th>PracticeNumber</th>
                        <th>HCRN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="align-middle">
                            <td>{item.doctorName}</td>
                            <td>{item.doctorSurname}</td>
                            <td>{item.doctorContact}</td>
                            <td>{item.doctorEmail}</td>
                            <td>{item.doctorQualification}</td>
                            <td>{item.doctorPracticeNumber}</td>
                            <td>{item.doctorHCRN}</td>
                            <td className="d-flex flex-column justify-content-center">
                                <Link href={`/Doctors/Edit?id=${item.doctorNumber}`}>
                                    <a className="btn btn-primary">Edit</a>
                                </Link>
                                
                                <Link href={`/Doctors/Details?id=${item.doctorNumber}`}>
                                    <a className="btn btn-secondary my-2">Details</a>
                                </Link>
                                
                                <Link href={`/Doctors/Delete?id=${item.doctorNumber}`}>
                                    <a className="btn btn-warning">Delete</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
