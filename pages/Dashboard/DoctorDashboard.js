import React, { useEffect, useState } from 'react';
import { getUser } from '../User/data';

import { useRouter } from 'next/router';

export default function DoctorDashboard() {
    let router = useRouter();
    const [doctor, setDoctor] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [screen, setScreen] = useState("");
    

    useEffect(() => {
        setCurrentUser(JSON.parse(window.localStorage.getItem('user')));
        console.log("user:", getUser());
        fetch("https://localhost:44345/api/Doctors")
            .then(res => res.json())
            .then(res => {
                let found = false;
                res.map((item, index) => {
                    if (window.localStorage.getItem('user').email === item.doctorEmail) {
                        found = true;
                        setDoctor(item);
                    }
                })
                if (!found) {
                    alert("Please finish registration before you continue");
                    router.push("/Dashboard/AddDoctor");
                } else {
                    router.push("/");
                }
            })
    }, [])
    return (
        <div>

        </div>
    )
}
