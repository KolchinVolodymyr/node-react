import React, {useState, useEffect, useCallback} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const JobAddPage = () => {
    const {request} = useHttp();
    const [data, setData] = useState({
        worksiteID: '', type: '', hazardousMaterials: '', serviceFee: '', startDate: '', endDate: '', employeesID: ''
    });
    const [worksites, setWorksites] = useState([]);
    const [employees, setEmployees] = useState([]);

    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/job`, 'GET');
            setWorksites(response.worksites);
            setEmployees(response.employees);
            console.log('response', response);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    }, [request]);

    useEffect(()=>{
        fetchClient()
    }, []);

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
    }

    return(
        <div>
            <h1>
                Job add Page
            </h1>
            <form>
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

                <select
                    className="browser-default"
                    value={data.employeesID || "Choose your option"}
                    name="employeesID"
                    onChange={changeHandler}
                >
                    <option value='Choose your option' disabled>Choose your option</option>
                    {employees.map(el =>{
                        return (
                            <option key={el._id} value={el._id}>{el.name}</option>
                        )
                    })}
                </select>
            </form>
        </div>
    )
}