import "./Contacts.css"



export default function Contacts() {
    return (
        <div className = "CON-CONTACTS">
            <div>
                <img src="./email-icon.png" alt="" />
                <h4>email</h4>
                <p>dHgravirovani.cz</p>
            </div>
            <div className="CENTER">
                <img src="./telefon-icon.png" alt="" />
                <h4>telefon</h4>
                <p>123456789</p>
            </div>
            <div>
                <img src="./instagram-icon.png" alt="" />
                <h4>Instagram</h4>
                <p>123456789</p>
            </div>
        </div>
    )

}