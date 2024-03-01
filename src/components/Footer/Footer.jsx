import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Contact Us</h3>
                        <ul className="contact-details">
                            <li>Email: <a href="mailto:sageandwhistle@gmail.com" className='email'>sageandwhistle@gmail.com</a></li>
                            <li>Hampshire, United Kingdom</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h3>Follow Us</h3>
                        <ul className="social-icons">
                            <li><a href="https://www.facebook.com/profile.php?id=61553593417438"><FontAwesomeIcon icon={faFacebook} className="blackIcon"/></a></li> &nbsp;
                            <li><a href="https://www.instagram.com/sage_and_whistle?igsh=dGxjbWJkbXlkMDl6&utm_source=qr"><FontAwesomeIcon icon={faInstagram} className="blackIcon"/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
