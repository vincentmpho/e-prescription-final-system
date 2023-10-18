import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Delete() {
    let router = useRouter();
    let num = router.query.id;
    const [PhamacyNumber, setPhamacyNumber] = useState("");
    const [PhamacyName, setPhamacyName] = useState("");
    const [PhamacyContact, setPhamacyContact] = useState("");
    const [PhamacyEmail, setPhamacyEmail] = useState("");
    const [PhamacyLicenceNumber, setPhamacyLicenceNumber] = useState("");

    let handleData = () => {
        fetch(`https://localhost:44345/api/Phamacies/${num}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(res => {
                alert("success");
                router.push("/Phamacies")
            })
            .catch(err => {
                alert(err);
            })
    }

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

            <h1>Delete?</h1>

            <h3>Are you sure you want to delete this?</h3>
            <div>
                <h4>Phamacy</h4>
                <hr />
                
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
            <div className="form-group mt-2 my-4 d-flex justify-content-around">
                <Link href="/Doctors">
                    <a className="btn btn-warning">Back to List</a>
                </Link>
            <span className="btn btn-danger" onClick={handleData}>DELETE</span>
            </div>
        </div>
    )
}
