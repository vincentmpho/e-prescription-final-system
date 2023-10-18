import React, { useEffect , useState} from 'react';
import Link from 'next/link';

export default function Index() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://localhost:44345/api/Medications")
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

            <h1>Medications</h1>

            <p>
                <Link href="/Medications/Add"><a className="btn btn-primary">Add New Medication</a></Link>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Dosage
                        </th>
                        <th>
                            Active Engredients
                        </th>
                        <th>
                            Strengths
                        </th>
                        <th>
                            Schedule
                        </th>
                        <th>
                            ContraIndicationR
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="align-middle">
                            <td>
                                {item.dosage}
                            </td>
                            <td>
                                {item.activeEngredients}
                            </td>
                            <td>
                                {item.strengths}
                            </td>
                            <td>
                                {item.schedule}
                            </td>
                            <td>
                                {item.contraIndicationR}
                            </td>
                            <td className="d-flex flex-column justify-content-center">
                                <Link href={`/Medications/Edit/?id=${item.medicationNumber}`}>
                                    <a className="btn btn-primary">Edit</a>
                                </Link>

                                <Link href={`/Medications/Details/?id=${item.medicationNumber}`}>
                                    <a className="btn btn-secondary my-2">Details</a>
                                </Link>

                                <Link href={`/Medications/Delete/?id=${item.medicationNumber}`}>
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
