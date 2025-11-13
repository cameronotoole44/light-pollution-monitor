type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (y: number) => void;
};

export default function YearSlider({ min, max, value, onChange }: Props) {
  return (
    <div className="card">
      <div className="subtitle">Year of birth</div>
      <input
        className="range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="range-scale">
        <span className="subtitle">{min}</span>
        <span className="subtitle">{max}</span>
      </div>
      <div className="range-selected">
        Selected: <strong>{value}</strong>
      </div>
    </div>
  );
}
