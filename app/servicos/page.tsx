'use client';

import React, { useState, useEffect } from 'react';

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
          <a href="/" style={{ ...navStyles.link, ...navStyles.activeLink }}>Início</a>
          <a href="#servicos" style={navStyles.link}>Serviços</a>
          <a href="/agendamento" style={navStyles.link}>Agendamento</a>
          <a href="#contactos" style={navStyles.link}>Contactos</a>
        </nav>
      </div>
    </header>
  );
}

const SLIDES = [
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
];

export default function ServicosAvancadosPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.bgSlide,
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url(${slide})`,
              opacity: index === currentSlide ? 1 : 0,
            }}
          />
        ))}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Soluções Logísticas Globais e Especializadas</h1>
          <p style={styles.heroSubtitle}>
            Da mudança residencial chave na mão ao apoio logístico avançado para transitários e empresas em Portugal Continental e Ilhas.
          </p>
          <div style={styles.heroButtons}>
            <a href="/agendamento" style={styles.btnPrimary}>Simular Orçamento</a>
            <a href="#servicos" style={styles.btnSecondary}>Explorar Serviços</a>
          </div>
        </div>
      </section>

      {/* BLOCOS DE SERVIÇOS DETALHADOS */}
      <section id="servicos" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Os Nossos Serviços Profissionais</h2>
          <p style={styles.sectionSubtitle}>Rigores logísticos adaptados a particulares, empresas e parceiros internacionais.</p>
        </div>

        <div style={styles.containerBlocks}>

          {/* 1. MUDANÇAS RESIDENCIAIS E SERVIÇO PREMIUM */}
          <div style={styles.blockRow}>
            <div style={styles.blockText}>
              <span style={styles.badge}>Particular & Premium</span>
              <h3 style={styles.blockTitle}>Mudanças Residenciais & Serviço Premium "Chave na Mão"</h3>
              <p style={styles.blockDescription}>
                Mudar de casa não tem de ser sinónimo de fadiga ou preocupação. Com o nosso <strong>Serviço Premium Chave na Mão</strong>, assumimos o processo do princípio ao fim com um nível de exigência inigualável. Criamos previamente um mapa detalhado da sua habitação para prever cada detalhe logístico.
              </p>
              <p style={styles.blockDescription}>
                A nossa equipa especializada cuida de tudo: desde o empacotamento cirúrgico de peças delicadas como talheres, copos e loiças finas, até à desmontagem, proteção e montagem de todo o mobiliário, garantindo que tudo fica rigorosamente no seu devido sítio na nova casa.
              </p>
            </div>
            <div style={styles.blockImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80" 
                alt="Mudanças Residenciais Premium" 
                style={styles.blockImage} 
              />
            </div>
          </div>

          {/* 2. EMPRESAS E ESCRITÓRIOS (Zigue-zague invertido) */}
          <div style={{ ...styles.blockRow, flexDirection: 'row-reverse' }}>
            <div style={styles.blockText}>
              <span style={styles.badge}>Corporativo</span>
              <h3 style={styles.blockTitle}>Empresas e Escritórios</h3>
              <p style={styles.blockDescription}>
                A expansão ou relocalização de uma empresa exige planeamento cirúrgico para evitar paragens indesejadas na produtividade. Na NorteCargo, asseguramos a transição perfeita de escritórios, espaços comerciais e armazéns corporativos.
              </p>
              <p style={styles.blockDescription}>
                Garantimos o transporte seguro de equipamentos informáticos sensíveis, arquivos confidenciais e mobiliário técnico, permitindo que a sua equipa volte a trabalhar no menor espaço de tempo possível e com total tranquilidade.
              </p>
            </div>
            <div style={styles.blockImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                alt="Empresas e Escritórios" 
                style={styles.blockImage} 
              />
            </div>
          </div>

          {/* 3. GRUPAGENS DE CARGA */}
          <div style={styles.blockRow}>
            <div style={styles.blockText}>
              <span style={styles.badge}>Logística Flexível</span>
              <h3 style={styles.blockTitle}>Grupagens de Carga</h3>
              <p style={styles.blockDescription}>
                Para envios que não necessitam da totalidade de um veículo, disponibilizamos soluções inteligentes de grupagem de carga. Esta modalidade permite otimizar custos logísticos através da partilha segura de espaço de transporte.
              </p>
              <p style={styles.blockDescription}>
                Mantemos um rigoroso controlo de rota e de manuseamento, assegurando que tanto mercadorias volumosas como cargas menores chegam ao destino com a máxima integridade e pontualidade.
              </p>
            </div>
            <div style={styles.blockImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
                alt="Grupagens de Carga" 
                style={styles.blockImage} 
              />
            </div>
          </div>

          {/* 4. APOIO AOS TRANSITÁRIOS INTERNACIONAIS (Zigue-zague invertido) */}
          <div style={{ ...styles.blockRow, flexDirection: 'row-reverse' }}>
            <div style={styles.blockText}>
              <span style={styles.badge}>Parcerias B2B</span>
              <h3 style={styles.blockTitle}>Apoio aos Transitários Internacionais</h3>
              <p style={styles.blockDescription}>
                Atuamos como um braço operacional de confiança em território nacional para grandes transitários globais. Colaboramos na execução de serviços de última milha, recolhas, entregas complexas e distribuição especializada.
              </p>
              <p style={styles.blockDescription}>
                Compreendemos as exigências do mercado internacional e oferecemos a flexibilidade, o profissionalismo e a infraestrutura que os operadores logísticos globais procuram ao descentralizar operações em Portugal.
              </p>
            </div>
            <div style={styles.blockImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80" 
                alt="Apoio a Transitários" 
                style={styles.blockImage} 
              />
            </div>
          </div>

          {/* 5. REDE DE PARCERIAS (CONTINENTE E ILHAS) */}
          <div style={styles.blockRow}>
            <div style={styles.blockText}>
              <span style={styles.badge}>Nacional & Ilhas</span>
              <h3 style={styles.blockTitle}>Parcerias Abrangentes: Continente e Ilhas</h3>
              <p style={styles.blockDescription}>
                A nossa capacidade operacional estende-se muito para além de uma operação local. Graças a uma sólida e testada rede de parcerias estratégicas, cobrimos de forma integrada todo o território de <strong>Portugal Continental</strong>.
              </p>
              <p style={styles.blockDescription}>
                Além disso, asseguramos ligações fluídas e regulares para os arquipélagos dos <strong>Açores e da Madeira</strong>, garantindo que as necessidades logísticas dos nossos clientes encontram sempre uma resposta viável, segura e profissional em qualquer ponto do país.
              </p>
            </div>
            <div style={styles.blockImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                alt="Continente e Ilhas" 
                style={styles.blockImage} 
              />
            </div>
          </div>

        </div>
      </section>

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
  heroSection: {
    position: 'relative',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '100px 20px',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: '420px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '40px',
    fontWeight: 800,
    margin: '0 0 20px 0',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#e2e8f0',
    margin: '0 0 32px 0',
    lineHeight: '1.6',
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '16px',
  },
  btnSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '16px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  section: {
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '0 20px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '32px',
    color: '#0f172a',
    margin: '0 0 12px 0',
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: '18px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  containerBlocks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
  },
  blockRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
    flexWrap: 'wrap',
  },
  blockText: {
    flex: '1 1 450px',
  },
  blockImageWrapper: {
    flex: '1 1 400px',
    height: '300px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  blockImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    backgroundColor: '#e0f2fe',
    color: '#0f2b5c',
    fontSize: '12px',
    fontWeight: 800,
    padding: '6px 12px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginBottom: '12px',
  },
  blockTitle: {
    fontSize: '24px',
    color: '#0f172a',
    margin: '0 0 16px 0',
  },
  blockDescription: {
    color: '#475569',
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 16px 0',
  },
  footer: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '40px 20px 20px 20px',
    marginTop: '80px',
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