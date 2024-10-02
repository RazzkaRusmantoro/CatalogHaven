import { useLocation } from 'react-router-dom';
function UserInfo (){
    const location = useLocation();

    return(
        <div>
            <p>Welcome {location.state.id} and welcoem to home.</p>
        </div>
    );
}


export default UserInfo