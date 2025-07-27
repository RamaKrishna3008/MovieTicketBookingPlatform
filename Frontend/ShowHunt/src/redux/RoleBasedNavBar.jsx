import { useSelector } from 'react-redux';
import AdminNavBar from './../Components/Admin/AdminNavBar';
import TheatreOwnerNavBar from '../Components/TheatreOwner/TheatreOwnerNavBar';
import UserNavBar from './../Components/User/UserNavBar';
import HomeNavBar from '../Components/Home/HomeNavBar';

export default function RoleBasedNavbar() {
  const role = useSelector((state) => state.auth.role);

  if (!role) return <HomeNavBar/>;

  switch (role) {
    case 'ADMIN':
      return <AdminNavBar />;
    case 'THEATREOWNER':
      return <TheatreOwnerNavBar />;
    case 'USER':
      return <UserNavBar />;
    default:
      return null;
  }
}
