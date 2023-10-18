import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  let router = useRouter();
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')));
    console.log('====================================');
    console.log("index user", JSON.parse(window.localStorage.getItem('user')));

    fetch("https://localhost:44345/api/Prescriptions")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setData(res);
      })
      .catch(err => {
        console.log("Error fetch data: " + err);
        alert("Error fetch data: " + err);
      })
      
    fetch("https://localhost:44345/api/Doctors")
      .then(res2 => res2.json())
      .then(res2 => {
        setData2(res2);
        res2.map((item, index) => {
          if (item.doctorEmail === JSON.parse(window.localStorage.getItem('user')).email) {
          setDoc(item);
          console.log("current doctor:", item)
        }
        })
        
      })
      .catch(err => {
        console.log("Error fetch data: " + err);
        alert("Error fetch data: " + err);
      })
      
    console.log('====================================');
  }, [])

  if (user && user.type.toLowerCase() === "patient") {
    router.push("/Dashboard/PatientDashboard")
  }
  
  // if (!JSON.parse(window.localStorage.getItem('user'))) {
  //   router.push("/Auth/Register")
  // }

  return (
    <div className="container">
      <Header user={user} />
      <div className="body_main">
        <div className={styles.bg_img}>
          <p className={styles.title}>
            <br /> <br />
            Health Care Services <br />
            <font size="5px"> We Care About Your Health </font>
          </p>
        </div>
      </div>

      {user && user.type.toLowerCase() === "doctor" && doc &&
        <div>
          <h2>Prescriptions I have filled</h2>
          <table className="table">
            <thead>
              <tr>
                <th>
                  PrescriptionDate
                </th>
                <th>
                  MedicationNumber
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Instructions
                </th>
                <th>
                  Repetition
                </th>
                <th>
                  Filled
                </th>
                <th>
                  PatientNumber
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                if(doc && (doc.doctorNumber === item.doctorName))
              return (
                <tr key={index} className="align-middle">
                  <td>
                    {item.prescriptionDate}
                  </td>
                  <td>
                    {item.medicationNumber}
                  </td>
                  <td>
                    {item.quantity}
                  </td>
                  <td>
                    {item.instructions}
                  </td>
                  <td>
                    {item.repetition}
                  </td>
                  <td>
                    {item.filled ? "YES" : "NO"}
                  </td>
                  <td>
                    {item.patientNumber}
                  </td>
                </tr>
              )})

              }
            </tbody>
          </table>
        </div>
      }
    </div>

  )
}
