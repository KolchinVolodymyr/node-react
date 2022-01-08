import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const ClientReportPage = () => {
//    let history = useHistory();
    const ID = useParams().id;
    const [data, setData] = useState([]);
    const [month, setMonth ] = useState([]);
    const [currentMonth, setCurrentMonth] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeesRender, setEmployeesRender] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const {request} = useHttp();
    const loadMessage = async () => {
        try {
            const response = await request(`/client/${ID}/report`, 'GET')
            // console.log('response', response.employeesItem);
            response.employeesItem.forEach(el =>{
                month.push(el.job.startDate);
            })
            // let newEmployees = [];
            // response.employeesItem.forEach((a) => {
            //     console.log('a forEach', a);
            //         if('2021-12-12' === a.job.startDate) {
            //             console.log('IF a.job.startDate', a.job);
            //             newEmployees.push(a);
            //             setEmployees(newEmployees);
            //             // console.log('newEmployees', newEmployees);
            //         }
            //     // console.log('111 newEmployees', newEmployees);
            // })
            // console.log('12employees', employees);
            // setEmployees(newEmployees);

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

    const changeHandler = event => {
        setCurrentMonth({...currentMonth, [event.target.name]: event.target.value});
        let newEmployees = [];
        console.log('.slice(0, -1)', event.target.value.slice(0, -3))
        employees.forEach((a) => {
            if(event.target.value.slice(0, -3) === a.job.startDate.slice(0, -3)) {
                newEmployees.push(a);
                setEmployeesRender(newEmployees);
            }
        })
        console.log('setEmployeesRender', employeesRender)
    }

    if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return(
            <div>
                <h1>
                    Client Report Page
                </h1>
                <label>?</label>
                <select
                    className="browser-default"
                    defaultValue={data.client || ""}
                    name="date"
                    onChange={changeHandler}
                >
                <option value='Choose your option' disabled>Choose your option</option>
                {month.map((el, index) => {
                    return (
                        <option key={index} value={el}>{el}</option>
                    )
                })}
                </select>

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

                        {employeesRender.map((item, index) => {
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