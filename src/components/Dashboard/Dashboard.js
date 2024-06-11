// import React, { createRef, useEffect, useState } from "react";
// import TableContainer from "../Table/TableContainer";
// import { CONSTANTS } from "../../utils/constants";
// import { ACTION_LIST } from "../../utils/dataset";
// import moment from "moment";
// import _ from "lodash";
// import Header from "../reusable/Header";
// import companylist from "..//../dummydata/companylist.json";
// import Table from "../Table/Table";
// import { BeatLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";
// import classes from "./Dashboard.module.css";
// import { axiosInstance } from "../../config/Config";

// const Dashboard = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [companyName, setCompanyName] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [companyPriceList, setCompanyPriceList] = useState([]);

//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchCompanyPriceData();
//   }, []);

//   const fetchCompanyPriceData = async () => {
//     try {
//       const response = await axiosInstance.get("/companypricedetails");
//       console.log(response.data);
//       if (response.data.status_code === 400) {
//         setErrorMessage(response.data.message);
//         console.log("2");
//       } else if (response.data.status_code === 200) {
//         console.log("1");
//         setCompanyPriceList(response.data.data);
//       }
//     } catch (err) {
//       setCompanyPriceList(companylist);
//     }
//   };
//   console.log(companyPriceList);
//   const handleRowClick = (item) => {
//     console.log("First column value:", item["Company Name"].value);
//     navigate(`/dashboard/${item["Company Name"].value}/historical`);
//   };

//   return (
//     <div className={classes.dashboard}>
//       <div className={classes.buttonsRow}>
//         <button onClick={() => navigate("/dashboard/crossover")}>
//           Crossover
//         </button>
//         <button onClick={() => navigate("/dashboard/periodic")}>
//           Periodic
//         </button>
//         <button onClick={() => navigate("/dashboard/historical")}>
//           Historical
//         </button>
//         <button onClick={() => navigate("/dashboard/sma")}>Color hit</button>
//       </div>
//       <div className={classes.dashboardHeader}>
//         <h2>Company List</h2>
//         <button
//           className={classes.uploadButton}
//           onClick={() => navigate("/upload")}
//         >
//           Upload closing price
//         </button>
//       </div>

//       {isLoading ? (
//         <BeatLoader />
//       ) : (
//         <Table
//           initialData={companyPriceList}
//           isRowClickable={true}
//           onRowClick={handleRowClick}
//         />
//       )}
//       {/* <TableContainer /> */}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import TableContainer from "../Table/TableContainer";
import { CONSTANTS } from "../../utils/constants";
import { ACTION_LIST } from "../../utils/dataset";
import moment from "moment";
import _ from "lodash";
import Header from "../reusable/Header";
import companylist from "..//../dummydata/companylist.json";
import Table from "../Table/Table";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import { axiosInstance } from "../../config/Config";
import { TextField, Button, Box } from "@mui/material";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [companyPriceList, setCompanyPriceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/search_company?pattern=${query}`
      );
      if (response.data.status_code === 200) {
        setCompanyPriceList(response.data.data);
      } else {
        setCompanyPriceList([]);
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      setCompanyPriceList([]);
      setErrorMessage("An error occurred while fetching company data.");
    }
    setIsLoading(false);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchCompanyData(query);
  };

  const handleLetterClick = (letter) => {
    setSearchQuery(letter);
    fetchCompanyData(letter);
  };

  const handleRowClick = (item) => {
    console.log("item", item);
    navigate(`/dashboard/${item["Company Name"].value}/historical`);
  };

  const renderAlphabetButtons = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((letter) => (
      <Button
        sx={{ minWidth: 25 }}
        key={letter}
        variant="outlined"
        onClick={() => handleLetterClick(letter)}
        className={classes.letterButton}
      >
        {letter}
      </Button>
    ));
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.buttonsRow}>
        <button onClick={() => navigate("/dashboard/crossover")}>
          Crossover
        </button>
        <button onClick={() => navigate("/dashboard/periodic")}>
          Periodic
        </button>
        <button onClick={() => navigate("/dashboard/historical")}>
          Historical
        </button>
        <button onClick={() => navigate("/dashboard/sma")}>Color hit</button>
      </div>
      <div className={classes.dashboardHeader}>
        <h2>Company List</h2>
        <button
          className={classes.uploadButton}
          onClick={() => navigate("/upload")}
        >
          Upload closing price
        </button>
      </div>

      <div className={classes.alphabetButtonsContainer}>
        {renderAlphabetButtons()}
      </div>

      <div className={classes.searchContainer}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search for a company..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={classes.searchBox}
        />
      </div>

      {isLoading ? (
        <BeatLoader />
      ) : (
        <Table
          initialData={companyPriceList}
          isRowClickable={true}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import TableContainer from "../Table/TableContainer";
// import { CONSTANTS } from "../../utils/constants";
// import { ACTION_LIST } from "../../utils/dataset";
// import moment from "moment";
// import _ from "lodash";
// import Header from "../reusable/Header";
// import companylist from "..//../dummydata/companylist.json";
// import Table from "../Table/Table";
// import { BeatLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";
// import classes from "./Dashboard.module.css";
// import { axiosInstance } from "../../config/Config";

// const Dashboard = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [companyName, setCompanyName] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [companyPriceList, setCompanyPriceList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCompanyData();
//   }, []);

//   const fetchCompanyData = async (query = "") => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `/search_company?pattern=${query}`
//       );
//       if (response.data.status_code === 200) {
//         setCompanyPriceList(response.data.data);
//       } else {
//         setCompanyPriceList([]);
//         setErrorMessage(response.data.message);
//       }
//     } catch (err) {
//       setCompanyPriceList([]);
//       setErrorMessage("An error occurred while fetching company data.");
//     }
//     setIsLoading(false);
//   };

//   const handleSearchChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     fetchCompanyData(query);
//   };

//   const handleRowClick = (item) => {
//     navigate(`/dashboard/${item["Company Name"].value}/historical`);
//   };

//   return (
//     <div className={classes.dashboard}>
//       <div className={classes.buttonsRow}>
//         <button onClick={() => navigate("/dashboard/crossover")}>
//           Crossover
//         </button>
//         <button onClick={() => navigate("/dashboard/periodic")}>
//           Periodic
//         </button>
//         <button onClick={() => navigate("/dashboard/historical")}>
//           Historical
//         </button>
//         <button onClick={() => navigate("/dashboard/sma")}>Color hit</button>
//       </div>
//       <div className={classes.dashboardHeader}>
//         <h2>Company List</h2>
//         <button
//           className={classes.uploadButton}
//           onClick={() => navigate("/upload")}
//         >
//           Upload closing price
//         </button>
//       </div>

//       <div className={classes.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search for a company..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className={classes.searchBox}
//         />
//       </div>

//       {isLoading ? (
//         <BeatLoader />
//       ) : (
//         <Table
//           initialData={companyPriceList}
//           isRowClickable={true}
//           onRowClick={handleRowClick}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;
