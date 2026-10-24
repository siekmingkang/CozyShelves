import Candle from "./Candle.jsx";

export default function Table({ candle = "taper" }) {
  return (
    <div className="table" aria-hidden="true">
      <div className="table-top" />

      <div className="leg leg-back leg-c" />
      <div className="leg leg-back leg-d" />
      <div className="leg leg-a" />
      <div className="leg leg-b" />

      <Candle type={candle} />
    </div>
  );
}
