import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Details() {
    let router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        fetch(`https://localhost:44345/api/Phamacists/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                document.getElementById("number").value = res.phamacistNumber;
                document.getElementById("name").value = res.phamacistName;
                document.getElementById("surname").value = res.phamacistSurname;
                document.getElementById("contact").value = res.phamacistContact;
                document.getElementById("email").value = res.phamacistEmail;
                document.getElementById("registrationNumber").value = res.phamacistRegistrationNumber;
                document.getElementById("phamacyNumber").value = res.phamacyNumber;
            })
            .catch(err => {
                console.log("Error getting data from api:", err);
                alert(err)
            })
    }, [])

    return (
        <div className="container">

            <h1 className="my-2">Details</h1>

            <div className="signin-form">

                <div className="form-group">
                    <label className="control-label">Phamacist Number</label>
                    <input
                        id="number" className="form-control"
                        type="number"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Name</label>
                    <input
                        id="name" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Surname</label>
                    <input
                        id="surname" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Contact</label>
                    <input
                        id="contact" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacst Email</label>
                    <input
                        id="email" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Registration Number</label>
                    <input
                        id="registrationNumber" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacy</label>
                    <input
                        id="phamacyNumber" className="form-control"
                        disabled
                    />
                </div>
            </div>

            <div className="form-group">
                <Link href="/Phamacists">
                    <a className="btn btn-secondary">Back to List</a>
                </Link>
            </div>
        </div>
    )
}
