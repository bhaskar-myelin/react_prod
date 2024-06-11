import React, { useState, useEffect } from "react";
import Table from "./Table";
import { BeatLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import FilterData from "../Filter/FilterData";
import rhistorical from "../../dummydata/rhistorical.json";
import smahigh from "../../dummydata/smahigh.json";
import periodic from "../../dummydata/periodicanalysis.json";
import { axiosInstance } from "../../config/Config";

const TableContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Setting up tabs and mapping them to routes
  const tabs = [
    {
      id: 1,
      name: "Historical Analysis",
      route: "/dashboard/:companyName/historical",
      data: rhistorical,
    },
    {
      id: 2,
      name: "Periodic Analysis",
      route: "/dashboard/:companyName/periodic",
      data: periodic,
    },
    {
      id: 3,
      name: "SMA High",
      route: "/dashboard/:companyName/sma",
      data: smahigh,
    },
    {
      id: 4,
      name: "Crossover Analysis",
      route: "/dashboard/:companyName/crossover",
      // API call is needed for this tab, hence no default 'data' property here
    },
  ];

  const [currentTab, setCurrentTab] = useState(findInitialTab());
  const [currentData, setCurrentData] = useState(getDataForTab(currentTab));
  const [isLoading, setIsLoading] = useState(false);

  // Determine the initial tab based on the route
  function findInitialTab() {
    const tab = tabs.find((tab) =>
      location.pathname.includes(tab.route.split("/:")[0])
    );
    return tab ? tab.id : 1;
  }

  // Fetching data based on the tab
  function getDataForTab(tabId) {
    const tab = tabs.find((t) => t.id === tabId);
    return tab.data || null; // Return null if it's the API-driven tab (i.e., crossover)
  }

  useEffect(() => {
    const fetchTabData = async () => {
      setIsLoading(true);
      const tab = tabs.find((tab) => tab.id === currentTab);

      if (tab) {
        navigate(
          tab.route.replace(":companyName", location.pathname.split("/")[2])
        ); // Dynamic route adjustment

        if (tab.id === 4) {
          // Check if it's the Crossover Analysis tab
          try {
            const params = {
              companyName: location.pathname.split("/")[2],
              startDate: "",
              endDate: "",
              crossoverRangeStart: "",
              crossoverRangeEnd: "",
            };
            console.log(params);
            const response = await axiosInstance.get("/dashboard_crossover", {
              params,
            });
            setCurrentData(response.data);
          } catch (error) {
            console.log("Error fetching crossover data:", error);
            setCurrentData([]);
          }
        }
        // else if (tab.id === 1) {
        //   // Check if it's the Crossover Analysis tab
        //   try {
        //     const params = {
        //       companyName: location.pathname.split("/")[2],
        //       startDate: "",
        //       endDate: "",
        //       crossoverRangeStart: "",
        //       crossoverRangeEnd: "",
        //     };
        //     console.log(params);
        //     const response = await axiosInstance.get("/dashboard_historical", {
        //       params,
        //     });
        //     setCurrentData(response.data);
        //   } catch (error) {
        //     console.log("Error fetching historical data:", error);
        //     setCurrentData([]);
        //   }
        // }
        else {
          setCurrentData(tab.data); // Use static JSON data for other tabs
        }
      }

      setIsLoading(false);
    };

    fetchTabData();
  }, [currentTab]);

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
  };

  return (
    <div>
      <FilterData
        activeTabId={currentTab}
        onFilterSubmit={(filters) => console.log(filters)}
      />
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
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div style={{ height: "800px", overflowY: "auto" }}>
        {isLoading ? (
          <BeatLoader
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          />
        ) : (
          <>
            <Table initialData={currentData} />
          </>
        )}
      </div>
    </div>
  );
};

export default TableContainer;

// import React, { useState, useEffect, useRef } from "react";
// import Table from "./Table";
// import { BeatLoader } from "react-spinners";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import rhistorical from "../../dummydata/rhistorical.json";
// import crossover from "../../dummydata/crossover.json";
// import smahigh from "../../dummydata/smahigh.json";
// import periodic from "../../dummydata/periodicanalysis.json";
// import FilterData from "../Filter/FilterData";

// const TableContainer = () => {
//   const tabs = [
//     { id: 1, name: "Historical Analysis", data: rhistorical },
//     { id: 2, name: "Periodic Analysis", data: periodic },
//     { id: 3, name: "SMA High", data: smahigh },
//     { id: 4, name: "Crossover Analysis", data: crossover },
//   ];

//   const [currentTab, setCurrentTab] = useState(tabs[0].id);
//   const [isLoading, setIsLoading] = useState(false);
//   const tableContainerRef = useRef(null);

//   useEffect(() => {
//     setIsLoading(true);
//     // Simulate loading data
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 100);
//   }, [currentTab]);

//   const handleTabClick = (tabId) => {
//     setCurrentTab(tabId);
//   };

//   return (
//     <div>
//       <FilterData onFilterSubmit={(filters) => console.log(filters)} />
//       <div
//         style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
//       >
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             style={{
//               padding: "10px 20px",
//               margin: "0 10px",
//               cursor: "pointer",
//               backgroundColor: currentTab === tab.id ? "#ccc" : "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//             }}
//             onClick={() => handleTabClick(tab.id)}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div
//         ref={tableContainerRef}
//         style={{ height: "800px", overflowY: "auto" }}
//       >
//         {isLoading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               paddingTop: "20px",
//             }}
//           >
//             <BeatLoader />
//           </div>
//         ) : (
//           <Table initialData={tabs.find((tab) => tab.id === currentTab).data} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TableContainer;
