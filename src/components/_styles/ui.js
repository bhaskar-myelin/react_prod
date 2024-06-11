// // import React from 'react'
// import { makeStyles } from "@material-ui/core/styles";

// const styleList = {
//   headerRoot: {
//     flexGrow: 1,
//   },
//   title: {
//     flexGrow: 1,
//     color: "var(--color-xl)",
//     letterSpacing: "0.05rem",
//   },
//   appBar: {
//     backgroundColor: "var(--color-primary) !important",
//     boxShadow:
//       "0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) !important",
//     padding: "2px 20px",
//     position: "relative",
//     zIndex: "1201 !important",
//   },
//   themeButton: {
//     backgroundColor: "var(--color-primary) !important",
//     color: "var(--color-xs) !important",
//     padding: "8px 25px !important",
//     borderRadius: "8px",
//     fontSize: "16px !important",
//     "&:hover": {
//       backgroundColor: "var(--color-primary)",
//       opacity: "0.85",
//     },
//     "&:active, &:focus, &:hover": {
//       outline: "0 !important",
//     },
//     "&:disabled": {
//       opacity: 0.5,
//       cursor: "not-allowed",
//     },
//   },
//   themeButtonEp: {
//     padding: "12px 60px !important",
//   },
//   lightThemeButton: {
//     backgroundColor: "var(--color-xs) !important",
//     color: "var(--color-xl) !important",
//     "&:hover": {
//       backgroundColor: "var(--color-xs) !important",
//       opacity: "1 !important",
//     },
//   },
//   colorThemeButton: {
//     color: "var(--color-primary) !important",
//   },
//   noPadding: {
//     padding: "0 !important",
//   },
//   defaultNavLink: {
//     color: "var(--color-xl)",
//     textDecoration: "none !important",
//     "&:hover": {
//       color: "var(--color-md)",
//     },
//   },
//   hoverNavLink: {
//     "&:hover": {
//       opacity: "0.85",
//       color: "var(--color-primary)",
//     },
//   },
//   primaryColorText: {
//     color: "var(--color-primary)",
//   },
//   homeCoverImage: {
//     minHeight: "500px",
//     maxHeight: "calc(100vh - 250px)",
//     height: "calc(100vh - 250px)",
//     background:
//       "var(--bg-cover-gradient), url(/assets/background/home_cover.svg)",
//     backgroundSize: "cover",
//   },
//   lgColorText: {
//     color: "var(--color-md)",
//   },
//   cardWrap: {
//     boxShadow: "var(--card-shadow)",
//     border: "0",
//     minHeight: "230px",
//     borderRadius: "10px",
//     height: "100%",
//   },
//   textField: {
//     width: "100%",
//     "& label.Mui-focused": {
//       color: "var(--color-primary)",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "var(--color-primary)",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "var(--color-lg)",
//       },
//       "&:hover fieldset": {
//         borderColor: "var(--color-lg)",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "var(--color-primary)",
//       },
//     },
//   },
//   buttonProgress: {
//     color: "white !important",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginTop: -12,
//     marginLeft: -12,
//   },
//   customMenuItem: {},
// };

// const themeList = (theme) => {
//   return {
//     [theme.breakpoints.down("sm")]: {
//       appBar: {
//         padding: "5px 0",
//       },
//       themeButton: {
//         padding: "10px 20px",
//       },
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//   };
// };

// const formElementsStyleList = {
//   textField: {
//     width: "100%",
//     marginBottom: "16px",
//     "& label.Mui-focused": {
//       color: "var(--color-primary)",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "var(--color-primary)",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "var(--color-lg)",
//       },
//       "&:hover fieldset": {
//         borderColor: "var(--color-lg)",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "var(--color-primary)",
//       },
//     },
//   },
//   formControl: {
//     minWidth: 120,
//   },
// };

// // const themeList = (theme) => {
// //     return {}
// // }

// export const FormStyles = makeStyles((theme) => ({
//   textField: { ...formElementsStyleList.textField },
//   formControl: { ...formElementsStyleList.formControl },
//   lightThemeButton: { ...styleList.lightThemeButton },
//   themeButton: { ...styleList.themeButton },
//   defaultNavLink: { ...styleList.defaultNavLink },
//   radioBtnGroup: {
//     fontSize: "10pt",
//     "&.Mui-checked": {
//       color: "var(--color-primary) !important",
//     },
//     "&:hover, &:active, &:focus": {
//       backgroundColor: "#E3F2FD",
//     },
//   },
//   ...themeList(theme),
// }));

// export const BaseStyles = makeStyles((theme) => ({
//   textField: { ...formElementsStyleList.textField },
//   formControl: { ...formElementsStyleList.formControl },
//   lightThemeButton: { ...styleList.lightThemeButton },
//   themeButton: { ...styleList.themeButton },
//   defaultNavLink: { ...styleList.defaultNavLink },
//   ...themeList(theme),
// }));

// export const headerStyles = makeStyles((theme) => ({
//   themeButton: { ...styleList.themeButton },
//   appBar: { ...styleList.appBar },
//   title: { ...styleList.title },
//   headerRoot: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   lightThemeButton: { ...styleList.lightThemeButton },
//   defaultNavLink: { ...styleList.defaultNavLink },
//   customHeaderBtn: {
//     padding: "8px 14px !important",
//     borderRadius: "30px !important",
//   },
//   "marketPage-update": {
//     margin: "16px 24px !important",
//     padding: "4px 40px !important",
//     textTransform: "capitalize !important",
//     border: "1.5px solid var(--color-primary) !important",
//     color: "var(--color-primary) !important",
//     boxShadow: "0px 4px 4px 0px #0000001a !important",
//   },
//   "modifyDate-def": {
//     margin: "0 !important",
//     padding: "4px 20px !important",
//     textTransform: "capitalize !important",
//     border: "1.5px solid var(--color-primary) !important",
//     color: "var(--color-primary) !important",
//     boxShadow: "0px 4px 4px 0px #0000001a !important",
//     lineHeight: "1 !important",
//     maxHeight: "45px !important",
//   },
//   "MuiBtn-darkTheme": {
//     backgroundColor: "var(--color-primary) !important",
//     color: "var(--color-xs) !important",
//     fontSize: "10pt !important",
//     border: "0 !important",
//     borderRadius: "2px !important",
//     textTransform: "capitalize !important",
//     "&:hover": {
//       backgroundColor: "var(--color-primary) !important",
//       color: "var(--color-xs) !important",
//       opacity: "0.9 !important",
//     },
//   },
//   "MuiBtn-linkTheme": {
//     border: "0 !important",
//     color: "var(--color-primary) !important",
//     textTransform: "capitalize !important",
//   },
//   "MuiBtn-noPad": {
//     padding: "3px 10px !important",
//     fontSize: "10pt !important",
//     textTransform: "capitalize !important",
//   },
//   bgDanger: {
//     textTransform: "capitalize !important",
//     backgroundColor: "#c43232 !important",
//     color: "white!important",
//     "&:hover": {
//       backgroundColor: "#c43232 !important",
//       color: "white!important",
//       opacity: "0.9 !important",
//     },
//   },
//   bgSuccess: {
//     textTransform: "capitalize !important",
//     backgroundColor: "var(--color-primary) !important",
//     color: "white!important",
//     "&:hover": {
//       backgroundColor: "var(--color-primary) !important",
//       color: "white!important",
//       opacity: "0.9 !important",
//     },
//   },
//   "br50-wprimaryColor": {
//     color: "var(--color-primary) !important",
//     padding: "8px 12px !important",
//   },
//   ...themeList(theme),
// }));
