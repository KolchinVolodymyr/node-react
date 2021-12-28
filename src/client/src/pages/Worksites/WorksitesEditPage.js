import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const WorksitesEditPage = () => {
    let history = useHistory();
    const ID = useParams().id;
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', address: '', phone: '', contactPerson: '', clientID: '', status: ''
    });
    const [clients, setClients] = useState([]);

    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/worksites/${ID}/edit`, 'GET');
            setData(response.worksites);
            setClients(response.clientList);

            // history.push(`/`);
        } catch (e) {console.log(e)}
    }, [ID, request]);

    useEffect(()=>{
        fetchClient()
    }, []);

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
    }

    const PressHandler = async ()  => {
        try {
            const response = await request(`/worksites/${ID}/edit`, 'PUT', {...data, id: ID});
            // message(response.message);
            setData(response);
            history.push(`/worksites/list`);
        } catch (e) {console.log(e)}

    }
console.log('data.clientID', data.clientID)
    return(
        <div>
            <h1>
                Worksites2 Edit Page
            </h1>
            <div className="row">
                <div>
                    <div className="input-field">
                        <input
                            placeholder="Name"
                            name="name"
                            type="text"
                            value={data.name || ""}
                            onChange={changeHandler}
                        />
                        <label className="active" htmlFor="link">Enter the name</label>
                    </div>
                    <div className="input-field">
                        <input
                            name="address"
                            type="text"
                            className="validate"
                            value={data.address || ""}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label>Choose your option</label>
                            <select
                                className="browser-default"
                                value={data.type || ""}
                                name="type"
                                onChange={changeHandler}
                            >
                                <option value='Choose your option' disabled>Choose your option</option>
                                <option value='office'>office</option>
                                <option value='residential building'>residential building</option>
                                <option value='personal home'>personal home</option>
                                <option value='individual apartment'>individual apartment</option>
                                <option value='manufacturing'>manufacturing</option>
                                <option value='warehouse'>warehouse</option>
                                <option value='outdoor'>outdoor</option>
                                <option value='field'>field</option>
                                <option value='other'>other</option>
                            </select>
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            className="browser-default"
                            value={data.status || ""}
                            name="status"
                            onChange={changeHandler}
                        >
                            <option value='Choose your option' disabled>Choose your option</option>
                            <option value='true'>true</option>
                            <option value='false'>false</option>
                        </select>

                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={PressHandler}
                    >
                        Save
                    </button>
                </div>
                <select
                    className="browser-default"
                    value={data.clientID || "Choose your option"}
                    name="clientID"
                    onChange={changeHandler}
                    >
                    <option value='Choose your option' disabled>Choose your option</option>
                    {clients.map(el =>{
                        return (
                            <option key={el._id} value={el._id}>{el.name}</option>
                        )
                    })}
                </select>

            </div>
        </div>
    )
}