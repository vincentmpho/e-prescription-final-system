import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Details() {
    let router = useRouter();
    const { id } = router.query;


    useEffect(() => {
        fetch(`https://localhost:44345/api/Medications/${id}`)
            .then(res => res.json())
            .then(res => {

                document.getElementById("medicationNumber").value = res.medicationNumber
                document.getElementById("dosage").value = res.dosage
                document.getElementById("activeEngredients").value = res.activeEngredients
                document.getElementById("schedule").value = res.schedule
                document.getElementById("strengths").value = res.strengths
                document.getElementById("contraIndicationR").value = res.contraIndicationR
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })
    }, [])
    return (
        <div className="container">
            <h1>Medication Details</h1>
            <hr />
            <div className="signin-form">
                <div className="form-group">
                    <label className="control-label">Medication Number</label>
                    <input
                        id="medicationNumber" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Dosage</label>
                    <input
                        id="dosage" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label asp-for="ActiveEngredients" className="control-label">Active Engredients</label>
                    <input
                        id="activeEngredients" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Strengths</label>
                    <input
                        id="strengths" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Schedule</label>
                    <input
                        id="schedule" className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Contra-indications</label>
                    <input
                        id="contraIndicationR" className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group mt-2 my-4 d-flex justify-content-around">
                    <Link href="/Medications">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}
