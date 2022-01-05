import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const ClientReportPage = () => {
//    let history = useHistory();
    const ID = useParams().id;
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const total = 0;
//    const [total, setTotal] = useState([]);
    const {request} = useHttp();
    const loadMessage = async () => {
        try {
            const response = await request(`/client/${ID}/report`, 'GET')
            console.log('response', response);
            setEmployees(response.employeesItem);

            response.employeesItem.forEach(el => {
                el.total = el.employees.salary;
                el.job.additionalEquipment.forEach(index => {
                    el.total += Number(index.usageFee);
                })
            })
            setData(response.clientWorksitesItem);
            setIsLoaded(true);
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
                            if(item.job.additionalEquipment.length == 0) {
                                return( <tr key={index}>
                                    <td>{item.worksites.name}</td>
                                    <td>{item.employees.name}</td>
                                    <td>--</td>
                                    <td>{item.employees.salary}</td>
                                    <td>0</td>
                                    <td>{item.total}</td>
                                </tr> )
                            } else {
                                return( <tr key={index}>
                                    <td>{item.worksites.name}</td>
                                    <td>{item.employees.name}</td>
                                    <td>{item.job.additionalEquipment.map((el)=>{
                                        return(<div key={el._id}>{el.name}</div>)
                                    })}</td>
                                    <td>{item.employees.salary}</td>
                                    <td>{item.job.additionalEquipment.map((el)=>{
                                        return(<div key={el._id}>{el.usageFee}</div>)
                                    })}</td>
                                    <td>{item.total}</td>
                                </tr> )
                            }
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}