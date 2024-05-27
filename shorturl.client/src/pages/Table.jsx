import UrlTable from "../../components/UrlTable";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import CreateShortURL from "../../components/CreateShortURL";
import { fetchAllURL } from './../allURL';
const useUserRoles = () => {
    const [urls, setUrls] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const fetchAndSetData = async () => {
        try {
          const data = await fetchAllURL();
          setUrls(data);
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
        fetchAndSetData();
      }, []);
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
    return { isAdmin, urls, fetchAndSetData };
};
export default function Table()
{
  const { isAdmin, urls, fetchAndSetData } = useUserRoles();
    return(
    <>
     {isAdmin && <CreateShortURL onUrlCreated={fetchAndSetData} />}
     <UrlTable urls={urls} />
    </>);
}
