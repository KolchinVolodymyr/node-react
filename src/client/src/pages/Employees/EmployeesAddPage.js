import React, {useState} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const EmployeesAddPage = () => {
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', address: '', phone: '', salary: '', date_of_birth: '', status: ''
    });

    const handleSubmitCreate = async () => {
        try {
            const response = await request('/employees', 'POST', {...data})
            // message(response.message);
            console.log('response', response);
            // console.log('response.message', response.message);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
        console.log('Employees data', data)
    }

    return(
        <div>
            <h1>
                Employees Page
            </h1>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Primary office address:
                    <input
                        type="text"
                        name="address"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Contact phone:
                    <input
                        type="text"
                        name="phone"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Date of birth:
                    <input
                        type="date"
                        name="date_of_birth"
                        onChange={changeHandler}
                    />
                </label>
                <label>Status</label>
                <select
                    className="browser-default"
                    defaultValue='Choose your option'
                    name="status"
                    onChange={changeHandler}
                >
                    <option value='Choose your option' disabled>Choose your option</option>
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                </select>
                <button onClick={handleSubmitCreate} type="primary">Create</button>
            </form>
        </div>
    )
}