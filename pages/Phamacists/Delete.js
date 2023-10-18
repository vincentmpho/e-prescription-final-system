import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Delete() {
    const [item, setItem] = useState(null)
    let router = useRouter();
    const { id } = router.query;

    let deleteItem = () => {
        fetch(`https://localhost:44345/api/Phamacists/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(res => {
                alert("success");
                router.push("/Phamacists")
            })
            .catch(err => {
                alert(err);
            })
    }

    useEffect(() => {
        fetch(`https://localhost:44345/api/Phamacists/${id}`)
            .then(res => res.json())
            .then(res => {
                setItem(res);
            })
            .catch(err => {
                console.log("Error:", err);
                alert("Error:", err);
            })
    }, [])

    if (!item) {
        return (
            <div className="container">
                Loading...
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Are you sure you want to delete?</h1>

            <h4>Phamacist</h4>
            <hr />
            <div className="signin-form">
                <div className="form-group">
                    <label className="control-label">Phamacist Number</label>
                    <span
                        className="form-control">{item.phamacistNumber}</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Name</label>
                    <span
                        className="form-control">{item.phamacistName}</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Surname</label>
                    <span className="form-control">{item.phamacistSurname}</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Contact</label>
                    <span className="form-control">{item.phamacistContact}</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Email</label>
                    <span className="form-control">{item.phamacistEmail}</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Registration Number</label>
                    <span className="form-control">{item.phamacistRegistrationNumber}</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacy Number</label>
                    <span className="form-control">{item.phamacyNumber}</span>
                </div>

                <div className="form-group mt-2 my-4 d-flex justify-content-around">
                    <Link href="/Phamacists">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                    <span className="btn btn-danger" onClick={deleteItem}>Delete</span>
                </div>
            </div>
        </div>
    )
}
