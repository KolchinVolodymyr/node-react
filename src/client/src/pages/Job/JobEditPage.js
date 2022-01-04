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
    const [worksites, setWorksites] = useState([]);
    const [currentWorksiteID, setCurrentWorksiteID] = useState(null);

    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/job/${ID}/edit`, 'GET');
            setData(response.job);
            setWorksites(response.worksitesList);
            setCurrentWorksiteID(response.job.worksiteID);
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
            const response = await request(`/job/${ID}/edit`, 'PUT', {...data, id: ID, currentWorksiteID: currentWorksiteID});
            // message(response.message);
            setData(response);
            history.push(`/job/list`);
        } catch (e) {console.log(e)}

    }

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
                            value={data.worksiteID || 'Choose your option'}
                            name="worksiteID"
                            onChange={changeHandler}
                        >
                        <option value='Choose your option' disabled>Choose your option</option>
                        {worksites.map(el => {
                            return (
                                <option key={el._id} value={el._id}>{el.name}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="input-field">
                        Type:
                        <select
                            className="browser-default"
                            value={data.type || 'Choose your option'}
                            name="type"
                            onChange={changeHandler}
                        >
                            <option value='Choose your option' disabled>Choose your option</option>
                            <option value='home cleaning'>home cleaning</option>
                            <option value='office cleaning'>office cleaning</option>
                            <option value='industrial area cleaning'>industrial area cleaning</option>
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

                        Service fee:
                            <input
                                type="number"
                                name="serviceFee"
                                defaultValue={data.serviceFee}
                                onChange={changeHandler}
                            />
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