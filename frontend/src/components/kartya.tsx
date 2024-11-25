import { telephone } from "../telephone";

export default function Kartya(telephone: telephone) {
  return (
    <>
      <div className="row row-cols-9 border border-dark">
        <div className="col"><strong>Név: </strong>{telephone.Nev}</div>
        <div className="col"><strong>Operációs rendszer:</strong> {telephone.opRendszer}</div>
        <div className="col"><strong>Processzor órajele:</strong> {telephone.procOrajel}</div>
        <div className="col"><strong>Processzor magok száma:</strong> {telephone.procMagok}</div>
        <div className="col"><strong>Kijelző Méret:</strong> {telephone.kijelzoMeret}</div>
        <div className="col"><strong>Kijelző Felbontás:</strong> {telephone.kijelzoFelbontas}</div>
        <div className="col"><strong>RAM:</strong> {telephone.RAM}</div>
        <div className="col-5"><strong>Leírás:</strong> {telephone.leiras}</div>
        <div className="col"><strong>ÁR:</strong> {telephone.ar}</div>
      </div>
    </>
  );
}
