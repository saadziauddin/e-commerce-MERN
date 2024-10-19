import React, { useState } from 'react';
import Topbar from '../Constants/Topbar';
import Sidebar from '../Constants/Sidebar';
// import Lottie from 'lottie-react';
import LottieAnimation from "../../../../public/Assets/Animations/LoginAnimation.json";
import animationData from "../../../../public/Assets/Animations/DashboardAnimation1.json";
import Footer from '../Constants/Footer';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };

  return (
    <div className="w-full h-full">
      {/* Sidebar */}
      <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      {/* Main */}
      <main className="relative min-h-screen xl:ml-68 flex flex-col justify-between">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Centered Animation */}
        <div className="flex-grow flex items-center justify-center">
          {/* <Lottie animationData={animationData} loop={true} autoplay={true} /> */}

          {/* <LottieAnimation animationData={animationData} loop={true} autoplay={true}/> */}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default Home;
