import React from 'react';
import App from '../../App';
import Sidebar from "./Sidebar/Sidebar";

function Layout(props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <Sidebar/>
                <div>
                    <App/>
                </div>
            </div>
        </div>
    );
}
export default Layout;