import Avatar from '@mui/material/Avatar';
import { useAuthContext } from '../../context/AuthContext';
import { useLogout } from '../../hooks/LogOutHook';

const Header = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    return(
        <div className="header">
            <div className="brand">
              <div>Park-</div>
              <div className="color-red">O</div>
            </div>
            <div className="profile">
            <Avatar alt={authUser?.fullName} src="/static/images/avatar/1.jpg" />
            <div className='logoutButton' onClick={logout}>{loading?"loading":"Logout"}</div>
            </div>
        </div>
    )
}

export default Header;