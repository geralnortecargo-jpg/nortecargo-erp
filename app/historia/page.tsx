'use client';

import React, { useState, useEffect } from 'react';

// Imagens para os sliders laterais dos blocos
const SLIDES_1 = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
];

const SLIDES_2 = [
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
];

const SLIDES_3 = [
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
];

// Imagem do Porto de Leixões (Vista Aérea) para a faixa azul
const FOTO_LEIXOES_AEREA = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80';

// Componente do Mini Slider Quadrado
function MiniSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div style={styles.squareSlider}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            ...styles.slideImg,
            backgroundImage: `url(${img})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

// Navbar Superior
function Navbar() {
  return (
    <header style={navStyles.headerWrapper}>
      <div style={navStyles.topBar}>
        <div style={navStyles.topBarContainer}>
          <span>📞 Orçamentos: <strong>965 531 009</strong></span>
          <span>✉️ <strong>Geral@nortecargo.pt</strong></span>
        </div>
      </div>

      <div style={navStyles.navContainer}>
        <div style={navStyles.logoArea}>
          <a href="/" style={navStyles.logoLink}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ lineHeight: '1' }}>
                <span style={navStyles.logoTextNorte}>NORTE</span>
                <span style={navStyles.logoTextCargo}>CARGO</span>
              </div>
              <span style={navStyles.logoSubtext}>MUDANÇAS E TRANSPORTES</span>
            </div>
          </a>
        </div>
        <nav style={navStyles.navLinks}>
          <a href="/" style={navStyles.link}>Início</a>
          <a href="/historia" style={{ ...navStyles.link, ...navStyles.activeLink }}>História</a>
          <a href="/#agendamento" style={navStyles.link}>Agendamento</a>
          <a href="/#servicos" style={navStyles.link}>Serviços</a>
          <a href="#contactos" style={navStyles.link}>Contactos</a>
        </nav>
      </div>
    </header>
  );
}

export default function HistoriaPage() {
  return (
    <div>
      <Navbar />

      {/* CABEÇALHO COM IMAGEM AÉREA DO PORTO DE LEIXÕES */}
      <section
        style={{
          ...styles.heroBanner,
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url(${FOTO_LEIXOES_AEREA})`,
        }}
      >
        <h1 style={styles.mainTitle}>Nortecargo, A Construção de uma Empresa</h1>
      </section>

      {/* CONTEÚDO EM BLOCOS ALTERNADOS */}
      <div style={styles.container}>

        {/* BLOCO 1: Texto Esquerda | Imagem Direita */}
        <div style={styles.row}>
          <div style={styles.textCol}>
            <h2 style={styles.blockTitle}>A Nossa Missão</h2>
            <p style={styles.paragraph}>
              Na <strong>NorteCargo</strong>, acreditamos que uma mudança não é apenas um transporte do Ponto A para um ponto B; trata-se de transportar vidas, memórias e conforto. Com <strong>15 anos de experiência acumulada</strong>, estabelecemos uma reputação de rigor, segurança e transparência.
            </p>
          </div>
          <div style={styles.mediaCol}>
            <MiniSlider images={SLIDES_1} />
          </div>
        </div>

        {/* BLOCO 2: Imagem Esquerda | Texto Direita */}
        <div style={{ ...styles.row, ...styles.rowReverse }}>
          <div style={styles.textCol}>
            <h2 style={styles.blockTitle}>O Que Nos Distingue</h2>
            <p style={styles.paragraph}>
              Verdadeiramente global dentro do setor. O nosso serviço é <strong>"chave na mão"</strong>, para que não tenha de se preocupar com nada.
            </p>
            <p style={styles.paragraph}>
              <strong>Montagem e Desmontagem Profissional:</strong> Possuímos ferramentas adequadas e know-how técnico para desmontar e montar todo o tipo de mobiliário. Seja mobiliário de design, madeira maciça ou peças de marcas como <strong>IKEA, Conforama, JYSK</strong>, entre outras, tratamos cada peça com o cuidado que exige.
            </p>
          </div>
          <div style={styles.mediaCol}>
            <MiniSlider images={SLIDES_2} />
          </div>
        </div>

        {/* BLOCO 3: Texto Esquerda | Imagem Direita */}
        <div style={styles.row}>
          <div style={styles.textCol}>
            <h2 style={styles.blockTitle}>A Nossa Força em Rede</h2>
            <p style={styles.paragraph}>
              A vasta rede de parceiros espalhados por todo o país. Esta capilaridade permite-nos manter padrões de qualidade, garantindo sempre a mesma proximidade e excelência de serviço que nos define há uma década e meia.
            </p>
          </div>
          <div style={styles.mediaCol}>
            <MiniSlider images={SLIDES_3} />
          </div>
        </div>

        {/* BOTÃO DE AGENDAMENTO */}
        <div style={styles.ctaBox}>
          <h3>Precisa de agendar a sua mudança?</h3>
          <p>Utilize a nossa plataforma online ou entre em contacto direto connosco.</p>
          <a href="/#agendamento" style={styles.btnPrimary}>Ir para Agendamento</a>
        </div>

      </div>

      {/* FOOTER */}
      <footer id="contactos" style={styles.footer}>
        <div style={styles.footerContainer}>
          <div>
            <h3 style={{ margin: '0 0 12px 0' }}>NORTECARGO</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Especialistas em serviços de mudanças e transportes com total segurança e profissionalismo.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: '#f8fafc' }}>Contactos Directos</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0' }}>📞 965 531 009</p>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0' }}>✉️ Geral@nortecargo.pt</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          © {new Date().getFullYear()} NorteCargo. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

