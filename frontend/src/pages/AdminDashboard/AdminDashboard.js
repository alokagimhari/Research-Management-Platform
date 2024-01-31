import './AdminDashboard.css'
import MainDash from './components/MainDash/MainDash'
import Sidebar from './components/Sidebar'
import RightSide from './components/RigtSide/RightSide';

function AdminDashboard() {
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

export default AdminDashboard;