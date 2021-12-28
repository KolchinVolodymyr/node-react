import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const JobEditPage = () => {
    let history = useHistory();
    const ID = useParams().id;
    const {request} = useHttp();
    const [data, setData] = useState({
        worksiteID: '', type: '', serviceFee: '', hazardousMaterials: '', startDate: '', endDate: ''
    });
//    const [clients, setClients] = useState([]);

    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/job/${ID}/edit`, 'GET');
            setData(response);
            console.log('response', response);
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
            const response = await request(`/job/${ID}/edit`, 'PUT', {...data, id: ID});
            // message(response.message);
            setData(response);
            history.push(`/worksites/list`);
        } catch (e) {console.log(e)}

    }
    console.log('data', data)
    return(
        <div>
            <h1>
                Job Edit Page
            </h1>
            <div className="row">
                <div>
                    <div className="input-field">
                         Worksite:
                         <select
                             className="browser-default"
                             value={data.worksiteID}
                             name="worksiteID"
                             onChange={changeHandler}
                         >
                             <option value='Choose your option' disabled>Choose your option</option>
                             <option value={data.worksiteID}>{data.worksiteID}</option>
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
                    <div className="input-field">
                        Type:
                        <select
                            className="browser-default"
                            value={data.type}
                            name="type"
                            onChange={changeHandler}
                        >
                            <option value='Choose your option' disabled>Choose your option</option>
                            <option value={data.type}>{data.type}</option>
                            <option value='home cleaning'>home cleaning</option>
                            <option value='deep cleaning'>deep cleaning</option>
                            <option value='outdoor cleaning'>outdoor cleaning</option>
                        </select>
                    </div>
                    <div className="input-field">
                        Hazardous materials:
                        <select
                            className="browser-default"
                            value={data.hazardousMaterials}
                            name="hazardousMaterials"
                            onChange={changeHandler}
                        >
                            <option value='Choose your option' disabled>Choose your option</option>
                            <option value='true'>true</option>
                            <option value='false'>false</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <label>
                        Service fee:
                            <input
                                type="number"
                                name="serviceFee"
                                defaultValue={data.serviceFee}
                                onChange={changeHandler}
                            />
                        </label>
                    </div>
                         <label>
                            Start date:
                            <input
                                type="date"
                                name="startDate"
                                value={data.startDate}
                                onChange={changeHandler}
                            />
                        </label>
                        <label>
                            End date:
                            <input
                                type="date"
                                name="startDate"
                                value={data.endDate}
                                onChange={changeHandler}
                            />
                        </label>
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