// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Box,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Autocomplete,
//   CircularProgress,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import classes from "./Upload.module.css";
// import { axiosInstance } from "../../config/Config";
// import { useNavigate } from "react-router-dom";

// import Papa from "papaparse";

// const Upload = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     date: "",
//     closingPrice: "",
//   });
//   const [file, setFile] = useState(null);
//   const [companies, setCompanies] = useState([]);
//   const [newCompanyName, setNewCompanyName] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const response = await axiosInstance.get("/companylist");
//       setCompanies(response.data.data);
//     } catch (err) {
//       console.error("Error fetching companies:", err);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const payload = [
//       {
//         companyName: formData.companyName,
//         date: formData.date,
//         closingPrice: formData.closingPrice,
//       },
//     ];
//     console.log("companyName", formData.companyName);
//     console.log("payload from form", payload);
//     try {
//       const response = await axiosInstance.post("/uploadclosingprice", payload);
//       console.log("Data submitted:", response.data);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   const handleFileSubmit = () => {
//     if (!file) {
//       alert("Please upload a file first.");
//       return;
//     }
//     setIsLoading(true);
//     Papa.parse(file, {
//       complete: async (results) => {
//         // Ignore the header row and any empty rows
//         const rawData = results.data.slice(1); // Slice from the second row to ignore headers

//         // Filter out any rows that are not exactly 3 cells or contain only whitespace
//         const filteredData = rawData.filter(
//           (row) => row.length === 3 && row.every((cell) => cell.trim() !== "")
//         );

//         // Map the filtered data to the expected JSON structure
//         const payload = filteredData.map((row) => {
//           const formattedDate = formatDate(row[1].trim());

//           return {
//             companyName: row[0].trim(),
//             date: formattedDate,
//             closingPrice: row[2].trim(),
//           };
//         });

