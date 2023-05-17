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
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }, 3000);

            } else {
                console.log("Failed: Try Again");
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                  }, 3000);
            }
        })
        
    }

  return (
    <div className="form__container">
        <h1 className="form__heading">Contact Us</h1>
        <form className="contact__form" onSubmit={handleSubmit}>
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
            
            <button type="submit" className="submit__button">Submit</button>
        </form>
        {showSuccessMessage && 
        <div style={{ color: 'green' }}>Form submitted successfully</div> }

        {showErrorMessage && 
        <div style={{ color: 'red' }}>Failed, please try again</div> }
    </div>
  )
}

