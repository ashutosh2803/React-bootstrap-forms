import React, {useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
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
    const { name, email, comment, agreement, gender } = state;
    return (
        <>
            <Container className="w-50 border border-dark p-2 m-1 mx-auto rounded">
                <h1 className="text-danger text-center">Bootstrap Forms</h1>
                <Form>
                    <Form.Group controlId="form.Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={inputRef} name="name" value={name} onChange={handleChange} placeholder="Enter name" type="text" />
                    </Form.Group>
                    <Form.Group controlId="form.Email">
                        <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={email} onChange={handleChange} placeholder="name@example.com" type="email" />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="form.Textarea">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control placeholder="Write your comments here..." name="comment" value={comment} onChange={handleChange} as="textarea" rows={3} />
                    </Form.Group>
                    {/* <Form.Group controlId="formSelect">
                        <Form.Select name="gender" onChange={handleChange}>
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </Form.Select>
                    </Form.Group> */}
                    <Form.Group controlId="form.File" className="m-3">
                        <Form.Label>(Select Profile Picture)</Form.Label><br/>
                        <Form.Control name="imageFile" ref={imageRef} type="file" />
                    </Form.Group>
                    <Form.Group controlId="form.Check">
                            <Form.Check label="Click here to agree to terms and conditions." type="checkbox" name="agreement" checked={agreement} onChange={handleChange} />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" onClick={handleSubmit} type="submit">Submit</Button>
                    </div>
                </Form>
            </Container>
            <Container className="w-25 h-25 m-2">
                {data?.map((item) => <FormCard key={item.id} {...item} />)}
            </Container>
        </>
    )
}

export default SimpleForm;
