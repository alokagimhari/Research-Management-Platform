// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilSync
  } from "@iconscout/react-unicons";
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
  import { keyboard } from "@testing-library/user-event/dist/keyboard";
  
  //Notification page
  
  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      path:"/researcherdashboard"
    },
    {
      icon: UilPackage,
      heading: "Projects",
      path:"/projectsList"
    },
    {
      icon: UilClipboardAlt,
      heading: "Notifications",
      path:"/notify"
    },
    /* {
      icon: UilUsersAlt,
      heading: "Update",
      path:"/todo"
    }, */
    {
      icon: UilChart,
      heading: "Messages",
      path:"/receivedMsgRes"
    },
    /* {
      icon: UilSync,
      heading: "Updates",
      path:"/todo"
    },*/ 
    {
      icon: UilSignOutAlt,
    },
   
  ];
  
  
  // Analytics Cards Data
  export const cardsData = [
    {
      title: "Complete Projects",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25",
      png: UilUsdSquare,
      
    },
    {
      title: "Reviews & Rates",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "4.7/5",
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
      value: "Jul,2022",
      png: UilClipboardAlt,
      
    },
  ];
  
  