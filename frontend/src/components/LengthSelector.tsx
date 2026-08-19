interface LengthSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

function LengthSelector({value, onChange}: LengthSelectorProps) {
    return (
    <div>
        <label className="block mb-2 font-medium">
            Length:
        </label>
        <select className="w-full border rounded-lg p-3" value={value} onChange={(e) => onChange(e.target.value)}>
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
        </select>
    </div>
)}


export default LengthSelector;