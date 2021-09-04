import React, {useState} from 'react';
import { useEffect } from 'react';

const FormCard = ({ name, email, imageFile, comment, gender, birthday }) => {
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        let url = URL.createObjectURL(imageFile);
        setImageURL(url);
        return () => {
            URL.revokeObjectURL(url);
        }
    },[imageFile])
    return (
        <div className="card w-30% p-1 border border-dark p-2 rounded col">
            <div className="card-body">
                <div className="card-title">{name}</div>
                <a className="card-link" href="#!">{email}</a>
                <div className="card-text">{gender ? 'male' ? "Male" : gender ? 'female' : "Female" : "Others"}</div>
                <div className="card-text">D.O.B - { birthday}</div>
                <img className="card-img rounded img-fluid w-55 mb-2" varaint="bottom" src={imageURL} alt="imgFile" />
                <div className="card-subtitle text-success">Form Data - Build using React-Bootstrap</div>
                <div className="text-secondary">{comment}</div>
            </div>
        </div>
    )
}

export default FormCard;
