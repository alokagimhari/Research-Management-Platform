import React, { useEffect, useRef, useState } from 'react';
import { ReactDOM } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css'

export const RegistrationSecondPage = (props) => {

    return (
        <div className='bggray'>
            <div className='my-3 py-5'>
                <h2 className='text-center font-h2'>Researcher Profile Registration Form</h2>
                <h5 className='text-center font-h2'>Page 2</h5>
                <div class="container cform">
                    <div className='mb-5' style={{ marginLeft: '0%', marginRight: '0%', marginTop: '5%' }}>
                        <div className='border-left border-top border-success shadow rounded-3 bg-light'>
                            <form className='px-1 mx-3 mt-5 mb-5'>
                                <h2 className='text-center mb-4 font-form-head-2'>Details About Your Resident</h2>
                                <div class="form-group">
                                    <h6 className="form-font">Permanent Address</h6>
                                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Address" required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">State / City</h6>
                                    <input type="text" class="form-control" placeholder="Enter City" required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Country</h6>
                                    <input type="text" class="form-control" placeholder="Enter Country" required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Time Zone</h6>
                                    <input type="text" class="form-control" placeholder="Enter Time Zone" required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Phone Number</h6>
                                    <input type="text" class="form-control" placeholder="Enter Phone Number" required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Email Address</h6>
                                    <input type="email" class="form-control" placeholder="Enter Email" required/>
                                </div>
                                <div align="center">
                                    <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button button-gap"><a className='button-anchor' href='/reg-researcher-firstpage'>Previous Page</a></button>
                                    <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button button-gap"><a className='button-anchor' href='/reg-researcher-Thirdpage'>Next Page</a></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )

}