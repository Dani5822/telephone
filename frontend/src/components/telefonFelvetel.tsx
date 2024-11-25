import { useState } from "react";
import { Telephone } from "../telephone";
import CustomNavbar from "../components/navbar"


export default function NewPhone() {
  const [title, setTitle] = useState<string>('');
  const [op_sys, setOp_sys] = useState<string>('');
  const [cpu_hz, setCpu_hz] = useState<number>();
  const [cpu_cores, setCpu_cores] = useState<number>();
  const [screen_size, setScreen_size] = useState<string>('');
  const [screen_res, setScreen_res] = useState<string>('');
  const [ram, setRam] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const newPhone = {
          Nev: title,
          opRendszer: op_sys,
          procOrajel: cpu_hz,
          procMagok: cpu_cores,
          kijelzoMeret: screen_size,
          kijelzoFelbontas: screen_res,
          RAM: ram,
          leiras: description,
          ar: price
        }
        try {
            const response = await fetch('http://localhost:3000/telephones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPhone)
            })
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error)
                throw new Error(`Hiba történt: ${response.status}`)
            }

            setSuccess(true);
          
        } catch (err: any) {
            setError(err.message)
        } finally {

        }
    }
    return <>

        <div className="container" >
            <CustomNavbar></CustomNavbar>
            <h2>Tablet Felvetele</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <label >Title:</label>
                    <input className="form-control"
                        type="text"

                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group"><label>Operating System:</label>
                    <input
                    className="form-control"
                        type="text"
                   
                        onChange={(e) => setOp_sys(e.target.value)}
                       
                        
                    /></div>


                <div className="form-group"><label>Cpu Hz:</label>
                    <input
                    className="form-control"
                        type="text"

                        onChange={(e) => setCpu_hz(parseInt(e.target.value))}
                    /></div>


                <div className="form-group"><label>Cpu cores:</label>
                    <input
                    className="form-control"
                        type="text"

                        onChange={(e) => setCpu_cores(parseInt(e.target.value))}
                    /></div>


                <div className="form-group"> <label>Screen Size:</label>
                    <input
                    className="form-control"
                        type="text"

                        onChange={(e) => setScreen_size(e.target.value)}
                    /></div>


                <div className="form-group"><label>Screen Resolution:</label>
                    <input
                    className="form-control"
                        type="text"

                        onChange={(e) => setScreen_res(e.target.value)}
                    /></div>


                <div className="form-group"><label>Ram:</label>
                    <input
                    className="form-control"
                        type="text"
                        onChange={(e) => setRam(parseInt(e.target.value))}
                    /></div>



                <div className="form-group"> <label>Description:</label>
                    <input
                    className="form-control"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    /></div>


                <div className="form-group"><label>Price:</label>
                    <input
                    className="form-control"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                    /></div>


                <button className="btn btn-primary mt-2"  type="submit">Tablet felvétele</button>
                {error && <p>{error}</p>}
                {success && <p>Sikeresen megtörtént a tablet felvétele.</p>}
            </form>
        </div>



    </>
}