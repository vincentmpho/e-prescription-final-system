import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Delete() {
    let router = useRouter();
    const { id } = router.query;

    let handleSubmit = () => {
        fetch(`https://localhost:44345/api/FirstVisits/${id}`, {
            method: "delete"})
            .then(res => {
                alert("Record deleted successfully")
                router.push("/FirstVisits")
            })
            .catch(err => {
                console.log("Error:", err)
                alert("Error:" + err)
            })
    }

    useEffect(() => {
        fetch(`https://localhost:44345/api/FirstVisits/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                document.getElementById("chronicHistory").value = res.chronicHistory
                document.getElementById("doctorNumber").value = res.doctorNumber
                document.getElementById("patientNumber").value = res.knownAllegies.split(";")[2]
                document.getElementById("currentChronicMedication").value = res.currentChronicMedication
                document.getElementById("knownAllegies").value = res.knownAllegies.split(";")[0]
                document.getElementById("visitDate").value = res.knownAllegies.split(";")[1]
            })
            .catch(err => {
                console.log("Error:" + err);
                alert("Could not fetch data from api:" + err);
            })
    }, [])

    return (
        <div className="container">
            <h2>Delete visit details?</h2>
            <hr />

            <div className="form-group">
                <label className="control-label">Chronic History</label>
                <input
                    id="chronicHistory" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Doctor</label>
                <input
                    className="form-control" id="doctorNumber"
                    disabled
                />
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Patient</label>
                <input
                    className="form-control" id="patientNumber"
                    disabled
                />
            </div>

            <div className="form-group">
                <label className="control-label">Current Chronic Medication</label>
                <input
                    id="currentChronicMedication" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group">
                <label className="control-label">Known Allegies</label>
                <input
                    id="knownAllegies" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group mt-2">
                <label className="control-label">Visit Date</label>
                <input
                    id="visitDate" className="form-control"
                    disabled
                />
            </div>

            <div className="form-group mt-2 my-4 d-flex justify-content-around">
                <Link href="/FirstVisits">
                    <a className="btn btn-warning">Back to List</a>
                </Link>
                <span className="btn btn-danger" onClick={handleSubmit}>DELETE</span>
            </div>
        </div>
    )
}