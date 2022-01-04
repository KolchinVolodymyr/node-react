import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const ClientReportPage = () => {
//    let history = useHistory();
    const ID = useParams().id;
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {request} = useHttp();
    const loadMessage = async () => {
        try {
            const response = await request(`/client/${ID}/report`, 'GET')
             console.log('response', response)
            // message(response.message);
//            let newArr = [];
//            Object.entries(response.clientWorksitesItem).forEach((key, index)=> {
//                newArr.push({
//                    id: key,
//                    name: `Client ${index+1}`
//                })
//                setIsLoaded(true);
//            })
            setEmployees(response.employeesItem)
            setData(response.clientWorksitesItem);
            setIsLoaded(true);
            console.log('data', data)
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    // Note: an empty array of dependencies [] means that
    // this useEffect will run once
    // similar to componentDidMount ()
    useEffect(()=> {
        loadMessage();
    }, [])

    if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
    console.log('employees', employees)
        return(
            <div>
                <h1>
                    Client Report Page
                </h1>
                <table>
                    <thead>
                        <tr>
                            <th>Worksite name</th>
                            <th>Employee name</th>
                            <th>Equipment used</th>
                            <th>Employee job cost</th>
                            <th>Equipment cost</th>
                            <th>Total cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((item, index) => {
                        console.log('item', item)
                            return( <tr key={index}>
                                        <td>{item.worksites.name}</td>
                                        <td>{item.employees.name}</td>
                                        <td>87</td>
                                        <td>{item.employees.salary}</td>
                                    </tr> )
                            })}

                    </tbody>
                </table>

            </div>
        )
    }
}