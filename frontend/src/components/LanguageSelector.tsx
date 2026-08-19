interface LanguageSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

function LanguageSelector({value, onChange}: LanguageSelectorProps) {
    return (
    <div>
        <label className="block mb-2 font-medium">
            Language:
        </label>
        <select className="w-full border rounded-lg p-3" value={value} onChange={(e) => onChange(e.target.value)}>
            <option>English</option>
            <option>French</option>
            <option>Arabic</option>
        </select>
    </div>
)}


export default LanguageSelector;