import React, {useState, useEffect, useCallback} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const EmployeesEditPage = () => {
    let history = useHistory();
    const ID = useParams().id;
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', address: '', phone: '', date_of_birth: '', salary: '', status: ''
    });
    const fetchClient = useCallback(async () => {
        try {
            const response = await request(`/employees/${ID}/edit`, 'GET');
            setData(response.employees);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    }, [ID, request]);

    useEffect(()=>{
        fetchClient()
    }, []);

    const pressHandler = async ()  => {
        try {
            const response = await request(`/employees/${ID}/edit`, 'PUT', {...data, id: ID});
            // message(response.message);
            setData(response);
            history.push(`/employees/list`);
        } catch (e) {console.log(e)}
    }
    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
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
                            value={data.name}
                            onChange={changeHandler}
                        />
                        <label className="active" htmlFor="link">Enter the name</label>
                    </div>
                    <div className="input-field">
                        <input
                            name="address"
                            type="text"
                            className="validate"
                            value={data.address}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="number"
                            name="phone"
                            value={data.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        Date of birth:
                        <input
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        Salary:
                        <input
                            type="number"
                            name="salary"
                            value={data.salary}
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