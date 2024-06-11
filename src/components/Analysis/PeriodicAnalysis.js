import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Table from "../Table/Table";
import { axiosInstance } from "../../config/Config";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import classes from "./Analysis.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { getCurrentMonth, getCurrentYear } from "../../utils/functions";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonthIndex = new Date().getMonth(); // Get the current month index
const currentMonth = months[currentMonthIndex];
const currentYear = new Date().getFullYear(); // Get the current year

const PeriodicAnalysis = () => {
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear); // State for selected year
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = {
        month: selectedMonth ? selectedMonth.substring(0, 3).toLowerCase() : "",
        year: selectedYear.toString(), // Include the selected year in the API params
        color: color,
      };
      console.log("Fetching data with params:", params);
      const response = await axiosInstance.get(`/dashboard/periodic`, {
        params,
      });
      console.log(response.data);
      if (response.data.status_code === 400) {
        setErrorMessage(response.data.message);
        setCurrentData([]);
      } else if (response.data.status_code === 200) {
        setCurrentData(response.data.data);
      } else {
        setErrorMessage("An error occurred, please try again later");
        setCurrentData([]);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrorMessage("An error occurred, please try again later");
      setIsLoading(false);
      setCurrentData([]);
    }
  };
  const handleRowClick = (item) => {
    console.log("item", item);
    navigate(`/dashboard/${item["company_name"].value}/historical`);
  };

  return (
    <div style={{ height: "800px", overflowY: "auto" }}>
      <div className={classes.analysisHeader}>
        <button
          className={classes.backButton}
          onClick={() => navigate("/dashboard")}
          aria-label="Back to Dashboard"
        >
          <ArrowBackIcon sx={{ fontSize: 40 }} />
        </button>
        <h1 style={{ textAlign: "center" }}>Periodic Analysis</h1>
      </div>

      <div className={classes.formContainer}>
        <div
          className={classes.formRow}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
              sx={{ height: 56 }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 150, // This controls the height of the dropdown
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select a month</em>
              </MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{ height: 56 }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 150, // This controls the height of the dropdown
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select a year</em>
              </MenuItem>
              {Array.from({ length: 50 }, (_, i) => currentYear - i).map(
                (year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              label="Color"
              onChange={(e) => setColor(e.target.value)}
              sx={{ height: 56 }}
            >
              <MenuItem value="">
                <em>Select color</em>
              </MenuItem>
              <MenuItem value="orange">Orange</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="pink">Pink</MenuItem>
              <MenuItem value="red">Red</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={fetchData}
            sx={{ height: 56 }}
            disabled={!selectedMonth && !selectedYear && !color} // Disable if any of the fields are unset
          >
            Submit
          </Button>
        </div>
      </div>
      {isLoading ? (
        <BeatLoader
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        />
      ) : currentData && currentData.length > 0 ? (
        <Table
          initialData={currentData}
          isRowClickable={true}
          onRowClick={handleRowClick}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No data found</p>
      )}
    </div>
  );
};

export default PeriodicAnalysis;

// import React, { useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import Table from "../Table/Table";
// import { axiosInstance } from "../../config/Config";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
// } from "@mui/material";
// import classes from "./Analysis.module.css";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import { getCurrentMonth, getCurrentYear } from "../../utils/functions";

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const currentMonthIndex = new Date().getMonth(); // Get the current month index
// const currentMonth = months[currentMonthIndex];
// const currentYear = new Date().getFullYear(); // Get the current year

// const PeriodicAnalysis = () => {
//   const [currentData, setCurrentData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [selectedYear, setSelectedYear] = useState(currentYear); // State for selected year
//   const [color, setColor] = useState("orange");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const params = {
//         month: selectedMonth ? selectedMonth.substring(0, 3).toLowerCase() : "",
//         year: selectedYear.toString(), // Include the selected year in the API params
//         color: color,
//       };
//       console.log("Fetching data with params:", params);
//       const response = await axiosInstance.get(`/dashboard/periodic`, {
//         params,
//       });
//       console.log(response.data);
//       if (response.data.status_code === 400) {
//         setErrorMessage(response.data.message);
//       } else if (response.data.status_code === 200) {
//         setCurrentData(response.data.data);
//       } else {
//         setErrorMessage("An error occurred, please try again later");
//       }
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ height: "800px", overflowY: "auto" }}>
//       <div className={classes.analysisHeader}>
//         <button
//           className={classes.backButton}
//           onClick={() => navigate("/dashboard")}
//           aria-label="Back to Dashboard"
//         >
//           <ArrowBackIcon sx={{ fontSize: 40 }} />
//         </button>
//         <h1 style={{ textAlign: "center" }}>Periodic Analysis</h1>
//       </div>

//       <div className={classes.formContainer}>
//         <div
//           className={classes.formRow}
//           style={{
//             display: "flex",
//             justifyContent: "flex-start",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
//             <InputLabel>Month</InputLabel>
//             <Select
//               value={selectedMonth}
//               label="Month"
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               sx={{ height: 56 }}
//               MenuProps={{
//                 PaperProps: {
//                   style: {
//                     maxHeight: 150, // This controls the height of the dropdown
//                   },
//                 },
//               }}
//             >
//               <MenuItem value="">
//                 <em>Select a month</em>
//               </MenuItem>
//               {months.map((month) => (
//                 <MenuItem key={month} value={month}>
//                   {month}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
//             <InputLabel>Year</InputLabel>
//             <Select
//               value={selectedYear}
//               label="Year"
//               onChange={(e) => setSelectedYear(e.target.value)}
//               sx={{ height: 56 }}
//               MenuProps={{
//                 PaperProps: {
//                   style: {
//                     maxHeight: 150, // This controls the height of the dropdown
//                   },
//                 },
//               }}
//             >
//               <MenuItem value="">
//                 <em>Select a year</em>
//               </MenuItem>
//               {Array.from({ length: 50 }, (_, i) => currentYear - i).map(
//                 (year) => (
//                   <MenuItem key={year} value={year}>
//                     {year}
//                   </MenuItem>
//                 )
//               )}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
//             <InputLabel>Color</InputLabel>
//             <Select
//               value={color}
//               label="Color"
//               onChange={(e) => setColor(e.target.value)}
//               sx={{ height: 56 }}
//             >
//               <MenuItem value="">
//                 <em>Select color</em>
//               </MenuItem>
//               <MenuItem value="orange">Orange</MenuItem>
//               <MenuItem value="blue">Blue</MenuItem>
//               <MenuItem value="pink">Pink</MenuItem>
//               <MenuItem value="red">Red</MenuItem>
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={fetchData}
//             sx={{ height: 56 }}
//             disabled={!selectedMonth && !selectedYear && !color} // Disable if any of the fields are unset
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//       {isLoading ? (
//         <BeatLoader
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             paddingTop: "20px",
//           }}
//         />
//       ) : currentData && currentData.length > 0 ? (
//         <Table initialData={currentData} />
//       ) : (
//         <p style={{ textAlign: "center" }}>
//           Please select a month, year, and color to view data
//         </p>
//       )}
//     </div>
//   );
// };

// export default PeriodicAnalysis;
