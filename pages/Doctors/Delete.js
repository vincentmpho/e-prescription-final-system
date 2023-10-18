import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Delete() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);

    let handleSubmit = () => {
        fetch(`https://localhost:44345/api/Doctors/${id}`, {
            method: 'delete'
        })
            .then(res => {
                alert("success");
                router.push("/Doctors")
            })
            .catch(err => {
                alert(err);
            })
    }

    useEffect(() => {
        fetch(`https://localhost:44345/api/Doctors/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setData(res);
            })
            .catch(err => {
                alert(err);
            })
    }, [])

    if (!data) {
        return (
            <div className="container">Loading</div>
        )
    }
    return (
        <div className="container">
            <h3>Are you sure you want to delete this?</h3>
            <div>
                <h4>Doctor</h4>
                <hr />
                <dl className="row">
                    <div className="d-flex">
                        <dt className="col">
                            Number
                        </dt>
                        <dd className="col">
                            {data.doctorNumber}
                        </dd>
                    </div>
                
                    <div className="d-flex">
                        <dt className="col">
                            Name
                        </dt>
                        <dd className="col">
                            {data.doctorName}
                        </dd>
                    </div>

                    <div className="d-flex">
                        <dt className="col">
                            Surname
                        </dt>
                        <dd className="col">
                            {data.doctorSurname}
                        </dd>
                    </div>

                    <div className="d-flex">
                        <dt className="col">
                            Contact
                        </dt>
                        <dd className="col">
                            {data.doctorContact}
                        </dd>
                    </div>


                    <div className="d-flex">
                        <dt className="col">
                            Email
                        </dt>
                        <dd className="col">
                            {data.doctorEmail}
                        </dd>
                    </div>


                    <div className="d-flex">
                        <dt className="col">
                            Qualification
                        </dt>
                        <dd className="col">
                            {data.doctorQualification}
                        </dd>
                    </div>

                    <div className="d-flex">
                        <dt className="col">
                            PracticeNumber
                        </dt>
                        <dd className="col">
                            {data.doctorPracticeNumber}
                        </dd>
                    </div>

                    <div className="d-flex">
                        <dt className="col">
                            Health Council Registration Number
                        </dt>
                        <dd className="col">
                            {data.doctorHCRN}
                        </dd>
                    </div>

                </dl>
                <button className="btn btn-danger" onClick={handleSubmit}>Delete</button>
            </div>
        </div>
    )
}
