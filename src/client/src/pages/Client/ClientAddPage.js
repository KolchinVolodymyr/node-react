import React, {useState} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const ClientAddPage = () => {
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', address: '', phone: '', contactPerson: '', client: '', status: ''
    });

    const handleSubmitCreate = async () => {
        try {
            const response = await request('/client', 'POST', {...data})
            // message(response.message);
            setData(response);
            console.log('response.message', response.message);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
    }
    const changeHandlerChecked = (event) => {
        setData({...data, [event.target.name]: event.target.checked});
    }

    return(
        <div>
            <h1>
                Client Page
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
                    Contact person:
                    <input
                        type="text"
                        name="contactPerson"
                        onChange={changeHandler}
                    />
                </label>
                <label>Corporate or personal?</label>
                <select
                    className="browser-default"
                    defaultValue='Choose your option'
                    name="client"
                    onChange={changeHandler}
                >
                    <option value='Choose your option' disabled>Choose your option</option>
                    <option value='Corporate'>Corporate</option>
                    <option value='Personal'>Personal</option>
                </select>
                <label>Status</label>
                <p>
                    <label>
                        <input
                            type="checkbox"
                            name="status"
                            className="filled-in"
                            checked={data.status}
                            onChange={changeHandlerChecked}
                        />
                        <span>Status</span>
                    </label>
                </p>
                <button onClick={handleSubmitCreate} type="primary">Create</button>
            </form>
        </div>
    )
}