//         console.log("payload from csv", payload);
//         try {
//           const response = await axiosInstance.post(
//             "/uploadclosingprice",
//             payload
//           );
//           console.log("CSV Data submitted:", response.data);
//         } catch (error) {
//           console.error("Error uploading CSV data:", error);
//         } finally {
//           setIsLoading(false); // End loading after the network request
//         }
//       },
//       header: false,
//     });
//   };
//   const handleAddCompany = async () => {
//     try {
//       console.log(newCompanyName);
//       const response = await axiosInstance.post(
//         "/addcompany",
//         {
//           companyName: newCompanyName,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(newCompanyName);
//       setCompanies([...companies, newCompanyName]);
//       setNewCompanyName("");
//       setOpenDialog(false);
//     } catch (error) {
//       console.error("Error adding company:", error);
//     }
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.getDate()} ${date.toLocaleDateString("en-US", {
//       month: "short",
//     })} ${date.getFullYear()}`;
//   };
//   return (
//     <div className={classes.upload}>
//       <div className={classes.uploadHeader}>
//         <button
//           className={classes.backButton}
//           onClick={() => navigate("/dashboard")}
//           aria-label="Back to Dashboard"
//         >
//           <ArrowBackIcon sx={{ fontSize: 40 }} />
//         </button>
//         <h1 style={{ textAlign: "center" }}>Upload Closing Price</h1>
//       </div>
//       <div className={classes.uploadForm}>
//         <Box
//           component="form"
//           sx={{ "& > :not(style)": { m: 1 }, width: "100%" }}
//           noValidate
//           autoComplete="off"
//           onSubmit={handleSubmit}
//         >
//           <Autocomplete
//             value={formData.companyName}
//             onChange={(event, newValue) => {
//               if (newValue === "+ Add New Company") {
//                 setNewCompanyName("");
//                 setOpenDialog(true);
//               } else {
//                 setFormData((prevState) => ({
//                   ...prevState,
//                   companyName: newValue,
//                 }));
//               }
//             }}
//             inputValue={newCompanyName}
//             onInputChange={(event, newInputValue) => {
//               setNewCompanyName(newInputValue);
//             }}
//             options={[...companies, "+ Add New Company"]}
//             // getOptionLabel={(option) => option}
//             renderOption={(props, option) => (
//               <li {...props}>
//                 {option === "+ Add New Company" ? (
//                   <Typography color="primary" style={{ fontWeight: "bold" }}>
//                     {option}
//                   </Typography>
//                 ) : (
//                   option
//                 )}
//               </li>
//             )}
//             renderInput={(params) => (
//               <TextField {...params} label="Select Company" fullWidth />
//             )}
//             freeSolo
//           />

//           <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//             <DialogTitle>Add a New Company</DialogTitle>
//             <DialogContent>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 label="Company Name"
//                 type="text"
//                 fullWidth
//                 value={newCompanyName}
//                 onChange={(e) => setNewCompanyName(e.target.value)}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//               <Button onClick={() => handleAddCompany()}>Add</Button>
//             </DialogActions>
//           </Dialog>

//           <TextField
//             label="Date"
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="Closing Price"
//             type="text"
//             name="closingPrice"
//             value={formData.closingPrice}
//             onChange={handleChange}
//             fullWidth
//           />

//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Submit
//           </Button>

//           <Typography
//             variant="body2"
//             sx={{ mt: 2, mb: 1, textAlign: "center" }}
//           >
//             Or upload CSV file
//           </Typography>

//           <Box display="flex" justifyContent="center" gap={2}>
//             <input
//               accept=".csv"
//               style={{ display: "none" }}
//               id="raised-button-file"
//               multiple
//               type="file"
//               onChange={handleFileChange}
//             />
//             <label htmlFor="raised-button-file">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 component="span"
//                 startIcon={<CloudUploadIcon />}
//               >
//                 Upload CSV
//               </Button>
//             </label>
//             {isLoading ? (
//               <CircularProgress />
//             ) : (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleFileSubmit}
//               >
//                 Save
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Upload;

import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import classes from "./Upload.module.css";
import { axiosInstance } from "../../config/Config";
import { useNavigate } from "react-router-dom";
import {formatDate} from "../../utils/functions"


import Papa from "papaparse";

const Upload = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    date: "",
    closingPrice: "",
  });
  const [file, setFile] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get("/companylist");
      setCompanies(response.data.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData.date);
    console.log(formatDate(formData.date));
    const payload = [
      {
        companyName: formData.companyName,
        date: formatDate(formData.date),
        closingPrice: formData.closingPrice,
      },
    ];
    console.log("payload", payload);
    try {
      const response = await axiosInstance.post("/uploadclosingprice", payload);
      setSnackbarMessage(response.data.message); // Assuming the response has a message property
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Failed to upload data"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFileSubmit = () => {
    if (!file) {
      setSnackbarMessage("Please upload a file first.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    setIsLoading(true);
    Papa.parse(file, {
      complete: async (results) => {
        const rawData = results.data.slice(1);
        // Filter out any rows that are not exactly 3 cells or contain only whitespace
        const filteredData = rawData.filter(
          (row) => row.length === 3 && row.every((cell) => cell.trim() !== "")
        );
        const payload = filteredData.map((row) => {
          const formattedDate = formatDate(row[1].trim());

          return {
            companyName: row[0].trim(),
            date: formattedDate,
            closingPrice: row[2].trim(),
          };
        });
        console.log("payload from csv", payload);
        try {
          const response = await axiosInstance.post(
            "/uploadclosingprice",
            payload
          );
          setSnackbarMessage(response.data.message);
          setSnackbarSeverity("success");
        } catch (error) {
          setSnackbarMessage(
            error.response?.data?.message || "Error uploading CSV data"
          );
          setSnackbarSeverity("error");
        } finally {
          setIsLoading(false);
          setSnackbarOpen(true);
        }
      },
      header: false,
    });
  };
  const handleAddCompany = async () => {
    try {
      console.log(newCompanyName);
      const response = await axiosInstance.post(
        "/addcompany",
        {
          companyName: newCompanyName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(newCompanyName);
      setCompanies([...companies, newCompanyName]);
      setNewCompanyName("");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return `${date.getDate()} ${date.toLocaleDateString("en-US", {
  //     month: "short",
  //   })} ${date.getFullYear()}`;
  // };
  return (
    <>
      <div className={classes.upload}>
        {snackbarOpen && (
          <Box className={classes.topAlert}>
            <Alert
              variant="filled"
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Box>
        )}
        <div className={classes.uploadHeader}>
          <button
            className={classes.backButton}
            onClick={() => navigate("/dashboard")}
            aria-label="Back to Dashboard"
          >
            <ArrowBackIcon sx={{ fontSize: 40 }} />
          </button>
          <h1 style={{ textAlign: "center" }}>Upload Closing Price</h1>
        </div>
        <div className={classes.uploadForm}>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1 }, width: "100%" }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Autocomplete
              value={formData.companyName}
              onChange={(event, newValue) => {
                if (newValue === "+ Add New Company") {
                  setNewCompanyName("");
                  setOpenDialog(true);
                } else {
                  setFormData((prevState) => ({
                    ...prevState,
                    companyName: newValue,
                  }));
                }
              }}
              inputValue={newCompanyName}
              onInputChange={(event, newInputValue) => {
                setNewCompanyName(newInputValue);
              }}
              options={[...companies, "+ Add New Company"]}
              // getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props}>
                  {option === "+ Add New Company" ? (
                    <Typography color="primary" style={{ fontWeight: "bold" }}>
                      {option}
                    </Typography>
                  ) : (
                    option
                  )}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Select Company" fullWidth />
              )}
              freeSolo
            />

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Add a New Company</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Company Name"
                  type="text"
                  fullWidth
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={() => handleAddCompany()}>Add</Button>
              </DialogActions>
            </Dialog>

            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Closing Price"
              type="text"
              name="closingPrice"
              value={formData.closingPrice}
              onChange={handleChange}
              fullWidth
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>

            <Typography
              variant="body2"
              sx={{ mt: 2, mb: 1, textAlign: "center" }}
            >
              Or upload CSV file
            </Typography>

            <Box display="flex" justifyContent="center" gap={2}>
              <input
                accept=".csv"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload CSV
                </Button>
              </label>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFileSubmit}
                >
                  Save
                </Button>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Upload;
