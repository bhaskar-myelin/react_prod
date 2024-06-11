/** Table with given json data */
// import React, { useEffect, useState } from "react";

// // Assuming jsonData is passed as a prop to your Table component
// const Table = (props) => {
//   const initialData = props.initialData;
//   const [tableData, setTableData] = useState(() =>
//     processTableData(initialData)
//   );

//   useEffect(() => {
//     // This effect listens for changes in initialData
//     // If initialData changes, append new data to the existing tableData
//     const newData = processTableData(initialData);
//     setTableData((prevData) => {
//       // Optimizing to avoid unnecessary updates if the data hasn't actually changed
//       if (JSON.stringify(newData.rows) === JSON.stringify(prevData.rows)) {
//         return prevData;
//       }
//       return {
//         headers: newData.headers, // Assuming headers remain constant, otherwise merge as needed
//         rows: [...prevData.rows, ...newData.rows], // Append new rows to existing rows
//       };
//     });
//   }, [initialData]); // Depend on initialData

//   return (
//     <table style={{ width: "100%", borderCollapse: "collapse" }}>
//       <thead>
//         <tr>
//           {tableData.headers.map((header, index) => (
//             <th key={index} style={{ border: "1px solid black", padding: 10 }}>
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.rows.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {row.map((cell, cellIndex) => (
//               <td
//                 key={cellIndex}
//                 style={{
//                   border: "1px solid black",
//                   padding: 10,
//                   backgroundColor: cell.color,
//                   color: "#000",
//                 }}
//               >
//                 {cell.value}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// // Utility function to process table data
// function processTableData(jsonData) {
//   console.log(jsonData);
//   const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
//   const rows = jsonData.map((item) =>
//     headers.map((header) => {
//       const data = item[header]?.toString() || "";
//       const match = data.match(/(.+)<(.+)>/);
//       return {
//         value: match ? match[1] : data,
//         color: match ? match[2] : "transparent",
//       };
//     })
//   );
//   return { headers, rows };
// }

// export default Table;

/** Table with limited row numbers */
import React, { useState, useEffect, useCallback, useRef } from "react";

const ROWS_PER_PAGE = 50;

const Table = ({ initialData, isRowClickable = false, onRowClick }) => {
  // console.log("initialData", initialData);
  const [displayedData, setDisplayedData] = useState([]);
  const [loadedRows, setLoadedRows] = useState(0);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    const initialRows = processTableData(initialData.slice(0, ROWS_PER_PAGE));
    setDisplayedData(initialRows);
    setLoadedRows(initialRows.length);
  }, [initialData]);

  const handleScroll = useCallback(
    (e) => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
      if (bottom && loadedRows < initialData.length) {
        const nextDataChunk = initialData.slice(
          loadedRows,
          loadedRows + ROWS_PER_PAGE
        );
        // console.log("nextDataChunk", nextDataChunk);
        const processedData = processTableData(nextDataChunk);
        setDisplayedData((prevData) => [...prevData, ...processedData]);
        setLoadedRows(loadedRows + processedData.length);
      }
    },
    [loadedRows, initialData]
  );

  const handleClick = (item) => {
    if (isRowClickable && onRowClick) {
      onRowClick(item);
    }
  };
  const colorHexCodes = {
    orange: "#ffce12",
    green: "#6dea58",
    red: "#ff0000",
    pink: "#FF9EAA",
    blue: "#00a3ef",
  };

  const getColorHexCode = (color) => {
    return colorHexCodes[color] || color; // Fallback to the original color if not found
  };
  return (
    <div
      ref={tableContainerRef}
      style={{ overflow: "auto", height: "700px" }}
      onScroll={handleScroll}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "auto",
        }}
      >
        <thead>
          {displayedData.length > 0 && (
            <tr>
              {Object.keys(displayedData[0]).map((header, index) => {
                const formattedHeader = header.replace(/_/g, " ");
                return (
                  <th
                    key={index}
                    style={{
                      border: "2px solid grey",
                      padding: "5px",
                      backgroundColor: "#1976D2",
                      color: "#fff",
                      minWidth: index === 1 ? "80px" : "50px",
                      width: index === 1 ? "80px" : "80px",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      textAlign: "center",
                    }}
                  >
                    {formattedHeader[0].toUpperCase() +
                      formattedHeader.slice(1)}
                    {/* {formattedHeader} */}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody>
          {displayedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleClick(row)}
              style={{ cursor: isRowClickable ? "pointer" : "default" }}
            >
              {Object.entries(row).map(([key, cell], cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: "1px solid #E3E1D9",
                    padding: "5px",
                    backgroundColor: getColorHexCode(cell.color),
                    minWidth: cellIndex === 1 ? "80px" : "50px",
                    textAlign: "center", // Center align text in data cells
                  }}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // function processTableData(jsonData) {
  //   console.log(jsonData);
  //   return jsonData.map((item) => {
  //     const processedItem = {};
  //     for (const [key, value] of Object.entries(item)) {
  //       const data = value?.toString() || "";
  //       const match = data.match(/(?:([^<]+))?(<(.+)>)?/);
  //       const actualValue = match && match[1] ? match[1].trim() : "";
  //       const color = match && match[3] ? match[3].trim() : "transparent";
  //       processedItem[key] = {
  //         value: actualValue,
  //         color: color,
  //       };
  //     }
  //     return processedItem;
  //   });
  // }
  function processTableData(jsonData) {
    console.log(jsonData);
    return jsonData.map((item) => {
      const processedItem = {};
      for (const [key, value] of Object.entries(item)) {
        const data = value?.toString() || "";
        const match = data.match(/(?:([^<]+))?(<(.+)>)?/);
        let actualValue = match && match[1] ? match[1].trim() : "";
        const color = match && match[3] ? match[3].trim() : "transparent";

        // Check if the actual value is "NaN" and set it to an empty string if true
        if (actualValue === "NaN") {
          actualValue = "";
        }

        processedItem[key] = {
          value: actualValue,
          color: color,
        };
      }
      return processedItem;
    });
  }
};
export default Table;

// /**Fixed column table */
// import React, { useState, useEffect, useCallback, useRef } from "react";

// const ROWS_PER_PAGE = 50; // Number of rows to render at a time

// const Table = ({ initialData }) => {
//   const [displayedData, setDisplayedData] = useState([]);
//   const [loadedRows, setLoadedRows] = useState(0);
//   const tableContainerRef = useRef(null);

//   useEffect(() => {
//     const initialRows = processTableData(initialData.slice(0, ROWS_PER_PAGE));
//     setDisplayedData(initialRows);
//     setLoadedRows(initialRows.length);
//   }, [initialData]);

//   const handleScroll = useCallback(
//     (e) => {
//       const bottom =
//         e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
//       if (bottom && loadedRows < initialData.length) {
//         const nextDataChunk = initialData.slice(
//           loadedRows,
//           loadedRows + ROWS_PER_PAGE
//         );
//         const processedData = processTableData(nextDataChunk);
//         setDisplayedData((prevData) => [...prevData, ...processedData]);
//         setLoadedRows(loadedRows + processedData.length);
//       }
//     },
//     [loadedRows, initialData]
//   );

//   return (
//     <div
//       ref={tableContainerRef}
//       style={{ overflowY: "auto", height: "900px" }}
//       onScroll={handleScroll}
//     >
//       {/* Table consisting of both fixed and scrollable columns */}
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         {/* Fixed Columns */}
//         <div style={{ paddingRight: "1px" }}>
//           <table style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
//             <thead>
//               <tr>
//                 {displayedData.length > 0 &&
//                   Object.keys(displayedData[0])
//                     .slice(0, 3)
//                     .map((header, index) => (
//                       <th
//                         key={index}
//                         style={{
//                           border: "1px solid black",
//                           padding: 5,
//                           position: "sticky",
//                           top: 0,
//                           backgroundColor: "#8576FF",
//                           minWidth: "120px",
//                           zIndex: 2,
//                         }}
//                       >
//                         {header}
//                       </th>
//                     ))}
//               </tr>
//             </thead>
//             <tbody>
//               {displayedData.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.entries(row)
//                     .slice(0, 3)
//                     .map(([key, cell], cellIndex) => (
//                       <td
//                         key={cellIndex}
//                         style={{
//                           border: "1px solid black",
//                           padding: 10,
//                           backgroundColor: cell.color,
//                           position: "sticky",
//                           left: `${cellIndex * 120}px`,
//                         }}
//                       >
//                         {cell.value}
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Scrollable Columns */}
//         <div style={{ overflowX: "auto" }}>
//           <table
//             style={{
//               borderCollapse: "collapse",
//               tableLayout: "fixed",
//               width: "auto",
//             }}
//           >
//             <thead>
//               <tr>
//                 {displayedData.length > 0 &&
//                   Object.keys(displayedData[0])
//                     .slice(3)
//                     .map((header, index) => (
//                       <th
//                         key={index}
//                         style={{
//                           border: "1px solid black",
//                           padding: 5,
//                           backgroundColor: "#8576FF",
//                           whiteSpace: "normal",
//                           wordWrap: "break-word",
//                           minWidth: "180px",
//                           position: "sticky",
//                           top: 0,
//                           zIndex: 1,
//                         }}
//                       >
//                         {header}
//                       </th>
//                     ))}
//               </tr>
//             </thead>
//             <tbody>
//               {displayedData.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.entries(row)
//                     .slice(3)
//                     .map(([key, cell], cellIndex) => (
//                       <td
//                         key={cellIndex + 3}
//                         style={{
//                           border: "1px solid black",
//                           padding: 10,
//                           backgroundColor: cell.color,
//                         }}
//                       >
//                         {cell.value}
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // function processTableData(jsonData) {
// //   return jsonData.map((item) => {
// //     const processedItem = {};
// //     for (const [key, value] of Object.entries(item)) {
// //       const data = value?.toString() || "";
// //       const match = data.match(/(.+)<(.+)>/);
// //       processedItem[key] = {
// //         value: match ? match[1] : data,
// //         color: match ? match[2] : "transparent",
// //       };
// //     }
// //     return processedItem;
// //   });
// // }
// function processTableData(jsonData) {
//   return jsonData.map((item) => {
//     const processedItem = {};
//     for (const [key, value] of Object.entries(item)) {
//       // Convert the value to a string for safe processing
//       const data = value?.toString() || "";

//       // Match patterns like "591.49<green>" or standalone "<red>"
//       const match = data.match(/(?:([^<]+))?(<(.+)>)?/);

//       // Extract the value and color from the match
//       const actualValue = match && match[1] ? match[1].trim() : "";
//       const color = match && match[3] ? match[3].trim() : "transparent";

//       // Check if there is an actual value; if not, do not display any text content
//       processedItem[key] = {
//         value: actualValue,
//         color: color,
//       };
//     }
//     return processedItem;
//   });
// }

// export default Table;

// import React, { useState, useEffect, useRef } from "react";

// const ROWS_PER_PAGE = 50;

// const Table = ({ initialData }) => {
//   const [displayedData, setDisplayedData] = useState([]);
//   const scrollRef = useRef(null); // Reference for vertical scrolling

//   useEffect(() => {
//     const initialRows = processTableData(initialData.slice(0, ROWS_PER_PAGE));
//     setDisplayedData(initialRows);
//   }, [initialData]);

//   return (
//     <div
//       ref={scrollRef}
//       style={{ overflowY: "auto", height: "900px", display: "flex" }}
//     >
//       {/* Fixed Columns */}
//       <div style={{ flexShrink: 0 }}>
//         <table style={{ borderCollapse: "collapse", marginRight: "5px" }}>
//           <thead>
//             <tr>
//               {displayedData.length > 0 &&
//                 Object.keys(displayedData[0])
//                   .slice(0, 3)
//                   .map((header, index) => (
//                     <th
//                       key={index}
//                       style={{
//                         border: "1px solid black",
//                         padding: 5,
//                         backgroundColor: "#8576FF",
//                         minWidth: "120px",
//                         position: "sticky",
//                         left: 0,
//                         zIndex: 2,
//                       }}
//                     >
//                       {header}
//                     </th>
//                   ))}
//             </tr>
//           </thead>
//           <tbody>
//             {displayedData.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {Object.entries(row)
//                   .slice(0, 3)
//                   .map(([key, cell], cellIndex) => (
//                     <td
//                       key={cellIndex}
//                       style={{
//                         border: "1px solid black",
//                         padding: 10,
//                         backgroundColor: cell.color,
//                         position: "sticky",
//                         left: 0,
//                       }}
//                     >
//                       {cell.value}
//                     </td>
//                   ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Scrollable Columns */}
//       <div style={{ flex: 1, overflowX: "auto" }}>
//         <table
//           style={{
//             borderCollapse: "collapse",
//             tableLayout: "fixed",
//             width: "auto",
//           }}
//         >
//           <thead>
//             <tr>
//               {displayedData.length > 0 &&
//                 Object.keys(displayedData[0])
//                   .slice(3)
//                   .map((header, index) => (
//                     <th
//                       key={index}
//                       style={{
//                         border: "1px solid black",
//                         padding: 5,
//                         backgroundColor: "#8576FF",
//                         minWidth: "120px",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 1,
//                       }}
//                     >
//                       {header}
//                     </th>
//                   ))}
//             </tr>
//           </thead>
//           <tbody>
//             {displayedData.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {Object.entries(row)
//                   .slice(3)
//                   .map(([key, cell], cellIndex) => (
//                     <td
//                       key={cellIndex + 3}
//                       style={{
//                         border: "1px solid black",
//                         padding: 10,
//                         backgroundColor: cell.color,
//                       }}
//                     >
//                       {cell.value}
//                     </td>
//                   ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// function processTableData(jsonData) {
//   return jsonData.map((item) => {
//     const processedItem = {};
//     for (const [key, value] of Object.entries(item)) {
//       // Convert the value to a string for safe processing
//       const data = value?.toString() || "";

//       // Match patterns like "591.49<green>" or standalone "<red>"
//       const match = data.match(/(?:([^<]+))?(<(.+)>)?/);

//       // Extract the value and color from the match
//       const actualValue = match && match[1] ? match[1].trim() : "";
//       const color = match && match[3] ? match[3].trim() : "transparent";

//       // Check if there is an actual value; if not, do not display any text content
//       processedItem[key] = {
//         value: actualValue,
//         color: color,
//       };
//     }
//     return processedItem;
//   });
// }

// export default Table;
