import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import classes from "./Analysis.module.css";
import rhistorical from "../../dummydata/rhistorical.json";
import smahigh from "../../dummydata/smahigh.json";
import periodic from "../../dummydata/periodicanalysis.json";
import crossover from "../../dummydata/crossover.json";
import aftereffect from "../../dummydata/aftereffect.json";
import Table from "../Table/Table";
import { axiosInstance } from "../../config/Config";
 
const Analysis = () => {
  const { companyName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownValuesReady, setDropdownValuesReady] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const [ATHValue, setATHValue] = useState(0);
  const [ATHDate, setATHDate] = useState("");
 
  const [ATLValue, setATLValue] = useState(0);
  const [ATLDate, setATLDate] = useState("");
 
  const [YHValue, setYHValue] = useState(0);
  const [YHDate, setYHDate] = useState("");
 
 
  const [YLValue, setYLValue] = useState(0);
  const [YLDate, setYLDate] = useState("");
 
  const tabs = useMemo(
    () => [
      {
        id: 1,
        name: "Historical Analysis",
        route: `/dashboard/${companyName}/historical`,
        apiEndpoint: "/historicalanalysis",
        fallbackData: rhistorical,
        dropdowns: [
          {
            name: "Type",
            options: ["Historical", "Colour"],
            defaultValue: "Historical",
          },
        ],
      },
      {
        id: 2,
        name: "Periodic Analysis",
        route: `/dashboard/${companyName}/periodic`,
        apiEndpoint: "/periodicanalysis",
        fallbackData: periodic,
        dropdowns: [
          {
            name: "interval",
            options: ["Year", "Quarter", "Month"],
            defaultValue: "Year",
          },
        ],
      },
      {
        id: 3,
        name: "SMA High",
        route: `/dashboard/${companyName}/sma`,
        apiEndpoint: "/smahigh",
        fallbackData: smahigh,
        dropdowns: [
          {
            name: "interval",
            options: ["Year", "Quarter", "Month"],
            defaultValue: "Year",
          },
        ],
      },
      {
        id: 4,
        name: "Crossover Analysis",
        route: `/dashboard/${companyName}/crossover`,
        apiEndpoint: "/crossoveranalysis",
        fallbackData: crossover,
        dropdowns: [
          {
            name: "Crossover_Start",
            options: [
              10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500,
              2000, 2500, 3000, 3500,
            ],
            defaultValue: 30,
          },
          {
            name: "Crossover_End",
            options: [
              10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500,
              2000, 2500, 3000, 3500,
            ],
            defaultValue: 50,
          },
        ],
      },
      {
        id: 5,
        name: "After effect",
        route: `/dashboard/${companyName}/aftereffect`,
        apiEndpoint: "/aftereffect",
        fallbackData: aftereffect,
        dropdowns: [
          {
            name: "Rate",
            options: [5, 10, 15],
            defaultValue: 5,
          },
        ],
      },
    ],
    [companyName]
  );
 
  const findInitialTabId = () => {
    const matchingTab = tabs.find((tab) =>
      location.pathname.includes(tab.route)
    );
    return matchingTab ? matchingTab.id : tabs[0].id;
  };
 
  const [currentTab, setCurrentTab] = useState(findInitialTabId());
  const [tableData, setTableData] = useState([]);
 
  useEffect(() => {
    const foundTab = tabs.find((tab) => location.pathname.includes(tab.route));
    setCurrentTab(foundTab ? foundTab.id : tabs[0].id);
  }, [location.pathname, tabs]);
 
  const [dropdownValues, setDropdownValues] = useState({});
  useEffect(() => {
    // setDropdownValuesReady(false);
    const initialTab = tabs.find((tab) => tab.id === currentTab);
    if (initialTab) {
      const newDropdownValues = initialTab.dropdowns.reduce(
        (acc, dropdown) => ({
          ...acc,
          [dropdown.name]: dropdown.defaultValue,
        }),
        {}
      );
 
      setDropdownValues(newDropdownValues);
      setDropdownValuesReady(true);
    }
  }, [currentTab, tabs]);
 
  useEffect(() => {
    if (dropdownValuesReady) {
      fetchTableData();
    }
  }, [dropdownValuesReady, currentTab, companyName, dropdownValues, tabs]); // Fetch data when tab or dropdowns change
  // const [dropdownValues, setDropdownValues] = useState();
 
  useEffect(() => {
    const initialTab = tabs.find((tab) => tab.id === currentTab);
    if (initialTab) {
      const newDropdownValues = initialTab.dropdowns.reduce(
        (acc, dropdown) => ({
          ...acc,
          [dropdown.name]: dropdown.defaultValue,
        }),
        {}
      );
 
      setDropdownValues(newDropdownValues);
    }
  }, [currentTab, tabs]);
  useEffect(() => {
    console.log(dropdownValues);
  }, [dropdownValues]);
 
  const fetchTableData = async () => {
    const tab = tabs.find((tab) => tab.id === currentTab);
    if (tab) {
      // Create a new params object where string values are converted to lowercase
      // const params = {
      //   companyName,
      //   ...Object.entries(dropdownValues).reduce((acc, [key, value]) => {
      //     // Check if the value is a string and convert it to lowercase
      //     acc[key] = typeof value === "string" ? value.toLowerCase() : value;
      //     return acc;
      //   }, {}),
      // };
      const params = {
        companyName,
        ...Object.entries(dropdownValues).reduce((acc, [key, value]) => {
          if (typeof value === "string") {
            // Convert to lowercase and replace spaces with underscores
            value = value.toLowerCase().replace(/\s+/g, '_');
          }
          acc[key] = value;
          return acc;
        }, {}),
      };
      setLoading(true);
 
      try {
        console.log("Params", params);
        const response = await axiosInstance.get(tab.apiEndpoint, { params });
        console.log("response from Analysis---->",response);

        console.log("type of response ---->",typeof response.data);
        // if (tab.apiEndpoint === "/crossoveranalysis") {
        //   const responsejson = JSON.parse(response.data.data);

        //   console.log("crossoveranalysis response parse--->", responsejson);
        //   setTableData(responsejson.data.data)
        // }
        setTableData(response.data.data);
        if (tab.apiEndpoint === "/historicalanalysis") {
          console.log("ATH", response.data.detail.ATH);
 
          setATHValue(response.data.detail.ATH);
          setATHDate(response.data.detail.ATH_date);
 
          setATLValue(response.data.detail.ATL);
          setATLDate(response.data.detail.ATL_date);
 
          setYHValue(response.data.detail.week_52_high);
          setYHDate(response.data.detail.week_52_high_date);
 
          setYLValue(response.data.detail.week_52_low);
          setYLDate(response.data.detail.week_52_low_date);
        }
      } catch (error) {
        console.error("API call failed: ", error);
        setTableData(tab.fallbackData);
      } finally {
        setLoading(false);
      }
    }
  };
  console.log("currentTab", currentTab);
  const handleTabClick = (route) => {
    navigate(route);
    setDropdownValuesReady(false);
  };
 
  const handleDropdownChange = (name, value) => {
    setDropdownValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const handleSaveValue = () => {
  //   const currentDropdown = tabs.find((tab) => tab.id === currentTab).dropdowns[0];
  //   const updatedOptions = [...currentDropdown.options, newDropdownValue];
  //   const updatedTab = tabs.map((tab) => {
  //     if (tab.id === currentTab) {
  //       return {
  //         ...tab,
  //         dropdowns: [
  //           {
  //             ...currentDropdown,
  //             options: updatedOptions,
  //           },
  //         ],
  //       };
  //     }
  //     return tab;
  //   });
  //   setTabs(updatedTab);
  //   setDropdownValues((prev) => ({
  //     ...prev,
  //     [currentDropdown.name]: newDropdownValue,
  //   }));
  //   setShowDialog(false);
  // };
 
  return (
    <div className={classes.analysis}>
      <div className={classes.analysisHeader}>
        <button
          className={classes.backButton}
          onClick={() => navigate("/dashboard")}
          aria-label="Back to Dashboard"
        >
          <ArrowBackIcon sx={{ fontSize: 40 }} />
        </button>
        <h1>Analysis for {companyName}</h1>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              padding: "10px 20px",
              margin: "0 10px",
              cursor: "pointer",
              backgroundColor: currentTab === tab.id ? "#ccc" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            onClick={() => handleTabClick(tab.route)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className={classes.dropdown}>
        {dropdownValuesReady &&
          tabs
            .find((tab) => tab.id === currentTab)
            .dropdowns.map((dropdown) => (
              <FormControl
                key={dropdown.name}
                style={{ margin: "10px", minWidth: 120 }}
                variant="outlined"
              >
                <InputLabel>{dropdown.name}</InputLabel>
                <Select
                  value={dropdownValues[dropdown.name]}
                  onChange={(e) =>
                    handleDropdownChange(dropdown.name, e.target.value)
                  }
                  label={dropdown.name}
                >
                  {dropdown.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
        {currentTab === 1 && (
          <div className={classes.values}>
            <div
              style={{ backgroundColor: "#ffce12", borderColor: "#ffce12" }}
              className={classes.valueBox}
            >
              ATH: {ATHValue} ( {ATHDate} )
            </div>
            <div
              style={{ backgroundColor: "#ff0000", borderColor: "#ff0000" }}
              className={classes.valueBox}
            >
              ATL:  {ATLValue} ( {ATLDate} )
            </div>
            <div
              style={{ backgroundColor: "#00a3ef", borderColor: "#00a3ef" }}
              className={classes.valueBox}
            >
              52 Week High: {YHValue} ( {YHDate} )
            </div>
            <div
              style={{ backgroundColor: "#FF9EAA", borderColor: "#FF9EAA" }}
              className={classes.valueBox}
            >
              52 Week Low: {YLValue} ( {YLDate} )
            </div>
          </div>
        )}
      </div>
      {loading ? <div>Loading...</div> : <Table initialData={tableData} />}
    </div>
  );
};
 
export default Analysis;
 