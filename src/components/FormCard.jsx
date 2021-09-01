import React, {useState} from 'react';
import { useEffect } from 'react';
import { Card } from "react-bootstrap";

const FormCard = ({ name, email, imageFile, comment, gender }) => {
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        let url = URL.createObjectURL(imageFile);
        setImageURL(url);
        return () => {
            URL.revokeObjectURL(url);
        }
    },[imageFile])
    return (
        <Card className="w-30% m-1 p-1 border border-dark p-2 m-1 mx-auto rounded">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Link href="#">{email}</Card.Link>
                <Card.Text>{gender ? 'male' ? "Male" : gender ? 'female' : "Female" : "Others"}</Card.Text>
                <Card.Img className="img-fluid w-80 mb-2" varaint="bottom" src={imageURL} alt="imgFile" />
                <Card.Subtitle>Form Data - Build using React-Bootstrap</Card.Subtitle>
                <Card.Body>
                    {comment}
                </Card.Body>
            </Card.Body>
        </Card>
    )
}

export default FormCard;
