"use client"

import { useEffect, useRef, useState } from "react"
import "./About.css"
import sobre from "../../assets/sobre_pessoa.png"
import mariana from "../../assets/usario_mariana.png"
import carlos from "../../assets/usuario_carlos.jpeg"
import ana from "../../assets/usuario_ana_vitoria.png"
import sobre2 from "../../assets/sobre.jpg"

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

      // Calculate how much of the timeline is visible
      const scrolled = Math.max(0, windowHeight - rect.top)
      const progress = Math.min(100, (scrolled / timelineHeight) * 100)

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="about-container">
      {/* Nossa História */}
      <section className="nossa-historia">
        <h1>Nossa História</h1>
        <p>
          Criada para conectar a música com as pessoas, partindo de uma experiência social diferente que conecta pessoas
          ao redor do mundo.
        </p>
      </section>

      {/* A Música Como Linguagem */}
      <section className="musica-linguagem">
        <div className="musica-linguagem-text">
          <h2>A Música Como Linguagem</h2>
          <p>
            Em 2019, um grupo de apaixonados por música percebeu o vazio que existia entre as plataformas de streaming e
            a experiência social de descobrir novas músicas.
          </p>
          <p>
            Nasceu então o Echo Music, com a visão de transformar a forma como as pessoas se conectam através da música,
            criando uma comunidade global unida pelo amor aos sons.
          </p>
          <p>
            Não queríamos criar mais uma plataforma de streaming. Queríamos criar um espaço onde a música fosse a
            linguagem universal que conecta pessoas de todos os cantos do mundo.
          </p>
        </div>
        <div className="musica-linguagem-image">
          <div className="image-placeholder">
          <img src={sobre} alt="sobre1" />
            
            
          </div>
          <div className="play-overlay">
            <span>▶</span>
          </div>
        </div>
      </section>

      {/* Nossa Jornada - Enhanced with more interactivity */}
      <section className="nossa-jornada">
        <h2>Nossa Jornada</h2>
        <p>Marcos importantes na evolução do Echo Music e a construção de nossa comunidade global.</p>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line">
            <div className="timeline-line-progress" style={{ height: `${scrollProgress}%` }}></div>
          </div>

          {[
            {
              date: "Junho 2022",
              title: "Fundação do Echo Music",
              description:
                "Lançamento oficial da plataforma e os primeiros usuários começam a compartilhar suas músicas favoritas.",
              icon: "🎵",
              detail: "Começamos com apenas 100 usuários beta testadores apaixonados por música.",
            },
            {
              date: "Julho 2023",
              title: "Expansão Internacional",
              description:
                "Echo Music alcança 50 países e ultrapassa a marca de 1 milhão de usuários ativos mensalmente.",
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
              description:
                "Expansão oficial para todos os continentes e parcerias com grandes gravadoras e artistas independentes.",
              icon: "🚀",
              detail: "Parcerias com mais de 100 gravadoras e 5.000 artistas independentes.",
            },
          ].map((item, index) => (
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
      <section className="nossa-equipe">
        <h2>Conheça Nossa Equipe</h2>
        <p>Apaixonados por música que trabalham todos os dias para criar a melhor experiência para você.</p>

        <div className="team-grid">
          <div className="team-member">
            <div className="team-avatar">
              <div className="avatar-placeholder">
              <img src={mariana} alt="mariana" />
              </div>
            </div>
            <div className="team-icon">
              <span>♪</span>
            </div>
            <h3 className="team-name">Marina Santos</h3>
            <p className="team-role">CEO & Co-fundadora</p>
            <p className="team-description">
              Ex-executiva da indústria musical, combinou sua paixão por tecnologia e música para criar o Echo Music.
            </p>
            
          </div>

          <div className="team-member">
            <div className="team-avatar">
              <div className="avatar-placeholder">
              <img src={carlos} alt="Ana" />
              </div>
            </div>
            <div className="team-icon">
              <span>✨</span>
            </div>
            <h3 className="team-name">Carlos Oliveira</h3>
            <p className="team-role">CTO</p>
            <p className="team-description">
              Engenheiro de software com 15 anos de experiência, lidera o desenvolvimento da plataforma com foco em
              inovação.
            </p>
            
          </div>

          <div className="team-member">
            <div className="team-avatar">
              <div className="avatar-placeholder">
              <img src={ana} alt="Ana" />
              </div>
            </div>
            <div className="team-icon">
              <span>♥</span>
            </div>
            <h3 className="team-name">Ana Costa</h3>
            <p className="team-role">Head of Design</p>
            <p className="team-description">
              Designer premiada que transforma a experiência do usuário em algo mágico e intuitivo através do design.
            </p>
            
          </div>
        </div>
      </section>

      {/* Nossa Missão e Valores */}
      <section className="missao-valores">
        <div className="missao-header">
          <div className="missao-text">
            <h2>Nossa Missão e Valores</h2>
            <p>
              Transformar a forma como as pessoas se conectam através da música, criando uma comunidade global unida
              pelo amor aos sons.
            </p>
            <p>
              Acreditamos que a música é a linguagem universal que transcende fronteiras, culturas e diferenças. Nossa
              missão é criar um espaço onde todos possam descobrir, compartilhar e celebrar a música juntos.
            </p>
          </div>
          <div className="missao-image">
            <div className="image-placeholder">
            <img src={sobre2} alt="Ana" />
              
              
            </div>
          </div>
        </div>

        <div className="valores-grid">
          <div className="valor-card">
            <div className="valor-icon">
              <span>👥</span>
            </div>
            <h3 className="valor-title">Diversidade</h3>
            <p className="valor-description">
              Celebramos todas as formas de expressão musical e cultural, criando um espaço inclusivo para todos.
            </p>
          </div>

          <div className="valor-card">
            <div className="valor-icon">
              <span>✨</span>
            </div>
            <h3 className="valor-title">Criatividade</h3>
            <p className="valor-description">
              Incentivamos a descoberta e a experimentação musical, conectando pessoas através de gostos únicos.
            </p>
          </div>

          <div className="valor-card">
            <div className="valor-icon">
              <span>♥</span>
            </div>
            <h3 className="valor-title">Autenticidade</h3>
            <p className="valor-description">
              Valorizamos conexões genuínas e experiências reais, sem algoritmos que ditam o que você deve ouvir.
            </p>
          </div>

          <div className="valor-card">
            <div className="valor-icon">
              <span>🎯</span>
            </div>
            <h3 className="valor-title">Inovação</h3>
            <p className="valor-description">
              Buscamos constantemente novas formas de melhorar a experiência musical e social dos nossos usuários.
            </p>
          </div>
        </div>
      </section>

      {/* O Efeito Echo */}
      <section className="efeito-echo">
        <h2>O Efeito Echo</h2>
        <p>Onde vidas são transformadas através da música. Descubra histórias reais de nossa comunidade.</p>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">PA</div>
              <div className="testimonial-info">
                <h4>Pedro Almeida</h4>
                <p>Usuário desde 2022</p>
              </div>
            </div>
            <p className="testimonial-text">
              "O Echo Music mudou minha forma de ouvir música. Conheci pessoas incríveis que compartilham os mesmos
              gostos musicais e descobri artistas que nunca teria encontrado sozinho."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">AC</div>
              <div className="testimonial-info">
                <h4>Ana Costa</h4>
                <p>Artista Independente</p>
              </div>
            </div>
            <p className="testimonial-text">
              "Como artista independente, o Echo Music me deu uma plataforma para alcançar fãs reais que realmente se
              importam com minha música. A comunidade aqui é incrível!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">LO</div>
              <div className="testimonial-info">
                <h4>Lucas Oliveira</h4>
                <p>DJ & Produtor</p>
              </div>
            </div>
            <p className="testimonial-text">
              "As Salas ao Vivo são revolucionárias! Consigo fazer sets ao vivo e interagir com minha audiência em tempo
              real. É como estar em um clube, mas global."
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">2.3M+</div>
            <div className="stat-label">Usuários Ativos</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">150K+</div>
            <div className="stat-label">Músicas Disponíveis</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">50M+</div>
            <div className="stat-label">Streams Mensais</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">25K+</div>
            <div className="stat-label">Artistas Ativos</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Faça Parte da Revolução Musical</h2>
        <p>
          Junte-se a milhões de pessoas que já descobriram uma nova forma de viver a música. Crie sua conta e comece a
          explorar agora mesmo.
        </p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Criar Agora</button>
          <button className="btn btn-outline">Explorar Comunidades</button>
        </div>
      </section>
    </div>
  )
}