const navStyles: { [key: string]: React.CSSProperties } = {
  headerWrapper: {
    width: '100%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  topBar: {
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    fontSize: '13px',
    padding: '8px 0',
    borderBottom: '1px solid #1e293b',
  },
  topBarContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '24px',
  },
  navContainer: {
    backgroundColor: '#ffffff',
    maxWidth: '100%',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
  },
  logoArea: {
    maxWidth: '1200px',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logoTextNorte: {
    color: '#0f2b5c',
    fontSize: '28px',
    fontWeight: '900',
    letterSpacing: '-0.5px',
  },
  logoTextCargo: {
    color: '#16a34a',
    fontSize: '28px',
    fontWeight: '900',
    marginLeft: '3px',
    letterSpacing: '-0.5px',
  },
  logoSubtext: {
    color: '#475569',
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    marginTop: '2px',
  },
  navLinks: {
    display: 'flex',
    gap: '28px',
  },
  link: {
    color: '#334155',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 600,
  },
  activeLink: {
    color: '#16a34a',
    fontWeight: 700,
  },
};

const styles: { [key: string]: React.CSSProperties } = {
  heroBanner: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '90px 20px',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: 800,
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.4)',
  },
  container: {
    maxWidth: '1100px',
    margin: '50px auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  textCol: {
    flex: '1 1 450px',
  },
  mediaCol: {
    flex: '0 0 350px',
    display: 'flex',
    justifyContent: 'center',
  },
  blockTitle: {
    fontSize: '26px',
    color: '#0f2b5c',
    marginBottom: '16px',
  },
  paragraph: {
    fontSize: '16px',
    color: '#334155',
    lineHeight: '1.7',
    marginBottom: '12px',
  },
  squareSlider: {
    width: '320px',
    height: '320px',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  },
  slideImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
  },
  ctaBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    marginTop: '20px',
  },
  btnPrimary: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    display: 'inline-block',
    marginTop: '12px',
  },
  footer: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '40px 20px 20px 20px',
    marginTop: '60px',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    paddingBottom: '30px',
    borderBottom: '1px solid #1e293b',
  },
  footerBottom: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '13px',
    paddingTop: '20px',
  },
};