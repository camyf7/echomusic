import React, { useRef, useState, useEffect } from "react";
import './About.css';

// Imagens (substitua pelos imports corretos)
import usuarioMarina from '../../assets/usario_karen.png';
import sobrePessoa from '../../assets/sobre_pessoa.png';
import sobre from '../../assets/sobre.jpg';
import mariana from '../../assets/usario_mariana.png';
import ana from '../../assets/usuario_ana_vitoria.png';
import isa from '../../assets/usario_isabelle.png';

export default function About() {
    const timelineRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeItem, setActiveItem] = useState(null);
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    // Atualiza scrollProgress
    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const element = timelineRef.current;
            const totalHeight = element.scrollHeight - element.clientHeight;
            const scroll = (element.scrollTop / totalHeight) * 100;
            setScrollProgress(scroll);
        };

        const timelineEl = timelineRef.current;
        if (timelineEl) timelineEl.addEventListener("scroll", handleScroll);
        return () => {
            if (timelineEl) timelineEl.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Observa visibilidade dos itens
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const index = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => [...new Set([...prev, index])]);
                    }
                });
            },
            { threshold: 0.3 }
        );

        itemRefs.current.forEach((el, idx) => {
            if (el) {
                el.dataset.index = idx;
                observer.observe(el);
            }
        });

        return () => {
            itemRefs.current.forEach(el => el && observer.unobserve(el));
        };
    }, []);

    const timelineItems = [
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
    ];

    return (
        <div className="about-container">

            {/* Nossa História */}
            <section className="nossa-historia">
                <h1>Nossa História</h1>
                <p>
                    Criada para conectar a música com as pessoas, partindo de uma experiência social diferente que conecta pessoas ao redor do mundo.
                </p>
            </section>

            {/* Timeline */}
            <section className="nossa-jornada">
                <h2>Nossa Jornada</h2>
                <p>Marcos importantes na evolução do Echo Music e a construção de nossa comunidade global.</p>

                <div className="timeline" ref={timelineRef}>
                    <div className="timeline-line">
                        <div className="timeline-line-progress" style={{ height: `${scrollProgress}%` }}></div>
                    </div>

                    {timelineItems.map((item, index) => (
                        <div
                            key={index}
                            ref={el => (itemRefs.current[index] = el)}
                            className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${visibleItems.includes(index) ? "visible" : ""} ${activeItem === index ? "active" : ""}`}
                            onMouseEnter={() => setActiveItem(index)}
                            onMouseLeave={() => setActiveItem(null)}
                        >
                            <div className="timeline-content">
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
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Estatísticas */}
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

            {/* CTA */}
            <section className="cta-section">
                <h2>Faça Parte da Revolução Musical</h2>
                <p>
                    Junte-se a milhões de pessoas que já descobriram que a música soa melhor quando
                    compartilhada. Sua próxima descoberta musical favorita está esperando por você.
                </p>
                <div className="cta-buttons">
                    <button className="btn btn-primary">Começar Agora</button>
                    <button className="btn btn-outline">Explorar Comunidades</button>
                </div>
            </section>

        </div>
    )
}
