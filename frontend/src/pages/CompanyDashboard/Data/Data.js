// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
  import { keyboard } from "@testing-library/user-event/dist/keyboard";

  
  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      path:"/companydashboard",
    },
    {
      icon: UilPackage,
      heading: "Projects",
      path:"/requestTable"
    },
    {
      icon: UilClipboardAlt,
      heading: "Notifications",
    /*   path:"/addRequest" */
      path:"/uploadedfiles"
    },
    /* {
      icon: UilUsersAlt,
      heading: "Review",
      path:"/Companyreview"
    }, */
    {
      icon: UilChart,
      heading: "Messages",
      path:"/receivedMsgCom"
    },
   /*  {
      icon: UilSignOutAlt,
      heading: "LogOut",
      path:"/"
    }, */
  ];
  
  // Analytics Cards Data
  export const cardsData = [
    {
      title: "All Projects",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "5",
      route:"/projectsList",
      png: UilUsdSquare,
      
    },
    {
      title: "Complete Projects",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "4/5",
      png: UilMoneyWithdrawal,
      
    },
    {
      title: "Member Since",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "Aug,2022",
      png: UilClipboardAlt,
      
    },
  ];