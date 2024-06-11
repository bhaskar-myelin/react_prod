// import React, { useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import Table from "../Table/Table";
// import { axiosInstance } from "../../config/Config";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {
//   FormControl,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   Button,
//   FormHelperText,
// } from "@mui/material";
// import classes from "./Analysis.module.css";
// import { useNavigate } from "react-router-dom";

// const crossoverStartList = [
//   10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500, 2000, 2500,
//   3000, 3500,
// ];

// const crossoverEndList = [
//   10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500, 2000, 2500,
//   3000, 3500,
// ];
// const dummyCompanyList = ["Myelin", "Wipro", "Microsoft"];

// const CrossoverAnalysis = () => {
//   const [currentData, setCurrentData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState([]);
//   const [selectedStartDate, setSelectedStartDate] = useState("");
//   const [selectedEndDate, setSelectedEndDate] = useState("");
//   const [impactColor, setImpactColor] = useState("");
//   const [crossoverStart, setCrossoverStart] = useState("");
//   const [crossoverEnd, setCrossoverEnd] = useState("");
//   const [errors, setErrors] = useState({});
//   const [fetchError, setFetchError] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchInitialData();
//     fetchDataForAllCompanies();
//   }, []);

//   const fetchInitialData = async () => {
//     setIsLoading(true);
//     try {
//       const companyResponse = await axiosInstance.get("/list_companies");

//       setCompanies(companyResponse.data.data);
//     } catch (err) {
//       console.error("Error fetching companies:", err);
//     }
//     setIsLoading(false);
//   };
//   const fetchDataForAllCompanies = async () => {
//     setIsLoading(true);
//     setFetchError(false);
//     try {
//       const params = {
//         companyName: selectedCompany,
//         startDate: selectedStartDate,
//         endDate: selectedEndDate,
//         colour: impactColor,
//         crossoverRangeStart: crossoverStart || 10,
//         crossoverRangeEnd: crossoverEnd || 20,
//       };
//       const response = await axiosInstance.get("/dashboard_crossover", {
//         params: params,
//       });
//       if (response.status === 200) {
//         setCurrentData(response.data);
//       } else {
//         setFetchError(true);
//       }
//     } catch (err) {
//       console.error("Error fetching initial data:", err);
//       setFetchError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const validateForm = () => {
//     const newErrors = {};
//     if (!selectedCompany)
//       newErrors.selectedCompany = "Please select a company.";
//     if (!crossoverStart)
//       newErrors.crossoverStart = "Please select a start range.";
//     if (!crossoverEnd) newErrors.crossoverEnd = "Please select an end range.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const fetchDataForCompany = async () => {
//     if (!validateForm()) {
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const params = {
//         companyName: selectedCompany,
//         startDate: selectedStartDate,
//         endDate: selectedEndDate,
//         colour: impactColor,
//         crossoverRangeStart: crossoverStart,
//         crossoverRangeEnd: crossoverEnd,
//       };
//       const response = await axiosInstance.get("/dashboard_crossover", {
//         params: params,
//       });
//       setCurrentData(response.data);
//     } catch (err) {
//       console.error("Error fetching data for company:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ height: "calc(100% - 200px)", overflowY: "auto" }}>
//       <div className={classes.analysisHeader}>
//         <button
//           className={classes.backButton}
//           onClick={() => navigate("/dashboard")}
//           aria-label="Back to Dashboard"
//         >
//           <ArrowBackIcon sx={{ fontSize: 40 }} />
//         </button>
//         <h1 style={{ textAlign: "center" }}>Crossover Analysis</h1>
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
//           <FormControl
//             fullWidth
//             sx={{ mb: 2, maxWidth: "14%" }}
//             error={!!errors.selectedCompany}
//           >
//             <InputLabel>Company</InputLabel>
//             <Select
//               value={selectedCompany}
//               label="Company"
//               onChange={(e) => {
//                 setSelectedCompany(e.target.value);
//                 setErrors((prevErrors) => ({
//                   ...prevErrors,
//                   selectedCompany: null,
//                 }));
//               }}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               {companies.map((company) => (
//                 <MenuItem key={company} value={company}>
//                   {company}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.selectedCompany && (
//               <FormHelperText>{errors.selectedCompany}</FormHelperText>
//             )}
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
//             <TextField
//               label="Start Date"
//               type="date"
//               value={selectedStartDate}
//               name="startDate"
//               onChange={(e) => setSelectedStartDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
//             <TextField
//               label="End Date"
//               type="date"
//               value={selectedEndDate}
//               name="endDate"
//               onChange={(e) => setSelectedEndDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
//             <InputLabel>Impact Color</InputLabel>
//             <Select
//               value={impactColor}
//               label="Impact Color"
//               onChange={(e) => setImpactColor(e.target.value)}
//             >
//               <MenuItem value="ff0000">Red</MenuItem>
//               <MenuItem value="green">Green</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl
//             fullWidth
//             sx={{ mb: 2, maxWidth: "14%" }}
//             error={!!errors.selectedCompany}
//           >
//             <InputLabel>Crossover Start</InputLabel>
//             <Select
//               value={crossoverStart}
//               label="Crossover Start"
//               onChange={(e) => setCrossoverStart(e.target.value)}
//             >
//               {crossoverStartList.map((data) => (
//                 <MenuItem key={data} value={data}>
//                   {data}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.crossoverStart && (
//               <FormHelperText>{errors.crossoverStart}</FormHelperText>
//             )}
//           </FormControl>
//           <FormControl
//             fullWidth
//             sx={{ mb: 2, maxWidth: "14%" }}
//             error={!!errors.selectedCompany}
//           >
//             <InputLabel>Crossover End</InputLabel>
//             <Select
//               value={crossoverEnd}
//               label="Crossover End"
//               onChange={(e) => setCrossoverEnd(e.target.value)}
//             >
//               {crossoverEndList.map((data) => (
//                 <MenuItem key={data} value={data}>
//                   {data}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.crossoverEnd && (
//               <FormHelperText>{errors.crossoverEnd}</FormHelperText>
//             )}
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={fetchDataForCompany}
//             sx={{ height: 56 }}
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//       {isLoading ? (
//         <BeatLoader />
//       ) : fetchError ? (
//         <p>An error occurred, please try again later.</p>
//       ) : currentData.length > 0 ? (
//         <Table initialData={currentData} />
//       ) : null}
//     </div>
//   );
// };

// export default CrossoverAnalysis;

import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Table from "../Table/Table";
import { axiosInstance } from "../../config/Config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormHelperText,
  Checkbox,
  ListItemText,
} from "@mui/material";
import classes from "./Analysis.module.css";
import { useNavigate } from "react-router-dom";
import { formatDate, getCurrentDate } from "../../utils/functions";

