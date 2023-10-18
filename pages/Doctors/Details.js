import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Details() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch(`https://localhost:44345/api/Doctors/${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res);
            })
            .catch(err => {
                alert(err);
            })
    }, [])
    
    if(!data) {
        return(
            <div className="container">Loading</div>
        )
    }

    return (
        <div className="container">
            <h1>Details</h1>
            <div>
                <h4>Doctor</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-2">
                        Name
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorName}
                    </dd>
                    <dt className="col-sm-2">
                        Surname
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorSurname}
                    </dd>
                    <dt className="col-sm-2">
                        Contact
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorContact}
                    </dd>
                    <dt className="col-sm-2">
                        Email
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorEmail}
                    </dd>
                    <dt className="col-sm-2">
                        Qualification
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorQualification}
                    </dd>
                    <dt className="col-sm-2">
                        PracticeNumber
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorPracticeNumber}
                    </dd>
                    <dt className="col-sm-2">
                        Health Council Registration Number
                    </dt>
                    <dd className="col-sm-10">
                        {data.doctorHCRN}
                    </dd>
                </dl>
                <div>
                    <Link href="/Doctors"><a className="btn btn-warning">BACK</a></Link>
                </div>
            </div>
        </div>
    )
}
