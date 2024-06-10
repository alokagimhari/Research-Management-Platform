import React, { useEffect, useRef, useState } from 'react';
import { ReactDOM } from 'react';
import { Link } from 'react-router-dom';
import ResearcherImg from './Img/researcher.jpg';
import CompanyImg from './Img/company.jpg';
import './Registration.css'

const RegistrationCardC = (props) => {
    return (
        <div className="cards cards-space">
            <div className="card-img">
                <img src={props.imgsrc} alt="compnay" className="card-img-top" />
            </div>
            <div className="card-footer">
                <div>
                    <a className="btn btn-primary btn-lg form-signin-button" href='/CompanyRegister'>Company</a>
                </div>
            </div>
        </div>
    );
};

const RegistrationCardR = (props) => {
    return (
        <div className="cards cards-space">
            <div className="card-img">
                <img src={props.imgsrc} alt="compnay" className="card-img-top" />
            </div>
            <div className="card-footer">
                <div>
                    <a className="btn btn-primary btn-lg form-signin-button" href='/ResearcherRegister'>Researcher</a>
                </div>
            </div>
        </div>
    );
};

export const RegistrationForm = () => {

    return (
        <div>
            <h1 className='text-center font-h1 mt-4'> Hello Who Are You? </h1>
            <div className="container">
                <RegistrationCardC
                    imgsrc={CompanyImg}
                />
                <RegistrationCardR
                    imgsrc={ResearcherImg}
                />
            </div>
        </div>
    );

}