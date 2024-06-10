import React, { useEffect, useRef, useState } from 'react';
import { ReactDOM } from 'react';
import './Welcomelogin.css';

export const WelcomeLogin = () => {

return(
    <div className='bggray'>
        <div className='my-3 py-5'>
            <h1 className='text-center font-h1' >Hello!</h1>
            <h2 className='text-center font-h2'>Welcome to our Research Management Platform</h2>

            <div class="container cform">
                <div className='mb-5' style={{ marginLeft: '0%', marginRight: '0%', marginTop: '5%' }}>
                    <div className='border-left border-top border-success shadow rounded-3 bg-light'>
                        <form className='px-1 mx-3 mt-5 mb-5'>
                            <h2 className='text-center mb-4 font-form-head'>Enter Login Details</h2>
                            <div class="form-group">
                                <label for="exampleInputEmail1">User Name</label>
                                <input type="text" class="form-control" aria-describedby="emailHelp" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div align="center">
                                <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button">Sign in</button>
                            </div> 
                            <div>
                                <h6 className='text-center mb-4 font-form-sub'>Still don't you have an account???</h6>
                            </div>
                            <div align="center">
                                <button type="submit" class="btn btn-primary mt-1 mb-5 form-signin-button"><a className='button-anchor' href='/registrationform'>Create an Account</a></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>



)

}