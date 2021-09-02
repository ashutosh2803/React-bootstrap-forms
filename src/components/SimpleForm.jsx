import React, {useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
import FormCard from './FormCard';

const initialState = {
    name: "",
    email: "",
    comment: "",
    agreement: false,
    gender: ""
}

const SimpleForm = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState([]);
    let imageRef = useRef();
    let inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    },[])

    const handleChange = (e) => {
        let { name, value, type, checked } = e.currentTarget;
        const val = type === "checkbox" ? checked : value;
        setState({
            ...state,
            [name] : val
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: uuid(),
            ...state,
            imageFile: imageRef.current.files[0]
        }
        setData([...data, payload]);
        console.log(data);
    }
    const { name, email, comment, agreement } = state;
    return (
        <>
            <div className="container w-90 p-2 m-1 mx-auto">
                {/* <h1 className="text-danger text-center">Bootstrap Forms</h1> */}
                <form className="form">
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input className="form-control" ref={inputRef} name="name" value={name} onChange={handleChange} placeholder="Enter name" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-control" name="email" value={email} onChange={handleChange} placeholder="name@example.com" type="email" />
                        <div className="form-text text-muted">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Comment</label>
                        <textarea className="form-control" placeholder="Write your comments here..." name="comment" value={comment} onChange={handleChange} as="textarea" rows={3}></textarea>
                    </div>
                    <div className="form-group">
                        <select className="form-select" as="select" name="gender" onChange={handleChange}>
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="form-group m-3">
                        <label className="form-label">(Select Profile Picture)</label><br/>
                        <input className="form-control" name="imageFile" ref={imageRef} type="file" />
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input className="custom-control-input mx-1" type="checkbox" name="agreement" checked={agreement} onChange={handleChange} />
                        <label className="custom-control-label">Click here to agree to terms and conditions.</label>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" variant="primary" onClick={handleSubmit} type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className="container w-25 h-25 m-2">
                {data?.map((item) => <FormCard key={item.id} {...item} />)}
            </div>
        </>
    )
}

export default SimpleForm;
