'use client';

import React, { useState, useEffect } from 'react';

// Componente do Menu Superior (Navbar)
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
          <a href="/historia" style={navStyles.link}>Início</a>
          <a href="#empresas" style={navStyles.link}>Empresas</a>
          <a href="/servicos" style={{ ...navStyles.link, ...navStyles.activeLink }}>Serviços</a>
          <a href="/agendamento" style={navStyles.link}>Agendamento</a>
          <a href="/contactos" style={navStyles.link}>Contacto</a>
        </nav>
      </div>
    </header>
  );
}

const SLIDES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showResidenciaisModal, setShowResidenciaisModal] = useState(false);
  const [showEmpresasModal, setShowEmpresasModal] = useState(false);

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
          <h1 style={styles.heroTitle}>Transportes e Mudanças com Confiança e Rigor</h1>
          <p style={styles.heroSubtitle}>
            Soluções completas de mudanças residenciais e empresariais em todo o país. Calcule o seu inventário e agende o serviço em minutos.
          </p>
          <div style={styles.heroButtons}>
            <a href="/agendamento" style={styles.btnPrimary}>Agendar Mudança Agora</a>
            <a href="#servicos" style={styles.btnSecondary}>Ver Nossos Serviços</a>
          </div>

          <div style={styles.dotsContainer}>
            {SLIDES.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  ...styles.dot,
                  backgroundColor: index === currentSlide ? '#16a34a' : 'rgba(255, 255, 255, 0.5)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO ACIMA: Texto de Introdução e Boas-vindas */}
      <section style={styles.welcomeSection}>
        <div style={styles.container}>
          <span style={styles.welcomeBadge}>Excelência em Logística e Mudanças</span>
          <h2 style={{ fontSize: '36px', color: '#0f172a', margin: '0 0 14px 0' }}>Bem-vindo à NorteCargo</h2>
          <p style={{ fontSize: '19px', color: '#16a34a', fontWeight: 600, marginBottom: '16px' }}>
            A sua solução de confiança para transportes nacionais, mudanças e grupagem.
          </p>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.8', maxWidth: '850px', margin: '0 auto' }}>
            Na NorteCargo, assumimos um compromisso diário com a excelência. Quer esteja a mudar de habitação, a relocalizar os escritórios da sua empresa ou a necessitar de transportar carga fracionada, dispomos dos meios técnicos e humanos ideais para assegurar um serviço rápido, seguro e sem complicações. Explore abaixo as nossas soluções dedicadas.
          </p>
        </div>
      </section>

      {/* SECÇÃO A NOSSA HISTÓRIA */}
      <section id="historia" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>A Nossa Missão</h2>
          <p style={styles.sectionSubtitle}>Na NorteCargo, acreditamos que o crescimento do seu negócio faz-se de Ponta a Ponta e para a frente, à base de rigor, dedicação e confiança.</p>
        </div>

        <div style={styles.timelineContainer}>
          <div style={styles.timelineCard}>
            <span style={styles.timelineBadge}>15 Anos</span>
            <h3 style={styles.cardTitle}>Experiência Acumulada</h3>
            <p style={styles.cardText}>
              Com 15 anos de experiência acumulada no setor, estabelecemos uma relação de confiança com cada cliente através de uma cultura de rigor, transparência e compromisso ético.
            </p>
          </div>

          <div style={styles.timelineCard}>
            <span style={styles.timelineBadge}>Rigor</span>
            <h3 style={styles.cardTitle}>O Que Nos Distingue</h3>
            <p style={styles.cardText}>
              O nosso serviço é flexível e ágil. Fornecemos ferramentas adequadas às necessidades de cada cliente, garantindo um serviço de nível superior. A NorteCargo, NTC, assume o compromisso de estar sempre um passo à frente.
            </p>
          </div>

          <div style={styles.timelineCard}>
            <span style={styles.timelineBadge}>Equipa</span>
            <h3 style={styles.cardTitle}>A Nossa Força em Rede</h3>
            <p style={styles.cardText}>
              Cada um dos nossos colaboradores está totalmente qualificado e certificado. Temos equipas especializadas para todo o país, capazes de garantir a rapidez, a pontualidade e a excelência em qualquer ponto de Portugal.
            </p>
          </div>
        </div>
      </section>

      {/* SECÇÃO DE SERVIÇOS */}
      <section id="servicos" style={{ ...styles.section, backgroundColor: '#f8fafc', padding: '60px 20px', borderRadius: '16px' }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Serviços Especializados</h2>
          <p style={styles.sectionSubtitle}>Oferecemos soluções à medida das suas necessidades de transporte</p>
          
          <div style={{ marginTop: '20px' }}>
            <a href="/servicos" style={styles.btnMainSaberMais}>
              Saber Mais sobre os Serviços
            </a>
          </div>
        </div>

        <div style={styles.grid3}>
          {/* CARTÃO 1: MUDANÇAS PARTICULARES */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>🏠</div>
            <h3 style={styles.cardTitle}>Mudanças Particulares</h3>
            <p style={styles.cardText}>
              Estabelecemos parcerias e asseguramos a transição do seu lar com total segurança e rigor. Garantimos uma mudança sem stress.
            </p>
            <button 
              onClick={() => setShowResidenciaisModal(true)} 
              style={styles.btnSaberMaisButton}
            >
              Saber Mais
            </button>
          </div>

          {/* CARTÃO 2: MUDANÇAS DE EMPRESAS */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>🏢</div>
            <h3 style={styles.cardTitle}>Mudanças de Empresas</h3>
            <p style={styles.cardText}>
              Serviços de transporte e relocalização para escritórios e estabelecimentos comerciais com o mínimo de impacto no seu negócio.
            </p>
            <button 
              onClick={() => setShowEmpresasModal(true)} 
              style={styles.btnSaberMaisButton}
            >
              Saber Mais
            </button>
          </div>

          {/* CARTÃO 3: GRUPAGEM DE CARGA */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>📦</div>
            <h3 style={styles.cardTitle}>Grupagem de Carga</h3>
            <p style={styles.cardText}>
              Otimize custos logísticos através da partilha segura de espaço de transporte, garantindo o envio pontual e seguro das suas mercadorias.
            </p>
            <a href="/grupagem" style={styles.btnSaberMais}>Saber Mais</a>
          </div>
        </div>
      </section>

      {/* BLOCO ABAIXO: Quadro de Rotas em Tabela */}
      <section style={styles.section}>
        <div style={styles.routeCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '26px' }}>📍</span>
            <h3 style={{ fontSize: '24px', color: '#0f172a', margin: 0 }}>Próxima Rota e Expedições Regulares</h3>
          </div>
          <p style={{ color: '#475569', fontSize: '17px', marginBottom: '24px', lineHeight: '1.5' }}>
            Consulte o planeamento das nossas próximas viagens logísticas para garantir o envio célere e programado da sua carga.
          </p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Sai de</th>
                  <th style={styles.th}>Para onde</th>
                  <th style={styles.th}>Data</th>
                  <th style={styles.th}>Estimativa de Entrega</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Bragança / Porto</td>
                  <td style={styles.td}>Lisboa / Algarve</td>
                  <td style={styles.td}>28/08/2026</td>
                  <td style={styles.td}>29/08/2026</td>
                </tr>
                <tr>
                  <td style={styles.td}>Lisboa</td>
                  <td style={styles.td}>Porto / Bragança</td>
                  <td style={styles.td}>30/08/2026</td>
                  <td style={styles.td}>31/08/2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* POP-UP FLUTUANTE (MODAL) DE MUDANÇAS PARTICULARES */}
      {showResidenciaisModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setShowResidenciaisModal(false)} 
              style={styles.closeButton}
            >
              &times;
            </button>
            
            <h2 style={{ color: '#0f172a', marginTop: 0, fontSize: '28px' }}>
              O Seu Lar Protegido de Ponta a Ponta
            </h2>
            
            <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px' }}>
              Mudar de casa é o início de um novo ciclo emocionante na sua vida, mas sabemos que também pode trazer preocupações associadas à segurança dos seus bens mais preciosos. Na <strong>NorteCargo</strong>, tratamos de cada mudança residencial com o máximo rigor, cuidado e profissionalismo, garantindo que todo o seu património familiar chega à nova morada exatamente nas mesmas condições em que estava.
            </p>

            <h4 style={{ color: '#0f2b5c', fontSize: '20px', marginBottom: '8px', marginTop: '22px' }}>
              🛡️ Uso de Materiais de Proteção Avançados
            </h4>
            <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px', marginTop: 0 }}>
              Não deixamos nada ao acaso. Utilizamos materiais de embalamento de alta qualidade para garantir a máxima absorção de impactos e proteção contra riscos, humidade ou poeiras:
            </p>
            <ul style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px', paddingLeft: '20px', marginTop: '5px' }}>
              <li><strong>Plástico bolha de alta densidade</strong> para revestimento de loiças, louças, eletrodomésticos e peças de decoração frágeis.</li>
              <li><strong>Mantas de proteção acolchoadas</strong> exclusivas para salvaguardar sofás, colchões, cómodas e todo o mobiliário de madeira contra choques durante o transporte.</li>
              <li><strong>Papel kraft e cartão canelado</strong> reforçado para o acondicionamento seguro de louças, livros e objetos de menor dimensão.</li>
              <li><strong>Filme extensible (stretch film)</strong> para fixação de portas de armários, gavetas e proteção geral contra intempéries.</li>
            </ul>

            <h4 style={{ color: '#0f2b5c', fontSize: '20px', marginBottom: '8px', marginTop: '22px' }}>
              📦 Caixas Específicas e Organização Rigorosa
            </h4>
            <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px', marginTop: 0 }}>
              Disponibilizamos caixas de cartão de várias dimensões e gramagens, incluindo caixas roupeiro (com varão para transporte de roupa pendurada sem amassar), caixas especiais para livros e arquivos, e caixas reforçadas para loiças. Toda a nossa equipa procede à identificação cuidada de cada volume, facilitando a posterior arrumação em cada divisão da sua nova casa.
            </p>

            <div style={{ textAlign: 'right', marginTop: '28px' }}>
              <a href="/agendamento" style={styles.btnModalPrimary}>
                Agendar Mudança Residencial
              </a>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP FLUTUANTE (MODAL) DE MUDANÇAS DE EMPRESAS */}
      {showEmpresasModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setShowEmpresasModal(false)} 
              style={styles.closeButton}
            >
              &times;
            </button>
            
            <h2 style={{ color: '#0f172a', marginTop: 0, fontSize: '28px' }}>
              O Crescimento Do Seu Negócio Faz-se em Parceria
            </h2>
            
            <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px' }}>
              Na <strong>NorteCargo</strong>, acreditamos que uma mudança de instalações ou a relocalização de um escritório não é apenas um mero processo logístico de transporte de caixas e mobiliário. É, antes de mais, um momento fulcral de viragem, renovação e expansão para qualquer organização. Sabemos que por trás de cada secretária, de cada computador e de cada dossier arquivado está o suor, a visão e a ambição de empresários que acreditam no futuro do seu próprio negócio. É precisamente por partilhar dessa mesma garra e dessa cultura de superação que nos posicionamos muito para além de uma simples prestadoras de serviços: queremos ser o parceiro estratégico em quem confia de olhos fechados para acompanhar o crescimento da sua empresa.
            </p>

            <h4 style={{ color: '#0f2b5c', fontSize: '20px', marginBottom: '8px', marginTop: '22px' }}>
              ⚡ Eficiência e Continuidade do Negócio
            </h4>
            <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px', marginTop: 0 }}>
              No ecossistema empresarial moderno, cada hora de inatividade representa um custo operacional indesejado. É por essa razão exata que a NorteCargo assume um compromisso inabalável com a eficácia, a pontualidade e o rigor absoluto. A nossa missão passa por absorver todo o peso e o stress associado à logística de transição, permitindo que os gestores, administradores e colaboradores mantenham o foco total naquilo que realmente importa: a atividade comercial e a produtividade diária.
            </p>

            <h4 style={{ color: '#0f2b5c', fontSize: '20px', marginBottom: '8px', marginTop: '22px' }}>
              🤝 Parcerias de Longo Prazo
            </h4>
            <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '17px', marginTop: 0 }}>
              Acreditamos profundamente que os melhores negócios nascem da confiança mútua e da construção de parcerias duradouras. Apostar no crescimento de uma empresa parceira significa garantir que, sempre que precisar de redimensionar a sua operação, deslocalizar ativos valiosos ou responder a novos desafios de mercado, terá do seu lado uma equipa altamente qualificada e pronta a dar resposta imediata. Desenvolvemos soluções à medida para escritórios e espaços corporativos, assegurando um planeamento milimétrico que acautela a proteção integral de equipamentos informáticos sensíveis, mobiliário técnico e documentação confidencial.
            </p>

            <div style={{ textAlign: 'right', marginTop: '28px' }}>
              <a href="/agendamento" style={styles.btnModalPrimary}>
                Solicitar Orçamento Empresarial
              </a>
            </div>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a 
        href="https://wa.me/351965531009?text=Olá,%20gostaria%20de%20pedir%20um%20orçamento%20para%20uma%20mudança." 
        target="_blank" 
        rel="noopener noreferrer" 
        style={styles.whatsappFloat}
        title="Fale connosco no WhatsApp"
      >
        💬 WhatsApp
      </a>

      {/* FOOTER */}
      <footer id="contactos" style={styles.footer}>
        <div style={styles.footerContainer}>
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>NORTECARGO</h3>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>
              Especialistas em serviços de mudanças e transportes com total segurança e profissionalismo.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: '#f8fafc', fontSize: '18px' }}>Contactos Directos</h4>
            <p style={{ color: '#94a3b8', fontSize: '16px', margin: '6px 0' }}>📞 965 531 009</p>
            <p style={{ color: '#94a3b8', fontSize: '16px', margin: '6px 0' }}>✉️ Geral@nortecargo.pt</p>
            <p style={{ margin: '12px 0 0 0' }}>
              <a href="/contactos" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Ver página de contactos &rarr;</a>
            </p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          © {new Date().getFullYear()} NorteCargo. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

