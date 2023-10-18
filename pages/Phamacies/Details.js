import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Details() {
    let router = useRouter();
    let num = router.query.id;
    const [PhamacyNumber, setPhamacyNumber] = useState("");
    const [PhamacyName, setPhamacyName] = useState("");
    const [PhamacyContact, setPhamacyContact] = useState(null);
    const [PhamacyEmail, setPhamacyEmail] = useState(null);
    const [PhamacyLicenceNumber, setPhamacyLicenceNumber] = useState(null);


    useEffect(() => {
        fetch(`https://localhost:44345/api/Phamacies/${num}`)
            .then(res => res.json())
            .then(res => {
                setPhamacyNumber(res.phamacyNumber);
                setPhamacyName(res.phamacyName);
                setPhamacyContact(res.phamacyContact);
                setPhamacyEmail(res.phamacyEmail);
                setPhamacyLicenceNumber(res.phamacyLicenceNumber);

                // document.getElementById("number").disabled = true;
                // document.getElementById("name").disabled = true;
                // document.getElementById("email").disabled = true;
                // document.getElementById("contact").disabled = true;
                // document.getElementById("licence").disabled = true;

                // document.getElementById("number").value = PhamacyNumber;
                // document.getElementById("name").value = PhamacyName;
                // document.getElementById("email").value = PhamacyEmail;
                // document.getElementById("contact").value = PhamacyContact;
                // document.getElementById("licence").value = PhamacyLicenceNumber;


            })
    }, [])
    return (
        <div className="container">

            <h1>Phamacy Details</h1>
            <hr />
            <div>
                <div className="row">
                    <label className="fw-bolder">
                        Phamacy Number
                    </label>
                    <p>
                        {PhamacyNumber}
                    </p>
                </div>
                
                <div className="row">
                    <label className="fw-bolder">
                        Phamacy Name
                    </label>
                    <p>
                        {PhamacyName}
                    </p>
                </div>

                <div className="row">
                    <label className="fw-bolder">
                        Phamacy Contact
                    </label>
                    <p>
                        {PhamacyContact}
                    </p>
                </div>

                <div className="row">
                    <label className="fw-bolder">
                        PhamacyName
                    </label>
                    <p>
                        {PhamacyName}
                    </p>
                </div>

                <div className="row">
                    <label className="fw-bolder">
                        Phamacy Email
                    </label>
                    <p>
                        {PhamacyEmail}
                    </p>
                </div>

                <div className="row">
                    <label className="fw-bolder">
                        Phamacy LicenceNumber
                    </label>
                    <p>
                        {PhamacyLicenceNumber}
                    </p>
                </div>
            </div>
            <Link href="/Phamacies"><a className="btn btn-primary">Back</a></Link>
            
        </div>
    )
}
