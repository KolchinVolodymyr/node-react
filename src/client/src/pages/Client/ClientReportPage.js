import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const ClientReportPage = () => {
//    let history = useHistory();
    const ID = useParams().id;
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {request} = useHttp();
    const loadMessage = async () => {
        try {
            const response = await request(`/client/${ID}/report`, 'GET')
             console.log('response.clientWorksitesItem', response.clientWorksitesItem)
            // message(response.message);
//            let newArr = [];
//            Object.entries(response.clientWorksitesItem).forEach((key, index)=> {
//                newArr.push({
//                    id: key,
//                    name: `Client ${index+1}`
//                })
//                setIsLoaded(true);
//            })

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
                        {data.map(item => {
                            return( <tr>
                                        <td>{item.name}</td>
                                        <td>Eclair</td>
                                        <td>87</td>
                                    </tr> )
                            })}
                        <tr>
                            <td>Alvin</td>
                            <td>Eclair</td>
                            <td>$0.87</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>Jellybean</td>
                            <td>$3.76</td>
                        </tr>
                        <tr>
                            <td>Jonathan</td>
                            <td>Lollipop</td>
                            <td>$7.00</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}