'use client';

import React, { useState, useEffect } from 'react';

// Imagens exclusivas para a página de Grupagem (Armazém, Cargas e Distribuição)
const SLIDES_1 = [
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80', // Armazém moderno com prateleiras
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80', // Cais de carga
];

const SLIDES_2 = [
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', // Caixas empacotadas
  'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80', // Logística / Paletes
];

const SLIDES_3 = [
  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80', // Operário / Gestão de armazém
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80', // Envio de mercadorias
];

// Banner da Carrinha NorteCargo
const BANNER_CARRINHA = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80';

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

// Navbar Superior com "Grupagem" incluído no Menu
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
          <a href="/historia" style={navStyles.link}>História</a>
          <a href="/grupagem" style={{ ...navStyles.link, ...navStyles.activeLink }}>Grupagem</a>
          <a href="/#agendamento" style={navStyles.link}>Agendamento</a>
          <a href="/#servicos" style={navStyles.link}>Serviços</a>
          <a href="#contactos" style={navStyles.link}>Contactos</a>
        </nav>
      </div>
    </header>
  );
}

export default function GrupagemPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    contacto: '',
    moradaCarga: '',
    moradaDescarga: '',
    diaPreferencial: '',
    servico: 'Grupagem de Carga',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pedido de orçamento enviado com sucesso!');
  };

  return (
    <div>
      <Navbar />

      {/* HERO BANNER DA CARRINHA */}
      <section
        style={{
          ...styles.heroBanner,
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.4)), url(${BANNER_CARRINHA})`,
        }}
      >
        <div style={styles.heroOverlayContent}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f2b5c' }}>
            NorteCargo
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>
            Mudanças & Transportes
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px' }}>
            Orçamentos: 965 531 009
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Nacional e Internacional</div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL DE GRUPAGEM DE CARGA */}
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h1 style={styles.mainTitle}>Soluções de Grupagem de Carga</h1>
          <h3 style={styles.mainSubtitle}>Conectando o País de Norte a Sul</h3>
        </div>

        {/* PARÁGRAFO INTRODUTÓRIO */}
        <div style={styles.introParagraphContainer}>
          <p style={styles.paragraph}>
            Na <strong>NorteCargo</strong>, compreendemos que a eficiência logística é o motor que impulsiona o sucesso dos negócios modernos. A nossa especialização em <strong>grupagem de carga</strong> oferece às empresas e particulares a flexibilidade necessária para transportar mercadorias de forma económica e segura, sem a necessidade de alugar um veículo completo.
          </p>
        </div>

        {/* BLOCO 1: Quadro "Próxima Rota" à Esquerda | Slider à Direita */}
        <div style={styles.row}>
          <div style={styles.textCol}>
            <div style={styles.routeCard}>
              <h3 style={styles.routeCardTitle}>📍 Próxima Rota</h3>
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
          <div style={styles.mediaCol}>
            <MiniSlider images={SLIDES_1} />
          </div>
        </div>

        {/* BLOCO 2: Slider Esquerda | Texto Direita (Rota Estratégica) */}
        <div style={{ ...styles.row, ...styles.rowReverse }}>
          <div style={styles.textCol}>
            <h2 style={styles.blockTitle}>A Nossa Rota Estratégica:</h2>
            <p style={styles.highlightRoute}>Bragança - Porto - Lisboa - Algarve</p>
            <p style={styles.paragraph}>
              Operamos uma malha logística robusta que conecta os principais pontos estratégicos de Portugal. A nossa rota principal, que liga o interior transmontano (Bragança) aos centros urbanos do litoral (Porto e Lisboa) e ao extremo sul (Algarve), é desenhada para garantir celeridade e fiabilidade.
            </p>
          </div>
          <div style={styles.mediaCol}>
            <MiniSlider images={SLIDES_2} />
          </div>
        </div>

        {/* BLOCO 3: Texto Esquerda | Slider Direita (Monitorização, Suporte e Adaptabilidade) */}
        <div style={styles.row}>
          <div style={styles.textCol}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={styles.subHeading}>Monitorização Constante:</h4>
              <p style={styles.paragraph}>As mercadorias são geridas e armazenadas de forma segura até chegarem ao seu destino final.</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={styles.subHeading}>Suporte Comercial Diário:</h4>
              <p style={styles.paragraph}>A nossa equipa está disponível todos os dias para dar resposta às tuas questões, fornecer estados de carga e garantir que a tua operação decorre sem sobressaltos.</p>
            </div>
            <div>
              <h4 style={styles.subHeading}>Adaptabilidade:</h4>
              <p style={styles.paragraph}>Soluções personalizadas, quer sejas uma grande empresa ou um cliente particular que precisa de enviar um volume pontual.</p>
            </div>
          </div>
          <div style={styles.mediaCol}>
            <MiniSlider images={SLIDES_3} />
          </div>
        </div>

        {/* FORMULÁRIO DE PEDIDO DE ORÇAMENTO */}
        <div id="agendamento" style={styles.formContainer}>
          <h2 style={styles.formTitle}>Solicite o seu Orçamento / Agendamento</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGridTriple}>
              <div>
                <label style={styles.label}>Nome *</label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Contacto *</label>
                <input
                  type="text"
                  name="contacto"
                  required
                  value={formData.contacto}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGridTriple}>
              <div>
                <label style={styles.label}>Morada de Carga (Completa com CP)</label>
                <input
                  type="text"
                  name="moradaCarga"
                  value={formData.moradaCarga}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Morada de Descarga (Completa com CP)</label>
                <input
                  type="text"
                  name="moradaDescarga"
                  value={formData.moradaDescarga}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Dia Preferencial</label>
                <input
                  type="date"
                  name="diaPreferencial"
                  value={formData.diaPreferencial}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGridDouble}>
              <div>
                <label style={styles.label}>Selecione o Serviço Pretendido:</label>
                <select
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Grupagem de Carga">Grupagem de Carga</option>
                  <option value="Mudanças Particulares">Mudanças Particulares</option>
                  <option value="Escritórios e Empresas">Escritórios e Empresas</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>Descrição da Mudança / Carga</label>
                <textarea
                  rows={3}
                  placeholder="Detalhes da Mudança/Carga (ex: número de caixas, móveis ou tipo de mercadoria)..."
                  style={styles.textarea}
                />
              </div>
            </div>

            <button type="submit" style={styles.submitBtn}>
              Enviar Pedido
            </button>
          </form>
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
    height: '380px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlayContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '24px 36px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  container: {
    maxWidth: '1100px',
    margin: '40px auto',
    padding: '0 20px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  mainTitle: {
    fontSize: '32px',
    color: '#0f2b5c',
    margin: '0 0 8px 0',
  },
  mainSubtitle: {
    fontSize: '20px',
    color: '#16a34a',
    fontWeight: 600,
    margin: 0,
  },
  introParagraphContainer: {
    maxWidth: '850px',
    margin: '0 auto 40px auto',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap',
    marginBottom: '50px',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  textCol: {
    flex: '1 1 500px',
  },
  mediaCol: {
    flex: '0 0 320px',
    display: 'flex',
    justifyContent: 'center',
  },
  routeCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  routeCardTitle: {
    fontSize: '18px',
    color: '#0f2b5c',
    marginTop: 0,
    marginBottom: '12px',
    fontWeight: 700,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13px',
  },
  th: {
    backgroundColor: '#f1f5f9',
    color: '#0f2b5c',
    padding: '10px 8px',
    borderBottom: '2px solid #cbd5e1',
    fontWeight: 700,
  },
  td: {
    padding: '10px 8px',
    borderBottom: '1px solid #e2e8f0',
    color: '#334155',
  },
  blockTitle: {
    fontSize: '22px',
    color: '#0f2b5c',
    marginBottom: '8px',
  },
  highlightRoute: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#16a34a',
    marginBottom: '12px',
  },
  subHeading: {
    fontSize: '17px',
    color: '#0f2b5c',
    marginBottom: '4px',
  },
  paragraph: {
    fontSize: '16px',
    color: '#334155',
    lineHeight: '1.8',
    margin: 0,
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
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '36px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
    marginTop: '60px',
  },
  formTitle: {
    fontSize: '22px',
    color: '#0f2b5c',
    marginTop: 0,
    marginBottom: '24px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGridTriple: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  formGridDouble: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  submitBtn: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: '10px',
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