// Estilos com tamanhos de letra ampliados
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
    fontSize: '15px',
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
    padding: '14px 20px',
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
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '-0.5px',
  },
  logoTextCargo: {
    color: '#16a34a',
    fontSize: '32px',
    fontWeight: '900',
    marginLeft: '3px',
    letterSpacing: '-0.5px',
  },
  logoSubtext: {
    color: '#475569',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    marginTop: '2px',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
  },
  link: {
    color: '#334155',
    textDecoration: 'none',
    fontSize: '17px',
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
    padding: '110px 20px',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: '460px',
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
    maxWidth: '850px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 800,
    margin: '0 0 20px 0',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '20px',
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
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '17px',
  },
  btnSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '17px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '32px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
  },
  welcomeSection: {
    backgroundColor: '#f8fafc',
    padding: '60px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #e2e8f0',
  },
  welcomeBadge: {
    display: 'inline-block',
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '16px',
  },
  section: {
    maxWidth: '1200px',
    margin: '70px auto',
    padding: '0 20px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '36px',
    color: '#0f172a',
    margin: '0 0 12px 0',
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: '18px',
  },
  btnMainSaberMais: {
    backgroundColor: '#0f2b5c',
    color: '#ffffff',
    padding: '12px 26px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  timelineContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  timelineCard: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  timelineBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0f2b5c',
    fontSize: '13px',
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '36px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '22px',
    color: '#0f172a',
    margin: '12px 0',
  },
  cardText: {
    color: '#475569',
    fontSize: '17px',
    lineHeight: '1.6',
    margin: '0 0 22px 0',
  },
  btnSaberMais: {
    backgroundColor: '#0f2b5c',
    color: '#ffffff',
    padding: '12px 22px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center' as const,
  },
  btnSaberMaisButton: {
    backgroundColor: '#0f2b5c',
    color: '#ffffff',
    padding: '12px 22px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
  routeCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '35px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left' as const,
    fontSize: '16px',
  },
  th: {
    backgroundColor: '#f1f5f9',
    color: '#0f2b5c',
    padding: '14px 12px',
    borderBottom: '2px solid #cbd5e1',
    fontWeight: 700,
  },
  td: {
    padding: '14px 12px',
    borderBottom: '1px solid #e2e8f0',
    color: '#334155',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '45px',
    borderRadius: '16px',
    maxWidth: '780px',
    width: '100%',
    maxHeight: '85vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#64748b',
    lineHeight: '1',
  },
  btnModalPrimary: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    padding: '14px 26px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'inline-block',
  },
  whatsappFloat: {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    backgroundColor: '#25d366',
    color: '#ffffff',
    padding: '14px 22px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '17px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  footer: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '50px 20px 25px 20px',
    marginTop: '70px',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    paddingBottom: '30px',
    borderBottom: '1px solid #1e293b',
  },
  footerBottom: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '15px',
    paddingTop: '20px',
  },
};