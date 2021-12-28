import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const ClientEditPage = () => {
    let history = useHistory();
    const ID = useParams().id;
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', address: '', phone: '', contactPerson: '', client: '', status: ''
    });

    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/client/${ID}/edit`, 'GET')
            // message(response.message);
            setData(response);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    }, [ID, request]);

    useEffect(()=>{
        fetchClient()
    }, [fetchClient]);

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
    }

    const PressHandler = async ()  => {
        try {
            const response = await request(`/client/${ID}/edit`, 'PUT', {...data, id: ID});
            // message(response.message);
            setData(response);
            history.push(`/client/list`);
        } catch (e) {console.log(e)}

    }

    return(
        <div>
            <h1>
                Client Edit Page
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
                    <div className="input-field">
                        <input
                            type="text"
                            name="phone"
                            value={data.phone || ""}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        Contact person:
                        <input
                            type="text"
                            name="contactPerson"
                            value={data.contactPerson || ""}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label>Corporate or personal?</label>
                        <select
                            className="browser-default"
                            defaultValue={data.client || ""}
                            name="client"
                            onChange={changeHandler}
                        >
                            <option value='Choose your option' disabled>Choose your option</option>
                            <option value='Corporate'>Corporate</option>
                            <option value='Personal'>Personal</option>
                        </select>
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            className="browser-default"
                            defaultValue={data.status || ""}
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
            </div>
        </div>
    )
}