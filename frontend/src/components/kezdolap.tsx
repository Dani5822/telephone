import { useEffect, useState } from "react";
import Kartya from "./kartya";
import { Telephone } from "../telephone";
import CostumeNavbar from "./navbar";
 
export default function Kezdolap() {
    const [tablets, setTablets] = useState<Telephone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 
    useEffect(() => {
        fetch('http://localhost:3000/telephones')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
 
    if (loading) {
        return <p>Loading...</p>;
    }
 
    if (error) {
        return <p>Error: {error}</p>;
    }
 
    const sortedTablets = [...tablets].sort((a, b) => a.ar - b.ar);
    const cheapestTablets = sortedTablets.slice(0, 3);
    const mostExpensiveTablets = sortedTablets.slice(-3).reverse();
 
    return (
        <>
                <CostumeNavbar />
            <div >
                <h2>Kezdőlap</h2>
                <h3>Legolcsóbb Tabletek</h3>
                <ul>
                    {cheapestTablets.map((tablet) => (
                        Kartya(tablet)
                    ))}
                </ul>
                <h2>Legdrágább Tabletek</h2>
                <ul>
                    {mostExpensiveTablets.map((tablet) => (
                        Kartya(tablet)
                    ))}
                </ul>
            </div>
        </>
    );
}