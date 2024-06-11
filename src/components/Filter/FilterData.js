// import React, { useState } from "react";
// import "./FilterData.css";

// const FilterData = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [crossoverStart, setCrossoverStart] = useState("");
//   const [crossoverEnd, setCrossoverEnd] = useState("");
//   const [impactColor, setImpactColor] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [csvData, setCsvData] = useState("");

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleCrossoverStartChange = (e) => {
//     setCrossoverStart(e.target.value);
//   };

//   const handleCrossoverEndChange = (e) => {
//     setCrossoverEnd(e.target.value);
//   };

//   const handleImpactColorChange = (e) => {
//     setImpactColor(e.target.value);
//   };
//   return (
//     <div className="form-container">
//       {/* <h1>DashBoard Report</h1> */}
//       <div className="form-row">
//         <div className={classes.formGroup}>
//           <label className="form-label">Start Date:</label>
//           <input
//             className={classes.formInput}
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//         </div>
//         <div className={classes.formGroup}>
//           <label className="form-label">End Date:</label>
//           <input
//             className={classes.formInput}
//             type="date"
//             value={endDate}
//             onChange={handleEndDateChange}
//           />
//         </div>
//         <div className={classes.formGroup}>
//           <label className="form-label">Crossover Start:</label>
//           <input
//             className={classes.formInput}
//             type="number"
//             value={crossoverStart}
//             onChange={handleCrossoverStartChange}
//           />
//         </div>
//         <div className={classes.formGroup}>
//           <label className="form-label">Crossover End:</label>
//           <input
//             className={classes.formInput}
//             type="number"
//             value={crossoverEnd}
//             onChange={handleCrossoverEndChange}
//           />
//         </div>
//         <div className={classes.formGroup}>
//           <label className="form-label">Impact Color:</label>
//           <select
//             className={classes.formInput}
//             value={impactColor}
//             onChange={handleImpactColorChange}
//           >
//             <option value="">Select a color</option>
//             <option value="red">Red</option>
//             <option value="green">Green</option>
//           </select>
//         </div>
//         <div className={classes.formGroup}>
//           <button
//             className={classes.formButton}
//             //   onClick={performCrossoverAnalysis}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//       <div className="error-message">{errorMessage}</div>
//       <div className="results-container">{/* {displayResults()} */}</div>
//     </div>
//   );
// };

// export default FilterData;
import React, { useState, useEffect } from "react";
import classes from "./FilterData.module.css";

const FilterData = ({ onFilterSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [crossoverStart, setCrossoverStart] = useState("");
  const [crossoverEnd, setCrossoverEnd] = useState("");
  const [impactColor, setImpactColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [startDateTouched, setStartDateTouched] = useState(false);
  const [endDateTouched, setEndDateTouched] = useState(false);

  // Effect to check if any inputs have changed from their initial values
  useEffect(() => {
    const areInitialValues =
      !startDate &&
      !endDate &&
      !crossoverStart &&
      !crossoverEnd &&
      !impactColor;
    setIsButtonDisabled(areInitialValues);
  }, [startDate, endDate, crossoverStart, crossoverEnd, impactColor]);

  const handleCrossoverStartChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(0, Math.round(value / 10) * 10);
    setCrossoverStart(value.toString());
  };

  const handleCrossoverEndChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(0, Math.round(value / 10) * 10);
    setCrossoverEnd(value.toString());
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setStartDateTouched(true);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateTouched(true);
  };

  const handleSubmit = () => {
    if ((startDateTouched || endDateTouched) && (!startDate || !endDate)) {
      setErrorMessage("Both start and end dates are required.");
      return;
    }

    setErrorMessage(""); // Clear error message on successful submission
    onFilterSubmit({
      startDate,
      endDate,
      crossoverStart: crossoverStart,
      crossoverEnd: crossoverEnd,
      impactColor,
    });
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formRow}>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Start Date:</label>
          <input
            className={classes.formInput}
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>End Date:</label>
          <input
            className={classes.formInput}
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Crossover Start:</label>
          <input
            className={classes.formInput}
            type="number"
            step="10"
            min="0"
            value={crossoverStart}
            onChange={handleCrossoverStartChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Crossover End:</label>
          <input
            className={classes.formInput}
            type="number"
            step="10"
            min="0"
            value={crossoverEnd}
            onChange={handleCrossoverEndChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label className="form-label">Impact Color:</label>
          <select
            className={classes.formInput}
            value={impactColor}
            onChange={(e) => setImpactColor(e.target.value)}
          >
            <option value="">Select a color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
        <div className={classes.formGroup}>
          <button
            className={classes.formButton}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Submit
          </button>
        </div>
      </div>
      <div className={classes.errorMessage}>{errorMessage}</div>
    </div>
  );
};

export default FilterData;
