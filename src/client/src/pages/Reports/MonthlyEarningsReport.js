import React, {useState, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const  MonthlyEarningsReport = () => {
    const {request} = useHttp();
    const [data, setData] = useState([]);
    const [dataEmployee, setDataEmployee] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadMessage = async () => {
        try {
            const response = await request('/monthlyEarningsReport', 'GET')
            // message(response.message);
            console.log('response', response);
            setData(response.client)
            // setDataEmployee(response.dataList)
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    // Note: an empty array of dependencies [] means that
    // this useEffect will run once
    // similar to componentDidMount ()
    useEffect(()=> {
        loadMessage();
    }, [])
console.log('dataEmployee', dataEmployee)
    return(
        <div>
            <h1>
                Monthly Earnings Report Page
            </h1>
            <table>
                <thead>
                <tr>
                    <th>Client name</th>
                    <th>Employee revenue</th>
                    <th>Equipment revenue</th>
                    <th>Total revenue</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    console.log('item', item)
                    return( <tr key={index}>
                        <td>{item.name}</td>
                    </tr> )
                })}

                </tbody>
            </table>
        </div>
    )
}