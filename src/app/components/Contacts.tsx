import "./Contacts.css"



export default function Contacts() {
    return (
        <div className = "CON-CONTACTS">
            <div>
                <img src="./email-icon.png" alt="" />
                <h4>email</h4>
                <p>d.h.engraving@seznam.cz</p>
            </div>
            <div className="CENTER">
                <img src="./telefon-icon.png" alt="" />
                <h4>telefon</h4>
                <p>+420 725 114 239</p>
            </div>
            <div>
                <img src="./instagram-icon.png" alt="" />
                <h4>Instagram</h4>
                <p><a style={{textDecoration: "none", color: "white"}} target="_blank" href="https://www.instagram.com/d.h.gravirovani/">d.h.gravirovani</a></p>
            </div>
        </div>
    )

}