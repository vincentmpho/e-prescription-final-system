import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
    let router = useRouter();
    useEffect(() => {
        window.localStorage.setItem('user', null);
        window.localStorage.removeItem('user');
        alert("Logged out");
        router.push('/Auth/Login');
    }, [])

    return (
        <div>

        </div>
    )
}
