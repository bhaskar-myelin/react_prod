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
//   TextField,
// } from "@mui/material";
// import classes from "./Analysis.module.css";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import { getCurrentDate } from "../../utils/functions";
// const currentDate = getCurrentDate();
// const HistoricalAnalysis = () => {
//   const [currentData, setCurrentData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [color, setColor] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(currentDate);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get("/companies");
//       console.log(response);
//       setCompanies(response.data.data);
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching companies:", err);
//       setIsLoading(false);
//     }
//   };

//   const fetchDataForCompany = async () => {
//     if (!selectedCompany) {
//       console.log("No company selected, not fetching data.");
//       return; // Prevent API call if no company is selected
//     }

//     setIsLoading(true);
//     try {
//       const params = { companyName: selectedCompany, color: color };
//       console.log(params);
//       const response = await axiosInstance.get(`/dashboard/historical`, {
//         params: params,
//       });
//       setCurrentData(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching historical data:", err);
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
//         <h1 style={{ textAlign: "center" }}>Historical Analysis</h1>
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
//             <InputLabel>Company name</InputLabel>
//             <Select
//               value={selectedCompany}
//               label="Company name"
//               onChange={(e) => setSelectedCompany(e.target.value)}
//               sx={{ height: 56 }}
//             >
//               <MenuItem value="">
//                 <em>Select a company</em>
//               </MenuItem>
//               {companies.map((company) => (
//                 <MenuItem key={company} value={company}>
//                   {company}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
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
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
//             <InputLabel>Color</InputLabel>
//             <Select
//               value={color}
//               label="Color"
//               onChange={(e) => setColor(e.target.value)}
//               sx={{ height: 56 }}
//             >
//               <MenuItem value="">
//                 <em>Select a color</em>
//               </MenuItem>
//               <MenuItem value="red">Red</MenuItem>
//               <MenuItem value="green">Green</MenuItem>
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={fetchDataForCompany}
//             sx={{ height: 56 }}
//             disabled={!selectedCompany}
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
//         <p style={{ textAlign: "center" }}>Please select a company</p>
//       )}
//     </div>
//   );
// };

// export default HistoricalAnalysis;
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
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import classes from "./Analysis.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { formatDate, getCurrentDate } from "../../utils/functions";
const currentDate = getCurrentDate();
const HistoricalAnalysis = () => {
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("green");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [priceRising, setPriceRising] = useState("true");
  const [priceUpDown, setPriceUpDown] = useState("false");
  const [errorMessage, setErrormessaage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = {
        date: formatDate(selectedDate),
        color: color,
        isPriceRising: priceRising,
        isPriceUpdown: priceUpDown,
      };
      console.log(params);
      const response = await axiosInstance.get(`/dashboard/historical`, {
        params: params,
      });
      console.log("response", response);
      if (response.data.status_code === 400) {
        setErrormessaage(response.data.message);
      } else if (response.data.status_code === 200) {
        console.log(response.data.status_code);
        setCurrentData(response.data.data);
      } else {
        // setFetchError(true);
        setErrormessaage("An error occured, please try again later");
      }
      // setCurrentData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching historical data:", err);
      setIsLoading(false);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };
  console.log(currentData);
  const handlePriceRisingChange = (event) => {
    // Ensure at least one checkbox is always selected
    if (!priceUpDown && !event.target.checked) {
      setPriceUpDown("true");
    }
    setPriceRising(event.target.checked);
  };

  const handlePriceUpDownChange = (event) => {
    // Ensure at least one checkbox is always selected
    if (!priceRising && !event.target.checked) {
      setPriceRising("true");
    }
    setPriceUpDown(event.target.checked);
  };
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
        <h1 style={{ textAlign: "center" }}>Historical Analysis</h1>
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
          <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              label="Color"
              onChange={(e) => setColor(e.target.value)}
              sx={{ height: 56 }}
            >
              <MenuItem value="">
                <em>Select a color</em>
              </MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="green">Green</MenuItem>
            </Select>
          </FormControl>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={priceRising}
                  onChange={handlePriceRisingChange}
                />
              }
              label="10-100 price rising"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={priceUpDown}
                  onChange={handlePriceUpDownChange}
                />
              }
              label="10-50 price updown"
            />
          </FormGroup>
          <Button variant="contained" onClick={fetchData} sx={{ height: 56 }}>
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
        <p style={{ textAlign: "center" }}></p>
      )}
    </div>
  );
};

export default HistoricalAnalysis;
