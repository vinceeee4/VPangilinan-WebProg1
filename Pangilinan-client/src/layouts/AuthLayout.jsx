import { Outlet } from 'react-router-dom';
import driversImg from '../assets/drivers.jpg';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: `url(${driversImg})`}}></div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;