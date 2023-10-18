import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Edit() {
    const router = useRouter();
    const { id } = router.query;
    
    let deleteRecord = () => {
        fetch(`https://localhost:44345/api/MedicalPractices/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(res => {
                alert("success");
                router.push("/MedicalPractices")
            })
            .catch(err => {
                alert("error:" + err);
            })
    }

    useEffect(() => {
        fetch(`https://localhost:44345/api/MedicalPractices/${id}`)
            .then(res => res.json())
            .then(res => {
                document.getElementById("practiceNumber").value = res.practiceNumber;
                document.getElementById("name").value = res.name;
                document.getElementById("email").value = res.email;
                document.getElementById("contact").value = res.contact;
                document.getElementById("address").value = res.address;
            })
            .catch(err => {
                console.log("Error:", err);
                alert("Error: " + err)
            })
    }, [])

    return (
        <div className="container">
            <h1 className="my-3">Are you sure you want to delete this Medical Practice?</h1>
            <hr />

            <div className="form-group">
                <label className="control-label">Practice Number</label>
                <input
                    id="practiceNumber" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group">
                <label className="control-label">Contact</label>
                <input
                    id="contact" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group">
                <label className="control-label">Medical Practice Name</label>
                <input
                    id="name" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group">
                <label asp-for="Address" className="control-label">Address</label>
                <input
                    id="address" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group">
                <label className="control-label">Email</label>
                <input
                    id="email" className="form-control"
                    disabled
                />
            </div>
            <div className="form-group mt-2 my-4 d-flex justify-content-around">
                <Link href="/MedicalPractices">
                    <a className="btn btn-warning">Back to List</a>
                </Link>
                
                <span className="btn btn-danger" onClick={deleteRecord}>DELETE</span>
            </div>
        </div>
    )
}
