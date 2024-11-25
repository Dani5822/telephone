import { useEffect, useState } from "react";
import { Telephone } from "../telephone";
import Kartya from "./kartya";
import CustomNavbar from "./navbar";



export function TelefonRendezes() {
    const [telephone, setTelephones] = useState<Telephone[]>([])




    useEffect(() => {
        fetch("http://localhost:3000/telephones")
            .then((res) => {
                if (res.status === 404) {
                    console.log("Not Found Error")
                }
                if (!res.ok) {
                    console.log("server Error")
                }
                return res.json()
            })
            .then((data) => {
                return setTelephones(data);
            })
            .catch((err) => {
                console.log("Server Threw An Error")
            })
    }, [])


    function descOrder()
    {
        const sortedPhones = [...telephone].sort((a, b) => b.ar - a.ar);
        console.log("asdadas")
        setTelephones(sortedPhones)
    }

    function ascOrder()
    {
        const sortedPhones = [...telephone].sort((a, b) => a.ar - b.ar);
        console.log("asdadas")
        setTelephones(sortedPhones)
    }



    return (
        <>

            <CustomNavbar></CustomNavbar>
            <button onClick={descOrder}  >Ár szerint csökkenő rendezés</button>
            <button onClick={ascOrder}  >Ár szerint növekvő rendezés</button>
            
            <>
            <div className="mx-auto" style={{ width: "fit-content" }}>
                <ul>
                    {telephone.map((t) => (
                        <div className="d-flex border">
                            {Kartya(t)}
                        </div>
                    ))}

                </ul>

            </div>
            </>
        )
        </>
    )




}