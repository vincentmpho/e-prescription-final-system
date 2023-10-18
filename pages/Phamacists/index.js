import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Index() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:44345/api/Phamacists")
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
            <h1>Phamacists</h1>
            <p>
                <Link href="/Phamacists/Add"><a className="btn btn-primary">Add New Phamacist</a></Link>
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
                            Contact
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            RegistrationNumber
                        </th>
                        <th>
                            PhamacyNumber
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="align-middle">
                            <td>
                                {item.phamacistName}
                            </td>
                            <td>
                                {item.phamacistSurname}
                            </td>
                            <td>
                                {item.phamacistContact}
                            </td>
                            <td>
                                {item.phamacistEmail}
                            </td>
                            <td>
                                {item.phamacistRegistrationNumber}
                            </td>
                            <td>
                                {item.phamacyNumber}
                            </td>
                            <td className="d-flex flex-column justify-content-center">
                                <Link href={`/Phamacists/Edit/?id=${item.phamacistNumber}`}>
                                    <a className="btn btn-primary">Edit</a>
                                </Link>

                                <Link href={`/Phamacists/Details/?id=${item.phamacistNumber}`}>
                                    <a className="btn btn-secondary my-2">Details</a>
                                </Link>

                                <Link href={`/Phamacists/Delete/?id=${item.phamacistNumber}`}>
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
