"use client";
import "./Services.css";

export default function Services() {
  return (
    <section className="services">
      <h2 className="services-title">SLUŽBY</h2>

      <div className="services-grid">
        <div className="card highlight">
          <h4>GRAVÍROVÁNÍ</h4>
          <h3 className="orange">NA ZAKÁZKU</h3>
          <div className="line-services"></div>
          <p>
            Precizní a trvanlivé gravírování na různé materiály podle vašich
            představ. Personalizujte dárky, firemní předměty nebo trofeje jednoduše a rychle.
          </p>
          <a href="#form" className="orangeB button">Domluvit se</a>
        </div>

        <div className="push card highlight">
          <h4>VÝROBA</h4>
          <h3 className="red">DÁRKOVÝCH PŘEDMĚTŮ</h3>
          <div className="line-services"></div>
          <p>
            Vytvoříme originální a personalizované dárkové předměty na míru.
            Perfektní pro firemní dárky i soukromé příležitosti.
          </p>
          <a href="#form" className="redB button">Domluvit se</a>
        </div>

        <div className="card highlight">
          <h4>VÝROBA</h4>
          <h3 className="orange">SVATEBNÍCH DEKORACÍ</h3>
          <div className="line-services"></div>
          <p>
            Navrhneme a vyrobíme krásné, originální dekorace, které dokonale
            podtrhnou atmosféru vašeho svatebního dne.
          </p>
          <a href="#form" className="orangeB button">Domluvit se</a>
        </div>

        <div className="card highlight">
          <h4>VÝROBA</h4>
          <h3 className="red">NAROZENINOVÝCH DEKORACÍ</h3>
          <div className="line-services"></div>
          <p>
            Vytvoříme jedinečné a stylové dekorace, které váš narozeninový den
            udělají nezapomenutelným.
          </p>
          <a href="#form" className="button redB">Domluvit se</a>
        </div>

        <div className="push card highlight">
          <h4>GRAVÍROVÁNÍ</h4>
          <h3 className="orange">FOTKY</h3>
          <div className="line-services"></div>
          <p>
            Přeměňte své oblíbené fotografie na jedinečné gravírované obrazy s
            vysokým detailem a trvanlivostí.
          </p>
          <a href="#form" className="button orangeB">Domluvit se</a>
        </div>

        <div className="card highlight">
          <h4>VÝROBA</h4>
          <h3 className="red">3D HRAČKY PRO DĚTI</h3>
          <div className="line-services"></div>
          <p>
            Vyrábíme bezpečné a originální 3D hračky na míru, které děti nadchnou
            a podpoří jejich kreativitu.
          </p>
          <a href="#form" className="button redB">Domluvit se</a>
        </div>
      </div>

      <div className="services-special">
        <h4>VÝROBA &amp; GRAVÍROVÁNÍ</h4>
        <h3>STŮL PODLE VAŠICH PŘEDSTAV</h3>
        <p>Tuhle službu momentálně připravujeme pro Vás.</p>
      </div>
    </section>
  );
}
