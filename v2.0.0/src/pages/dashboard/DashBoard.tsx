import DashBoardAdmin from "./admin/DashBoardAdmin";
import DashBoardUser from "./user/DashBoardUser";

const DashBoard = () => {
    const role = localStorage.getItem('role'); 
    return (
        <>
            {role === 'User' && (<DashBoardUser/>)}
            {(role === 'Owner'  || role === 'Admin') && (<DashBoardAdmin/>)}
        </>
    )
}

export default DashBoard
