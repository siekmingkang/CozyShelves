export const CANDLES = [
  { id: "taper", label: "Taper" },
  { id: "pillar", label: "Pillar" },
  { id: "tealights", label: "Tea lights" },
  { id: "jar", label: "Jar" },
  { id: "lantern", label: "Lantern" },
];

function Flame({ variant = "" }) {
  return (
    <div className={`flame ${variant}`}>
      <div className="flame-core" />
    </div>
  );
}

export default function Candle({ type = "taper" }) {
  return (
    <div className={`candle candle--${type}`}>
      <div className="halo" />

      {type === "taper" && (
        <>
          <Flame />
          <div className="wick" />
          <div className="wax" />
          <div className="coaster" />
        </>
      )}

      {type === "pillar" && (
        <>
          <Flame variant="flame--pillar" />
          <div className="wick" />
          <div className="wax wax--pillar" />
          <div className="coaster" />
        </>
      )}

      {type === "tealights" && (
        <>
          {["a", "b", "c"].map((id) => (
            <div className={`tealight tealight--${id}`} key={id}>
              <Flame variant="flame--tea" />
              <div className="teacup" />
            </div>
          ))}
        </>
      )}

      {type === "jar" && (
        <div className="jar">
          <div className="jar-wax" />
          <Flame variant="flame--jar" />
          <div className="wick" />
          <div className="jar-glass" />
        </div>
      )}

      {type === "lantern" && (
        <div className="lantern">
          <div className="lantern-handle" />
          <div className="lantern-cap" />
          <div className="lantern-glass">
            <div className="lantern-wax" />
            <Flame variant="flame--lantern" />
            <div className="wick" />
          </div>
          <div className="lantern-base" />
        </div>
      )}
    </div>
  );
}
