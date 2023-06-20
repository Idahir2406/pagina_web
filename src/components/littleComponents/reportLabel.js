
const ReportLabel = ({ selectedOption, handleOptionChange, value, label }) => {
  return (
    <div className="flex items-center gap-4 ">
      <input
        checked={selectedOption === value}
        value={value}
        onChange={handleOptionChange}
        type="radio"
        name="report"
        id={value}
      />
      <label className="cursor-pointer" htmlFor={value}>{label}</label>
    </div>
  );
};

export default ReportLabel;
