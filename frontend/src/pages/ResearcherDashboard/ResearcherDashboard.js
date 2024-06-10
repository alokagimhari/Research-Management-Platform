import './ResearcherDashboard.css';
import MainDash from './MainDash';
import RightSide from './RigtSide/RightSide';
import Sidebar from './Sidebar';

function ResearcherDashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
    </div>
  );
}

export default ResearcherDashboard;
