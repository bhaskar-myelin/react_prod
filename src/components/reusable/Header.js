// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { headerStyles } from "../_styles/ui";
// import { NavLink } from "react-router-dom";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { connect } from "react-redux";
// // import { logoutHandler } from '../../_redux/_actions/auth';
// import { Avatar, Toolbar } from "@mui/material";
// import _ from "lodash";
// import { CONSTANTS } from "../../utils/constants";
// // import classes from "./Header.module.css";
// const useStyles = (theme) => headerStyles(theme);

// const Header = ({
//   routeType,
//   isAuthenticated,
//   logoutHandler,
//   userDetails,
//   constants,
//   ...rest
// }) => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   return (
//     <div className={classes.headerRoot}>
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             <NavLink className={`text-white fsize-24`} to={"/"}></NavLink>
//           </Typography>
//           {routeType === CONSTANTS.routeType.dashboard && (
//             <>
//               <Button
//                 variant="contained"
//                 aria-controls="profile-menu"
//                 aria-haspopup="true"
//                 onClick={handleClick}
//                 disableElevation
//                 className={`${classes.themeButton} ${classes.lightThemeButton} ${classes.customHeaderBtn}`}
//               >
//                 <div className="img-wrap mr-2">
//                   {userDetails.logoImageUri ? (
//                     <img
//                       src={`//${constants.s3BaseUrl}${userDetails.logoImageUri}`}
//                       className="img-fluid thumbnail"
//                       alt="Logo"
//                     />
//                   ) : (
//                     <Avatar className={`bg-1-imp avatarHW`}>
//                       {userDetails.companyName
//                         ? _.trim(userDetails.companyName).substr(0, 1)
//                         : ""}
//                     </Avatar>
//                   )}
//                 </div>
//                 {/* <span className="toLower">Profile</span> */}
//                 <span className="material-icons">keyboard_arrow_down</span>
//               </Button>
//               <Menu
//                 id="profile-menu"
//                 anchorEl={anchorEl}
//                 keepMounted
//                 open={Boolean(anchorEl)}
//                 onClose={(e) => setAnchorEl(null)}
//                 className="w-100 z10k"
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 getContentAnchorEl={null}
//               >
//                 <MenuItem
//                   onClick={(e) => {
//                     setAnchorEl(null);
//                     logoutHandler();
//                   }}
//                   className={"w-150"}
//                 >
//                   Logout
//                 </MenuItem>
//               </Menu>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.token || false,
//   userDetails: state.auth && state.auth.user ? state.auth.user : {},
// });

// export default connect(mapStateToProps)(Header);
import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return <div className={classes.header}>SUBH LABH</div>;
};

export default Header;
