import UrlTable from "../../components/UrlTable";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import CreateShortURL from "../../components/CreateShortURL";
const useUserRoles = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRolesString = Cookies.get('UserRoles');
        if (userRolesString) {
            try {
                const userRolesArray = userRolesString.split(',').map(role => role.trim());
                if (userRolesArray.includes('Admin')) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error parsing UserRoles cookie', error);
            }
        }
    }, []);
    return isAdmin;
};
export default function Table({urls})
{
    const isAdmin = useUserRoles();
    return(
    <>
     {isAdmin && <CreateShortURL />}
     <UrlTable urls={urls} />
    </>);
}
