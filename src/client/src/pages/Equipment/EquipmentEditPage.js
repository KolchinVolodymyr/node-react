import React, {useState, useEffect, useCallback} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

export const EquipmentEditPage = () => {
    let history = useHistory();
    const ID = useParams().id;
    const {request, clearError, error} = useHttp();
    const message = useMessage();
    const [data, setData] = useState({
        name: '', storageLocation: '', usageFee: '', status: ''
    });
    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/equipment/${ID}/edit`, 'GET');
            setData(response.equipment);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    }, [ID, request]);

    useEffect(()=>{
        fetchClient()
    }, []);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const pressHandler = async ()  => {
        try {
            const response = await request(`/equipment/${ID}/edit`, 'PUT', {...data, id: ID});
            message(response.message);
            // setData(response);
            history.push(`/equipment/list`);
        } catch (e) {console.log(e)}
    }
    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <h1>
                Equipment Edit Page
            </h1>
            <div className="row">
                <div>
                    <div className="input-field">
                        <input
                            name="name"
                            type="text"
                            className="validate"
                            value={data.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            name="storageLocation"
                            type="text"
                            className="validate"
                            value={data.storageLocation}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="number"
                            name="usageFee"
                            value={data.usageFee}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            className="browser-default"
                            value={data.status}
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
                        onClick={pressHandler}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}