import "./About.css";

export default function About() {
    return (
        <div className="ABOUT">
            <div className="ABOUT-TEXT">
                <h3 className="ABOUT-TEXT-HEADER">O nás</h3>
                <p className="ABOUT-TEXT-PARAGRAPH-1">Jsme malá začínající dílna, která se specializuje na gravírování a laserové řezání do dřeva. Každý výrobek vzniká s důrazem na detail a osobní přístup. Věříme, že dřevo je materiál, který dokáže vyprávět příběhy – a naším cílem je proměnit vaše nápady v jedinečné produkty, které vydrží celý život.</p>
                <p className="ABOUT-TEXT-PARAGRAPH-2">Ať už hledáte originální dárek, dekoraci nebo zakázkový projekt, jsme tu pro vás. Každý kus je pro nás jedinečný – stejně jako váš příběh.</p>
            </div>
            <div className="ABOUT-IMAGE">
                <p className="browser-warning">
                If this looks wonky to you it's because this browser doesn't support the CSS
                property 'aspect-ratio'.
                </p>

                        <div className="image"><img className="img" src="./logo-white.png" alt="logo DH gravirovani" /></div>

            </div>
        </div>
    )
}