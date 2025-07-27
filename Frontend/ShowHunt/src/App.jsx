import { BrowserRouter } from 'react-router-dom';
import RoleBasedNavbar from './redux/RoleBasedNavBar';

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <RoleBasedNavbar/>
      </BrowserRouter>
    </div>
  )
}
export default App
