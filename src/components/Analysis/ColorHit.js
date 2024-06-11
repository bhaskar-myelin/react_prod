// import React, { useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import Table from "../Table/Table";
// import { axiosInstance } from "../../config/Config";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
// } from "@mui/material";
// import classes from "./Analysis.module.css";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import { formatDate, getCurrentDate } from "../../utils/functions";
// const movingAvgList = [
//   10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500, 2000, 2500,
//   3000, 3500,
// ];
// const currentDate = getCurrentDate();
// const SmaHigh = () => {
//   const [currentData, setCurrentData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(currentDate);
//   const [color, setColor] = useState("");
//   const [movingAvg, setMovingAvg] = useState([10]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCompanyData();
//   }, []);

//   const fetchCompanyData = async () => {
//     setIsLoading(true);
//     try {
//       const params = {
//         date: formatDate(selectedDate),
//         color: color,
//         movingAvg: movingAvg,
//       };
//       console.log("params", params);
//       const response = await axiosInstance.get(`/dashboard/colorhit`, {
//         params: params,
//       });
//       setCurrentData(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching color hit data:", err);
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
//         <h1 style={{ textAlign: "center" }}>Color hit</h1>
//       </div>
//       <div className={classes.formContainer}>
//         <div className={classes.formRow}>
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
//             <TextField
//               label="Date"
//               type="date"
//               value={selectedDate}
//               name="Date"
//               onChange={(e) => setSelectedDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </FormControl>
//           <FormControl
//             fullWidth
//             sx={{ mb: 2, maxWidth: 300 }}
//             className={classes.formGroup}
//           >
//             <InputLabel>Color</InputLabel>
//             <Select
//               value={color}
//               label="Impact Color"
//               onChange={(e) => setColor(e.target.value)}
//               sx={{ height: 56 }}
//             >
//               <MenuItem value="">
//                 <em>Select a color</em>
//               </MenuItem>
//               <MenuItem value="orange">Orange</MenuItem>
//               <MenuItem value="green">Green</MenuItem>
//               <MenuItem value="blue">Blue</MenuItem>
//               <MenuItem value="pink">Pink</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl
//             fullWidth
//             sx={{ mb: 2, maxWidth: "14%" }}
//             // error={!!errors.selectedCompany}
//           >
//             <InputLabel>Moving Average</InputLabel>
//             <Select
//               value={movingAvg}
//               label="Moving Average"
//               onChange={(e) => setMovingAvg(e.target.value)}
//             >
//               {movingAvgList.map((data) => (
//                 <MenuItem key={data} value={data}>
//                   {data}
//                 </MenuItem>
//               ))}
//             </Select>
//             {/* {errors.crossoverStart && (
//               <FormHelperText>{errors.crossoverStart}</FormHelperText>
//             )} */}
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={fetchCompanyData}
//             sx={{ height: 56 }}
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
//       ) : (
//         <Table initialData={currentData} />
//       )}
//     </div>
//   );
// };

// export default SmaHigh;
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Table from "../Table/Table";
import { axiosInstance } from "../../config/Config";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import classes from "./Analysis.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { formatDate, getCurrentDate } from "../../utils/functions";

const movingAvgList = [
  10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500, 2000, 2500,
  3000, 3500,
];
const currentDate = getCurrentDate();

const SmaHigh = () => {
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [color, setColor] = useState("");
  const [movingAvg, setMovingAvg] = useState([10]); // Change to array

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    setIsLoading(true);
    try {
      const data = {
        date: formatDate(selectedDate),
        color: color,
        movingAvg: movingAvg, // Join array into a string
      };
      console.log("data", data);
      const response = await axiosInstance.post(`/dashboard/colorhit`, {
        data: data,
      });
      console.log(response);
      setCurrentData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching color hit data:", err);
      setIsLoading(false);
    }
  };

  console.log(movingAvg);
  const handleRowClick = (item) => {
    console.log("item", item);
    navigate(`/dashboard/${item["company"].value}/historical`);
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
        <h1 style={{ textAlign: "center" }}>Color hit</h1>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formRow}>
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
            <TextField
              label="Date"
              type="date"
              value={selectedDate}
              name="Date"
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: 300 }}
            className={classes.formGroup}
          >
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              label="Impact Color"
              onChange={(e) => setColor(e.target.value)}
              sx={{ height: 56 }}
            >
              <MenuItem value="">
                <em>Select a color</em>
              </MenuItem>
              <MenuItem value="orange">Orange</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="pink">Pink</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: "14%" }}
            // error={!!errors.selectedCompany}
          >
            <InputLabel>Moving Average</InputLabel>
            <Select
              value={movingAvg}
              label="Moving Average"
              onChange={(e) => setMovingAvg(e.target.value)} // Adjust state update function
              multiple // Allow multiple selections
            >
              {movingAvgList.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            {/* {errors.crossoverStart && (
              <FormHelperText>{errors.crossoverStart}</FormHelperText>
            )} */}
          </FormControl>
          <Button
            variant="contained"
            onClick={fetchCompanyData}
            sx={{ height: 56 }}
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
      ) : (
        <Table
          initialData={currentData}
          isRowClickable={true}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default SmaHigh;
