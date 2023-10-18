import React, { useEffect, useState }  from 'react';
import Link from 'next/link';

export default function Index() {
    const [phamacies, setPhamacies] = useState([])
    
    useEffect(() => {
        fetch('https://localhost:44345/api/Phamacies')
        .then(res => res.json())
        .then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            setPhamacies(res);
        })
        .catch(err => {
            console.log("Error:", err);
            alert('Error:', err);
        })
    }, [])
    
    return (
        <div className="container">
            <h1>Phamacies</h1>
            <p>
                <Link href="/Phamacies/Add"><a className="btn btn-primary">Create New</a></Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            PhamacyName
                        </th>
                        <th>
                            PhamacyContact
                        </th>
                        <th>
                            PhamacyEmail
                        </th>
                        <th>
                            PhamacyLicenceNumber
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {phamacies.map((item, index) => (
                        <tr key={index} className="align-middle">
                            <td>
                                {item.phamacyName}
                            </td>
                            <td>
                                {item.phamacyContact}
                            </td>
                            <td>
                                {item.phamacyEmail}
                            </td>
                            <td>
                                {item.phamacyLicenceNumber}
                            </td>
                            <td className="d-flex align-items-center justify-content-evenly flex-wrap">
                                <Link href={`/Phamacies/Edit?id=${item.phamacyNumber}`}><a className="btn btn-secondary">Edit</a></Link>
                                <Link href={`/Phamacies/Details?id=${item.phamacyNumber}`}><a className="btn btn-primary">Details</a></Link>
                                <Link href={`/Phamacies/Delete?id=${item.phamacyNumber}`}><a className="btn btn-danger">Delete</a></Link>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}
