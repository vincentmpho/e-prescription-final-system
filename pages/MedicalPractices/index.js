import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Index() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:44345/api/MedicalPractices")
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

            <h1>Medical Practices</h1>

            <p>
                <Link href="/MedicalPractices/Add"><a className="btn btn-primary">Add New Medical Practice</a></Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Contact
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Email
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="align-middle">
                            <td>
                                {item.contact}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.address}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td className="d-flex flex-column justify-content-center">
                                <Link href={`/MedicalPractices/Edit/?id=${item.practiceNumber}`}>
                                    <a className="btn btn-primary">Edit</a>
                                </Link>

                                <Link href={`/MedicalPractices/Details/?id=${item.practiceNumber}`}>
                                    <a className="btn btn-secondary my-2">Details</a>
                                </Link>

                                <Link href={`/MedicalPractices/Delete/?id=${item.practiceNumber}`}>
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
