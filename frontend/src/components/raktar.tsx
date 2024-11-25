import { useEffect, useState } from "react";
import { telephone } from "../telephone";
import Kartya from "./kartya";
import CostumeNavbar from "./navbar";
import { Button, Table } from "react-bootstrap";

export default function Raktar() {
  const [telephones, settelephones] = useState<telephone[]>([]);
  const [loading, setLoading] = useState(true);
  const [disable, setdisable] = useState(false);
  const [error, setError] = useState(null);
  const [errorServer, setErrorServer] = useState("");
  const [page, setPage] = useState(1);
  const [maxitems, setMaxitems] = useState(2);
  const [items, setItems] = useState<telephone[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof telephone;
    direction: "asc" | "desc";
  } | null>(null);
  const [editData, setEditData] = useState<telephone | null>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/telephone");
        if (response.status === 404) {
          setErrorServer("Resource not found (404)");
        }
        if (!response.ok) {
          setErrorServer(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        settelephones(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function Showdata() {
    setItems([]);
    const startIndex = (page - 1) * maxitems;
    const endIndex = Math.min(page * maxitems, telephones.length);
    const newItems = telephones.slice(startIndex, endIndex);
    setItems(newItems);
  }

  useEffect(() => {
    Showdata();
  }, [page, telephones, maxitems]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = telephones.filter(
      (telephone) =>
        telephone.Nev.toLowerCase().includes(term) ||
        telephone.RAM.toString().includes(term) ||
        telephone.ar.toString().includes(term) ||
        telephone.kijelzoFelbontas.toLocaleLowerCase().includes(term) ||
        telephone.kijelzoMeret.toString().includes(term) ||
        telephone.opRendszer.toLocaleLowerCase().includes(term) ||
        telephone.procMagok.toString().includes(term) ||
        telephone.procOrajel.toString().includes(term)
    );
    setItems(filtered);
  };

  const handleEdit = (telephone: telephone) => {
    setEditData(telephone);
    setShowModal(true);
  };

  const sorttelephones = (key: keyof telephone, direction: "asc" | "desc") => {
    const sortedPhones = [...items].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setItems(sortedPhones);
    setSortConfig({ key, direction });
  };

  if (errorServer) {
    return <p>ErrorServer: {errorServer}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }



  return (
    <>
      <CostumeNavbar />
      <div>
        <h2>telephonok</h2>
        <form>
          <label>
            Keresés:
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Márka, típus vagy ár alapján..."
            />
          </label>
        </form>
        <div>
          <label htmlFor="megjelen" className="me-1">
            Egy oldalon megjelenő telephonok száma:
          </label>
          <input
            type="number"
            name="megjelen"
            id="megjelen"
            value={maxitems}
            onChange={(e) => {
              setMaxitems(parseInt(e.currentTarget.value));
            }}
          />
        </div>
        <br />
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
            <th>
              Név
              <button
                onClick={() => sorttelephones("Nev", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("Nev", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>
              Operációs rendszer
              <button
                onClick={() => sorttelephones("opRendszer", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("opRendszer", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>
                Processzor órajele
              <button
                onClick={() => sorttelephones("procOrajel", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("procOrajel", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>
            Processzor magok száma
              <button
                onClick={() => sorttelephones("procMagok", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("procMagok", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>
            Kijelző Méret
              <button
                onClick={() => sorttelephones("kijelzoMeret", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("kijelzoMeret", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>
            Kijelző Felbontás
              <button
                onClick={() => sorttelephones("kijelzoFelbontas", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("kijelzoFelbontas", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>
            RAM
              <button
                onClick={() => sorttelephones("RAM", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("RAM", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>Leírás</th>
              <th>
            ÁR
              <button
                onClick={() => sorttelephones("ar", "asc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8593;
              </button>
              <button
                onClick={() => sorttelephones("ar", "desc")}
                style={{
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
              >
                &#8595;
              </button>
            </th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {items.map((telephone) => (
              <tr key={telephone.id}>
                <td>{telephone.Nev}</td>
                <td>{telephone.opRendszer}</td>
                <td>{telephone.procOrajel}</td>
                <td>{telephone.procMagok}</td>
                <td>{telephone.kijelzoMeret}</td>
                <td>{telephone.kijelzoFelbontas}</td>
                <td>{telephone.RAM}</td>
                <td>{telephone.leiras}</td>
                <td>{telephone.ar}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(telephone)}>Módosítás</Button>
                  <Button typeof="checkbox" className="form-check" role="switch" id="disable" onClick={()=>setdisable(!disable)} >Disable</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="pagination mt-3">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Előző
        </button>
        <span>Oldal: {page}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(telephones.length / maxitems))
            )
          }
        >
          Következő
        </button>
      </div>
    </>
  );
}