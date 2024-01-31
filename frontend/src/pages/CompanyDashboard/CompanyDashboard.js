import './CompanyDashboard.css'
import MainDash from './Companydash'
import Sidebar from './Sidebar/Sidebar'
import RightSide from './Rightside/RightSide';

function CompanyDashboard() {
    return (
        <div className='App'>
            <div className='AppGlass'>
                <Sidebar/>
                <MainDash/>
                <RightSide/>
            </div>
        </div>
    );
}

export default CompanyDashboard;