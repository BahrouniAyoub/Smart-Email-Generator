interface ToneSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

function ToneSelector({value, onChange}: ToneSelectorProps) {
    return (
    <div>
        <label className="block mb-2 font-medium">
            Tone:
        </label>
        <select className="w-full border rounded-lg p-3" value={value} onChange={(e) => onChange(e.target.value)}>
            <option>Professional</option>
            <option>Format</option>
            <option>Friendly</option>
            <option>Casual</option>
            <option>Persuasive</option>
        </select>
    </div>
)}


export default ToneSelector;