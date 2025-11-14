import { useEffect, useRef, useState } from "react"
import "./About.css"
import camilly from "../../assets/camilly.jpg"
import ana from "../../assets/ana.jpg"
import tania from "../../assets/tania.jpg"
import karen from "../../assets/karen.jpg"
import banner from "../../assets/sobre.jpg"
import sobre from "../../assets/sobre_pessoa.png"



export default function About() {
  const [visibleItems, setVisibleItems] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const observers = []

    itemRefs.current.forEach((item, index) => {
      if (!item) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.3 },
      )

      observer.observe(item)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineHeight = rect.height

      const scrolled = Math.max(0, windowHeight - rect.top)
      const progress = Math.min(100, (scrolled / timelineHeight) * 100)

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const timelineData = [
    {
      date: "Junho 2022",
      title: "Fundação do Echo Music",
      description: "Lançamento oficial da plataforma e os primeiros usuários começam a compartilhar suas músicas favoritas.",
      icon: "🎵",
      detail: "Começamos com apenas 100 usuários beta testadores apaixonados por música.",
    },
    {
      date: "Julho 2023",
      title: "Expansão Internacional",
      description: "Echo Music alcança 50 países e ultrapassa a marca de 1 milhão de usuários ativos mensalmente.",
      icon: "🌍",
      detail: "Traduzimos a plataforma para 12 idiomas e expandimos para 3 continentes.",
    },
    {
      date: "Maio 2024",
      title: "Salas ao Vivo Lançadas",
      description: "Introdução das Salas ao Vivo, permitindo que usuários ouçam música juntos em tempo real.",
      icon: "🎧",
      detail: "Mais de 10.000 salas criadas na primeira semana de lançamento.",
    },
    {
      date: "Novembro 2024",
      title: "2 Milhões de Usuários",
      description: "Celebramos 2 milhões de usuários ativos e o lançamento de comunidades temáticas.",
      icon: "🎉",
      detail: "Criamos 500+ comunidades temáticas de diferentes gêneros musicais.",
    },
    {
      date: "Junho 2025",
      title: "Lançamento Global",
      description: "Expansão oficial para todos os continentes e parcerias com grandes gravadoras e artistas independentes.",
      icon: "🚀",
      detail: "Parcerias com mais de 100 gravadoras e 5.000 artistas independentes.",
    },
  ]

  const teamMembers = [
    { name: "Ana Vitória", role: "Backend", icon: "♪", image: ana },
    { name: "Karen Carvalho", role: "Banco de Dados", icon: "♪", image: karen },
    { name: "Tânia Isabelle", role: "Frontend", icon: "♪", image: tania },
    { name: "Camilly Ferreira", role: "Frontend", icon: "♥", image: camilly },
  ]

  const testimonials = [
    { 
      name: "Pedro Almeida", 
      role: "Usuário desde 2022", 
      text: "O Echo Music mudou minha forma de ouvir música. Conheci pessoas incríveis que compartilham os mesmos gostos musicais.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    },
    { 
      name: "Ana Costa", 
      role: "Artista Independente", 
      text: "Como artista independente, o Echo Music me deu uma plataforma para alcançar fãs reais que realmente se importam.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    { 
      name: "Lucas Oliveira", 
      role: "DJ & Produtor", 
      text: "As Salas ao Vivo são revolucionárias! Consigo fazer sets ao vivo e interagir com minha audiência em tempo real.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
    },
  ]

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Nossa História</h1>
          <p className="hero-subtitle">
            Criada para conectar a música com as pessoas, partindo de uma experiência social diferente que conecta pessoas ao redor do mundo.
          </p>
        </div>
      </section>

      {/* A Música Como Linguagem */}
      <section className="musica-section">
        <div className="musica-text">
          <h2>A Música Como Linguagem Universal</h2>
          <p>
            Em 2019, um grupo de apaixonados por música percebeu o vazio que existia entre as plataformas de streaming e a experiência social de descobrir novas músicas.
          </p>
          <p>
            Nasceu então o Echo Music, com a visão de transformar a forma como as pessoas se conectam através da música, criando uma comunidade global unida pelo amor aos sons.
          </p>
          <p>
            Não queríamos criar mais uma plataforma de streaming. Queríamos criar um espaço onde a música fosse a linguagem universal que conecta pessoas de todos os cantos do mundo.
          </p>
        </div>
        <div className="musica-visual">
          <div className="visual-card">
            <img src={sobre} alt="A Música Como Linguagem" className="visual-image" />
          </div>
        </div>
      </section>

      {/* Nossa Jornada - Timeline */}
      <section className="jornada-section">
        <div className="jornada-header">
          <h2>Nossa Jornada</h2>
          <p>Marcos importantes na evolução do Echo Music e a construção de nossa comunidade global.</p>
        </div>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line">
            <div className="timeline-line-progress" style={{ height: `${scrollProgress}%` }}></div>
          </div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${visibleItems.includes(index) ? "visible" : ""} ${activeItem === index ? "active" : ""}`}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-content">
                <div className="timeline-shine"></div>
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
                <div className="timeline-detail">
                  <div className="timeline-detail-divider"></div>
                  <p className="timeline-detail-text">{item.detail}</p>
                </div>
              </div>

              <div className="timeline-dot">
                <div className="timeline-dot-inner"></div>
                <div className="timeline-dot-ripple"></div>
                <div className="timeline-dot-ripple" style={{ animationDelay: "0.5s" }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conheça Nossa Equipe */}
      <section className="team-section">
        <div className="section-header">
          <h2>Conheça Nossa Equipe</h2>
          <p>Apaixonados por música que trabalham todos os dias para criar a melhor experiência para você.</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-avatar-container">
                <div className="team-avatar">
                  <img src={member.image} alt={member.name} className="team-avatar-image" />
                </div>
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* Nossa Missão */}
      <section className="mission-section">
        <div className="section-header">
          <h2>Nossa Missão e Valores</h2>
          <p>Transformar a forma como as pessoas se conectam através da música,  criando uma comunidade global unida pelo amor aos sons.</p>
        </div>
        
        <div className="mission-text-content">
          <p>
            Acreditamos que a música é a linguagem universal que transcende fronteiras, culturas e diferenças. Nossa missão é criar um espaço onde todos possam descobrir, compartilhar e celebrar a música juntos.
          </p>
        </div>

        <br></br>
      <br></br>
      <br></br>
      <br></br>

        <div className="values-grid">
          {[
            { title: "Diversidade", icon: "👥", description: "Celebramos todas as formas de expressão musical e cultural." },
            { title: "Criatividade", icon: "✨", description: "Incentivamos a descoberta e experimentação musical." },
            { title: "Autenticidade", icon: "♥", description: "Valorizamos conexões genuínas e experiências reais." },
            { title: "Inovação", icon: "🎯", description: "Buscamos constantemente novas formas de melhorar." },
          ].map((value, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <br></br>
      <br></br>

      {/* O Efeito Echo */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>O Efeito Echo</h2>
          <p>Onde vidas são transformadas através da música. Descubra histórias reais de nossa comunidade.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-avatar">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar-image" />
              </div>
              <h4 className="testimonial-name">{testimonial.name}</h4>
              <p className="testimonial-role">{testimonial.role}</p>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <div className="stats-grid">
          {[
            { number: "2.3M+", label: "Usuários Ativos" },
            { number: "150K+", label: "Músicas Disponíveis" },
            { number: "50M+", label: "Streams Mensais" },
            { number: "25K+", label: "Artistas Ativos" },
          ].map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Faça Parte da Revolução Musical</h2>
        <p>Junte-se a milhões de pessoas que já descobriram uma nova forma de viver a música.</p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Criar Agora</button>
          <button className="btn btn-secondary">Explorar Comunidades</button>
        </div>
      </section>
    </div>
  )
}

