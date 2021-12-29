import React, {useState} from 'react';
import {useHttp} from "../../hooks/http.hook";

export const EquipmentAddPage = () => {
    const {request} = useHttp();
    const [data, setData] = useState({
        name: '', storageLocation: '', usageFee: '', status: ''
    });

    const handleSubmitCreate = async () => {
        try {
            const response = await request('/equipment', 'POST', {...data})
            // message(response.message);
            console.log('response', response);
            // console.log('response.message', response.message);
            // history.push(`/`);
        } catch (e) {console.log(e)}
    };

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <h1>
                Equipment Page
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
                    Storage location:
                    <input
                        type="text"
                        name="storageLocation"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Usage Fee:
                    <input
                        type="text"
                        name="usageFee"
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