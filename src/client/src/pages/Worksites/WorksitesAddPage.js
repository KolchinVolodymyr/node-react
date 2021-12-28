import React, {useState, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const WorksitesAddPage = () => {
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', address: '', type: '', status: '', worksitesClient: ''
    });

    const handleSubmitCreate = async () => {
        try {
            const response = await request('/worksites', 'POST', {...data})
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
                Worksites Page
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
                    Address:
                    <input
                        type="text"
                        name="address"
                        onChange={changeHandler}
                    />
                </label>
                <label>Choose your option</label>
                <select
                    className="browser-default"
                    defaultValue='Choose your option'
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