const crossoverStartList = [10, 20, 30, 50];

const crossoverEndList = [50, 100, 150, 200, 750, 1000, 1500];
const dummyCompanyList = ["Myelin", "Wipro", "Microsoft"];
const currentDate = getCurrentDate();
const CrossoverAnalysis = () => {
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [impactColor, setImpactColor] = useState("");
  const [crossoverStart, setCrossoverStart] = useState("30");
  const [crossoverEnd, setCrossoverEnd] = useState("50");
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(false);
  const [errorMessage, setErrormessaage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
    fetchDataForAllCompanies();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const companyResponse = await axiosInstance.get("/companylist");

      setCompanies(companyResponse.data.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
    setIsLoading(false);
  };
  const fetchDataForAllCompanies = async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      const data = {
        companyName: selectedCompany,
        date: formatDate(selectedDate),
        impactColour: impactColor,
        crossoverRangeStart: crossoverStart.toString() || "30",
        crossoverRangeEnd: crossoverEnd.toString() || "50",
      };
      console.log("fetchDataForAllCompanies", data);
      const response = await axiosInstance.post("/dashboard/crossover", {
        data,
      });
      console.log("Response of fetchDataForAllCompanies", response);
      if (response.data.status_code === 400) {
        setErrormessaage(response.data.message);
      } else if (response.data.status_code === 200) {
        // const responsejson = JSON.parse(response.data.data);
        setCurrentData(response.data.data);
      } else {
        setFetchError(true);
        setErrormessaage("An error occured, please try again later");
      }
    } catch (err) {
      console.error("Error fetching initial data:", err);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(currentData);
  const isSubmitDisabled = () => {
    // Disable button if all relevant fields are empty and no valid pair of crossover values is selected
    const noRelevantSelection =
      !selectedCompany.length &&
      !selectedDate &&
      !impactColor &&
      !crossoverStart &&
      !crossoverEnd;
    const partialCrossoverSelected =
      (crossoverStart && !crossoverEnd) || (!crossoverStart && crossoverEnd);

    return noRelevantSelection || partialCrossoverSelected;
  };
  const handleCrossoverChange = (value, type) => {
    if (type === "start") {
      setCrossoverStart(value);
      if (value && !crossoverEnd) {
        setErrors((prev) => ({
          ...prev,
          crossoverEnd:
            "Please select an end range if start range is selected.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, crossoverEnd: null }));
      }
    } else if (type === "end") {
      setCrossoverEnd(value);
      if (value && !crossoverStart) {
        setErrors((prev) => ({
          ...prev,
          crossoverStart:
            "Please select a start range if end range is selected.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, crossoverStart: null }));
      }
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!selectedCompany)
      newErrors.selectedCompany = "Please select a company.";
    // if (!crossoverStart)
    //   newErrors.crossoverStart = "Please select a start range.";
    // if (!crossoverEnd) newErrors.crossoverEnd = "Please select an end range.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchDataForCompany = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      console.log("After filter", selectedDate);
      const data = {
        companyName: selectedCompany,
        date: formatDate(selectedDate),
        impactColour: impactColor,
        crossoverRangeStart: crossoverStart.toString(),
        crossoverRangeEnd: crossoverEnd.toString(),
      };
      console.log("fetchDataForCompany", data);
      const response = await axiosInstance.post("/dashboard/crossover", {
        data,
      });
      console.log(response);
      if (response.data.status_code === 400) {
        setErrormessaage(response.data.message);
      } else if (response.data.status_code === 200) {
        // const responsejson = JSON.parse(response.data.data);

        setCurrentData(response.data.data);
      } else {
        setFetchError(true);
        setErrormessaage("An error occured, please try again later");
      }
    } catch (err) {
      console.error("Error fetching data for company:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRowClick = (item) => {
    console.log("item", item);
    navigate(`/dashboard/${item["company"].value}/historical`);
  };
  return (
    <div style={{ height: "calc(100% - 200px)", overflowY: "auto" }}>
      <div className={classes.analysisHeader}>
        <button
          className={classes.backButton}
          onClick={() => navigate("/dashboard")}
          aria-label="Back to Dashboard"
        >
          <ArrowBackIcon sx={{ fontSize: 40 }} />
        </button>
        <h1 style={{ textAlign: "center" }}>Crossover Analysis</h1>
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
          <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: "14%" }}
            error={!!errors.selectedCompany}
          >
            <InputLabel>Company</InputLabel>
            <Select
              multiple
              value={selectedCompany}
              label="Company"
              onChange={(e) => {
                const { value } = e.target;
                // Convert all selected companies to lowercase
                const lowercaseSelected = Array.isArray(value)
                  ? value.map((item) => item.toLowerCase())
                  : value.toLowerCase();
                setSelectedCompany(lowercaseSelected);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  selectedCompany: null,
                }));
              }}
              renderValue={(selected) => selected.join(", ")}
            >
              {dummyCompanyList.map((company) => (
                <MenuItem key={company} value={company}>
                  <Checkbox
                    checked={
                      selectedCompany.indexOf(company.toLowerCase()) > -1
                    }
                  />
                  <ListItemText primary={company} />
                </MenuItem>
              ))}
            </Select>
            {errors.selectedCompany && (
              <FormHelperText>{errors.selectedCompany}</FormHelperText>
            )}
          </FormControl>
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
          {/* <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
            <TextField
              label="End Date"
              type="date"
              value={selectedEndDate}
              name="endDate"
              onChange={(e) => setSelectedEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl> */}
          <FormControl fullWidth sx={{ mb: 2, maxWidth: "14%" }}>
            <InputLabel>Impact Color</InputLabel>
            <Select
              value={impactColor}
              label="Impact Color"
              onChange={(e) => setImpactColor(e.target.value)}
            >
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="green">Green</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: "14%" }}
            error={!!errors.crossoverStart}
          >
            <InputLabel>Crossover Start</InputLabel>
            <Select
              value={crossoverStart}
              label="Crossover Start"
              onChange={(e) => handleCrossoverChange(e.target.value, "start")}
            >
              {crossoverStartList.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            {errors.crossoverStart && (
              <FormHelperText>{errors.crossoverStart}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: "14%" }}
            error={!!errors.crossoverEnd}
          >
            <InputLabel>Crossover End</InputLabel>
            <Select
              value={crossoverEnd}
              label="Crossover End"
              onChange={(e) => handleCrossoverChange(e.target.value, "end")}
            >
              {crossoverEndList.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            {errors.crossoverEnd && (
              <FormHelperText>{errors.crossoverEnd}</FormHelperText>
            )}
          </FormControl> */}
          <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: "14%" }}
            error={!!errors.crossoverStart}
          >
            <InputLabel>Crossover Start</InputLabel>
            <Select
              value={crossoverStart}
              label="Crossover Start"
              onChange={(e) => handleCrossoverChange(e.target.value, "start")}
            >
              {crossoverStartList
                .filter((data) => data !== crossoverEnd)
                .map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
            </Select>
            {errors.crossoverStart && (
              <FormHelperText>{errors.crossoverStart}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            sx={{ mb: 2, maxWidth: "14%" }}
            error={!!errors.crossoverEnd}
          >
            <InputLabel>Crossover End</InputLabel>
            <Select
              value={crossoverEnd}
              label="Crossover End"
              onChange={(e) => handleCrossoverChange(e.target.value, "end")}
            >
              {crossoverEndList
                .filter((data) => data !== crossoverStart)
                .map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
            </Select>
            {errors.crossoverEnd && (
              <FormHelperText>{errors.crossoverEnd}</FormHelperText>
            )}
          </FormControl>

          <Button
            variant="contained"
            onClick={fetchDataForCompany}
            disabled={isSubmitDisabled()}
            sx={{ height: 56 }}
          >
            Submit
          </Button>
        </div>
      </div>
      {isLoading ? (
        <BeatLoader />
      ) : fetchError ? (
        <p>{errorMessage}</p>
      ) : currentData.length > 0 ? (
        <Table
          initialData={currentData}
          isRowClickable={true}
          onRowClick={handleRowClick}
        />
      ) : null}
    </div>
  );
};

export default CrossoverAnalysis;
