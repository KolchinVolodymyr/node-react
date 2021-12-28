import React, {useState, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const JobAddPage = () => {
    const {request} = useHttp();
    const [data, setData] = useState({
        worksiteID: '', type: '', hazardousMaterials: '', serviceFee: '', startDate: '', endDate: ''
    });
    /*
    worksiteID: request.payload.worksiteID,
                    type: request.payload.type,
                    hazardousMaterials: request.payload.hazardousMaterials,
                    serviceFee: request.payload.serviceFee,
                    startDate: request.payload.startDate,
                    endDate: request.payload.endDate,
    */

    const handleSubmitCreate = async () => {
        try {
            const response = await request('/job', 'POST', {...data})
            // message(response.message);
            console.log('response', response);
            console.log('response.message', response.message);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
        console.log('data', data)
    }

    return(
        <div>
            <h1>
                Job add Page
            </h1>
            <form>
            <label>Worksite:</label>
                <select
                    className="browser-default"
                    defaultValue='Choose your option'
                    name="worksiteID"
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
                <label>Type:</label>
                    <select
                        className="browser-default"
                        defaultValue='Choose your option'
                        name="type"
                        onChange={changeHandler}
                    >
                        <option value='Choose your option' disabled>Choose your option</option>
                        <option value='office cleaning'>office cleaning</option>
                        <option value='home cleaning'>home cleaning</option>
                        <option value='deep cleaning'>deep cleaning</option>
                        <option value='outdoor cleaning'>outdoor cleaning</option>
                    </select>
                <label>Hazardous materials</label>
                    <select
                        className="browser-default"
                        defaultValue='Choose your option'
                        name="hazardousMaterials"
                        onChange={changeHandler}
                    >
                        <option value='Choose your option' disabled>Choose your option</option>
                        <option value='true'>true</option>
                        <option value='false'>false</option>
                    </select>

                <label>
                    Service fee:
                    <input
                        type="number"
                        name="serviceFee"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Start date:
                    <input
                        type="date"
                        name="startDate"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    End date:
                    <input
                        type="date"
                        name="endDate"
                        onChange={changeHandler}
                    />
                </label>


                <button onClick={handleSubmitCreate} type="primary">Create</button>
            </form>
        </div>
    )
}