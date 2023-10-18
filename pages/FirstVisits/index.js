import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Index() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:44345/api/FirstVisits")
            .then(res => res.json())
            .then(res => {
                setData(res);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                alert("Error fetching data: " + err);
            })
    }, [])
    return (
        <div className="container">
            <h1>First Visits</h1>
            <p className="mx-2">
                <Link href="/FirstVisits/Add"><a className="btn btn-primary">Add New Visit</a></Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Chronic History
                        </th>
                        <th>
                            Current Chronic Medication
                        </th>
                        <th>
                            Known Allegies
                        </th>
                        <th>
                            Doctor
                        </th>
                        <th>
                            Patient
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.chronicHistory}
                            </td>
                            <td>
                                {item.currentChronicMedication}
                            </td>
                            <td>
                                {item.knownAllegies.split(";")[0]}
                            </td>
                            <td>
                                {item.doctorNumber}
                            </td>
                            <td>
                                {item.knownAllegies.split(";")[2]}
                            </td>
                            <td className="d-flex flex-column justify-content-center">
                                <Link href={`/FirstVisits/Edit/?id=${item.visitId}`}>
                                    <a className="btn btn-primary">Edit</a>
                                </Link>

                                <Link href={`/FirstVisits/Details/?id=${item.visitId}`}>
                                    <a className="btn btn-secondary my-2">Details</a>
                                </Link>

                                <Link href={`/FirstVisits/Delete/?id=${item.visitId}`}>
                                    <a className="btn btn-warning">Delete</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
