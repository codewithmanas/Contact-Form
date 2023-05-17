import "./ContactForm.css";
import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handlePreview = (e) => {
        e.preventDefault();
        setIsPreview(true);
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Name: name,
            Email: email,
            Phone: phone,
            Message: message
        }
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.post(apiUrl, data)
        .then(res => {
            console.log(res);
            if(res.status === 200) {
                console.log("Form Submitted Successfully");
                setShowSuccessMessage(true);
                setIsVisible(true);

                setTimeout(() => {
                    // setShowSuccessMessage(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }, 3000);

            } else {
                console.log("Failed: Try Again");
                setShowErrorMessage(true);
                setIsVisible(true);

                // setTimeout(() => {
                //     setShowErrorMessage(false);
                //   }, 3000);
            }
        })
        
    }
    const handleEdit = () => {
        setIsPreview(false);
    };

  return (
    <div>
        {isVisible ? (
            <div>
          {showSuccessMessage && (
            <div style={{ color: 'green',
            textAlign: "center",
            boxShadow: "0 0 4px 4px green",
            maxWidth: "300px",
            margin: "0 auto",
            marginTop: "5rem",
            borderRadius: "4px",
            lineHeight: "1.5"}}>Form submitted successfully</div>
          )}
          {showErrorMessage && (
            <div style={{ color: 'red',
            textAlign: "center",
            maxWidth: "300px",
            margin: "0 auto",
            marginTop: "5rem",
            lineHeight: "1.5"}}>Failed, please try again</div>
          )}
        </div>
        ) : (
            <div>
            {isPreview ? (
        <div className="preview__container">
          <h3 className="preview__title">Preview</h3>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Message:</strong> {message}
          </p>
          <div className="preview__buttons">
            <button className="edit__button" onClick={handleEdit}>Edit</button>
            <button className="submit__button" onClick={handleSubmit}>Submit</button>
          </div>

            {showSuccessMessage && 
            <div style={{ color: 'green' }}>Form submitted successfully</div> }

            {showErrorMessage && 
            <div style={{ color: 'red' }}>Failed, please try again</div> }
        </div>
        ) : (
            <div className="form__container">
        <h1 className="form__heading">Contact Us</h1>
        <form className="contact__form" onSubmit={handlePreview}>
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                placeholder="Enter your name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                 />

            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />

            <label htmlFor="phone">Phone</label>
            <input 
                type="text" 
                placeholder="Enter your phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                 />

            <label htmlFor="message">Message</label>
            <textarea 
                type="text" 
                placeholder="Enter your message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                 />
            
            <button type="submit" className="preview__btn">Preview</button>
        </form>
    </div>
        ) }
            </div>
        ) }
    </div>
  )
}

