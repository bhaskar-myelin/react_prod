// import React from 'react'
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { NavLink } from 'react-router-dom';
// import { CONSTANTS } from '../../_utils/_constants';

// function ForgotPasswordComponent({
//     inputHandler,
//     formRef,
//     submitForm,
//     payload,
//     classes,
//     ...rest
// }) {
//     return (
//         <div className="right">
//             <div className="d-flex h-100 auth--container_right">
//                 <div className="my-auto w-100">
//                     <h2 className="fsize-28">Get Started</h2>
//                     <h5 className="fsize-16">Reset Password with your email</h5>
//                     <div className="mt-5">
//                         <form autoComplete={"off"} ref={formRef} onSubmit={e => submitForm(e)} className="form">
//                             <div className="w-100 mb-4 pb-1">
//                                 <TextField name="email" type="email" disabled={payload.otpSessionId ? true : false} onChange={inputHandler} required
//                                     id="email" label="Email" value={payload.email || ""}
//                                     variant="outlined" className={classes.textField} />
//                             </div>
//                             { payload.otpSessionId &&
//                                 <React.Fragment>
//                                     <div className="w-100 mb-4">
//                                         <TextField name="password" type="password" onChange={inputHandler} required
//                                             id="password" label="Password" value={payload.password || ""}
//                                             variant="outlined" className={classes.textField} />
//                                     </div>
//                                     <div className="w-100 mb-4">
//                                         <TextField name="confirm-password" type="password" onChange={inputHandler} required
//                                             id="confirm-password" label="Confirm Password" value={payload['confirm-password'] || ""}
//                                             variant="outlined" className={classes.textField} />
//                                     </div>
//                                     <div className="w-100 mb-4">
//                                         <TextField name="otp" type="text" onChange={inputHandler} required
//                                             id="otp" label="One Time Password" value={payload.otp || ""}
//                                             variant="outlined" className={`${classes.textField} appearance-none`} />
//                                     </div>
//                                 </React.Fragment>
//                             }
//                             <div className="btn-wrap d-flex justify-content-between w-100">
//                                 <Button type="submit" id="submitFormButton"
//                                     variant="contained" className={`${classes.themeButton} w-100 py-2 br-2 transform-initial`}>
//                                     {payload.otpSessionId ? 'Verify' : 'Send OTP'}
//                                 </Button>
//                             </div>
//                         </form>
//                         <div className="text-center mt-2">
//                             <NavLink className={classes.defaultNavLink} to={`/${CONSTANTS.routeType.login}`}>
//                                 <Button className={`${classes.lightThemeButton} my-2 color-1-imp transform-initial fsize-16`}>
//                                     Login
//                                 </Button>
//                             </NavLink>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ForgotPasswordComponent
