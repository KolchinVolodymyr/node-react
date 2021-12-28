import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import {Link, useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const ClientListPage = () => {
    let history = useHistory();
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {request} = useHttp();
    const loadMessage = async () => {
        try {
            const response = await request('/client/list', 'GET')
            // message(response.message);
            let newArr = [];
            Object.entries(response).forEach((key, index)=> {
                newArr.push({
                    id: key,
                    name: `Client ${index+1}`
                })
                setIsLoaded(true);
            })
            setData(newArr);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    // Note: an empty array of dependencies [] means that
    // this useEffect will run once
    // similar to componentDidMount ()
    useEffect(()=> {
        loadMessage();
    }, [])

    const onRemove = async (id)  => {
        try {
            const response = await request('/client/remove', 'DELETE', {id: id});
            // message(response.message);
            loadMessage();
        } catch (e) {console.log(e)}
    }

    if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return(
            <div>
                <h1>
                    Client List Page
                </h1>
                <div className="row">
                    {data.map(item => {
                    return(
                        <div className="col s12 m6" key={item.id[0]}>
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">{item.name}</span>
                                    <ul>
                                        <li>Name:{item.id[1].name}</li>
                                        <li>Primary office address: {item.id[1].address}</li>
                                        <li>Contact phone: {item.id[1].phone}</li>
                                        <li>Contact person: {item.id[1].contactPerson}</li>
                                        <li>Corporate or personal: {item.id[1].client}</li>
                                        <li>Status: {item.id[1].status}</li>
                                    </ul>
                                </div>
                                <div className="card-action">
                                    <Link to={`/client/${item.id[1]._id}/edit`}>Edit</Link>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => onRemove(item.id[1]._id)}
                                        value={item.id[1]._id}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}