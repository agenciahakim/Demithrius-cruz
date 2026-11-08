import React, { useRef, useState } from 'react'
import { useSiteMotion } from './motion.js'
import { useMagneticButton } from './useMagneticButton.js'
import { useSlideReveal } from './useSlideReveal.js'

const PHONE = '5548988808180'
const DIRECT_MESSAGE = 'Olá, Demithrius! Gostaria de conversar sobre um consórcio Ademicon para o meu objetivo.'
const directWhatsApp = `https://wa.me/${PHONE}?text=${encodeURIComponent(DIRECT_MESSAGE)}`

const objectives = [
  {
    id: 'Imóvel',
    title: 'Imóveis',
    description: 'Para planejar a compra, a troca ou a ampliação do seu patrimônio imobiliário.',
  },
  {
    id: 'Veículo',
    title: 'Veículos',
    description: 'Para escolher o próximo veículo com uma estratégia alinhada ao seu orçamento.',
  },
  {
    id: 'Serviço',
    title: 'Serviços',
    description: 'Para transformar projetos pessoais ou profissionais em um objetivo planejado.',
  },
  {
    id: 'Construção patrimonial',
    title: 'Patrimônio',
    description: 'Para organizar conquistas de médio e longo prazo com orientação individual.',
  },
]

const horizons = [
  'Nos próximos 12 meses',
  'Em 1 a 3 anos',
  'Em mais de 3 anos',
  'Ainda estou planejando',
]

const faqs = [
  {
    question: 'Consórcio tem juros?',
    answer: 'O consórcio não cobra juros de financiamento. As parcelas incluem taxa de administração e podem incluir fundo de reserva, seguro e outros valores previstos no contrato. Demithrius pode explicar as condições do plano antes de qualquer decisão.',
  },
  {
    question: 'Quando acontece a contemplação?',
    answer: 'A contemplação ocorre por sorteio ou lance, conforme as regras do grupo e a disponibilidade de recursos. Não existe garantia de contemplação em uma data específica.',
  },
  {
    question: 'Preciso saber o valor exato da carta de crédito?',
    answer: 'Não. Você pode começar com uma estimativa ou escolher “Ainda não sei” no quiz. A conversa com Demithrius ajuda a avaliar opções de crédito e parcelas para o seu objetivo.',
  },
  {
    question: 'O quiz já é uma proposta de consórcio?',
    answer: 'Não. Ele organiza suas preferências para iniciar uma conversa. As condições, os custos e as regras dependem da proposta e do contrato do plano escolhido.',
  },
]

const formatMoney = (digits) => {
  if (!digits) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Number(digits))
}

const onlyDigits = (value) => value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9)

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="arrow-icon">
      {diagonal ? (
        <path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3 12h17m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <img className="whatsapp-icon" src="/assets/whatsapp.svg" alt="" width="20" height="20" aria-hidden="true" />
  )
}

function ButtonLink({ href, children, variant = 'solid', diagonal = false, className = '', ...props }) {
  return (
    <a className={`button button--${variant} ${className}`} href={href} data-magnetic="" {...props}>
      <MagneticContent><span>{children}</span><Arrow diagonal={diagonal} /></MagneticContent>
    </a>
  )
}

function MagneticContent({ children }) {
  const contentRef = useRef(null)
  useMagneticButton(contentRef)
  return <span className="magnetic-inner" ref={contentRef}>{children}</span>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header" id="topo">
      <a className="brand" href="#topo" aria-label="Demithrius Cruz, voltar ao início">
        <span className="brand-mark"><img src="/assets/ademicon-symbol.jpeg" alt="" width="2000" height="2000" /></span>
        <span className="brand-name">DEMITHRIUS<br />CRUZ</span>
      </a>

      <nav className={`header-nav ${menuOpen ? 'header-nav--open' : ''}`} aria-label="Navegação principal" id="primary-nav">
        <a href="#objetivos" onClick={() => setMenuOpen(false)}>Objetivos</a>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
        <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
        <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        <a className="header-nav-mobile-cta" href={directWhatsApp} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Falar no WhatsApp <Arrow diagonal /></a>
      </nav>

      <a className="header-contact" href={directWhatsApp} target="_blank" rel="noopener noreferrer">
        Falar com Demithrius <Arrow diagonal />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section-frame" aria-labelledby="hero-title">
      <span className="hero-orbit hero-orbit--one" aria-hidden="true" />
      <span className="hero-orbit hero-orbit--two" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-rule" /> CONSÓRCIO ADEMICON <span className="eyebrow-dot">·</span> ORIENTAÇÃO INDIVIDUAL</p>
        <h1 id="hero-title">Consórcio para conquistar seus objetivos e construir <em>patrimônio.</em></h1>
        <p className="hero-description">Planeje imóveis, veículos ou serviços com Demithrius Cruz. Atendimento próximo em Florianópolis e para todo o Brasil.</p>
        <div className="hero-actions">
          <ButtonLink href="#quiz" className="hero-primary">Começar meu planejamento</ButtonLink>
          <a className="text-link" href={directWhatsApp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Falar diretamente no WhatsApp <Arrow diagonal /></a>
        </div>
        <div className="hero-proof"><strong>+10MM</strong><span>sob gestão</span><i aria-hidden="true" /><span>Clientes no Brasil e no exterior</span></div>
        <div className="hero-credential">
          <span className="hero-credential-line" />
          <span>CONSULTOR AUTORIZADO ADEMICON<br />FLORIANÓPOLIS · ATENDIMENTO NACIONAL</span>
        </div>
      </div>
      <figure className="hero-visual">
        <div className="hero-ribbon-wrap" aria-hidden="true"><img className="hero-ribbon" src="/assets/red-path-sculpture.png" alt="" width="1122" height="1402" /></div>
        <div className="hero-photo-wrap">
          <img src="/assets/demithrius-editorial.jpg" alt="Retrato de Demithrius Cruz" width="1097" height="1434" fetchPriority="high" />
          <span className="hero-visual-index">01 / DEMITHRIUS CRUZ</span>
        </div>
      </figure>
      <div className="hero-bottom" aria-hidden="true"><span>PLANEJE COM CLAREZA.</span><span>AVANCE COM PROPÓSITO.</span><span>↓ EXPLORE</span></div>
    </section>
  )
}

function MotionRail() {
  return (
    <div className="motion-rail" aria-hidden="true">
      <div className="motion-rail-track">
        <span>PLANEJAR <b>✳</b> CONQUISTAR <b>✳</b> CONSTRUIR <b>✳</b></span>
        <span>PLANEJAR <b>✳</b> CONQUISTAR <b>✳</b> CONSTRUIR <b>✳</b></span>
      </div>
    </div>
  )
}

function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
        <g className="ambient-contours">
          <path d="M-245-95C160 48 312 189 212 437S-93 747 228 1005" />
          <path d="M-168-95C212 42 374 191 280 450S-18 774 309 1005" />
          <path d="M-91-95C259 59 432 204 354 463S63 795 393 1005" />
          <path d="M1210-95C963 82 1044 264 1220 393S1539 741 1295 1005" />
          <path d="M1284-95C1044 84 1123 264 1294 396S1604 741 1376 1005" />
          <path d="M1358-95C1127 87 1203 267 1369 401S1668 745 1457 1005" />
        </g>
        <path className="ambient-route" d="M1140-95C955 83 1019 265 1196 397S1492 735 1266 1005" />
        <path className="ambient-route-progress" d="M1140-95C955 83 1019 265 1196 397S1492 735 1266 1005" />
      </svg>
    </div>
  )
}

function SectionCut({ tones, direction = 'rise', compact = false }) {
  const edge = direction === 'rise'
    ? 'M0 100 L340 100 L745 24 L1440 24'
    : 'M0 24 L695 24 L1090 100 L1440 100'
  const fill = `${edge} L1440 120 L0 120 Z`

  return (
    <div className={`section-cut section-cut--${tones} ${compact ? 'section-cut--compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <path className="section-cut-fill" d={fill} />
        <path className="section-cut-edge" d={edge} />
      </svg>
    </div>
  )
}

function GoalMedia() {
  return (
    <figure className="goal-media" aria-label="Composição conceitual de objetivos de consórcio">
      <img src="/assets/goals-editorial.jpg" alt="Maquetes conceituais de imóvel e veículo conectadas por uma faixa vermelha" width="1672" height="941" loading="lazy" />
      <figcaption className="goal-media-copy">
        <span className="section-label">ESCOLHAS DIFERENTES. O MESMO CUIDADO.</span>
        <strong>O futuro toma forma quando existe um plano.</strong>
        <small>Imagem conceitual</small>
      </figcaption>
      <svg className="goal-media-edge goal-media-edge--top" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V18H1000L590 82H0Z" /></svg>
      <svg className="goal-media-edge goal-media-edge--bottom" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100V69H360L785 6H1440V100Z" /></svg>
    </figure>
  )
}

function Objectives({ onChoose }) {
  return (
    <section className="objectives section-frame section-pad" id="objetivos" aria-labelledby="objectives-title">
      <div className="section-heading-grid" data-slide-reveal="" data-slide-direction="left">
        <p className="section-label">01 / SEU OBJETIVO</p>
        <div>
          <h2 id="objectives-title">O ponto de partida é <span>o que importa para você.</span></h2>
          <p className="section-intro">Uma decisão importante pede tempo, contexto e orientação. Escolha seu objetivo e comece uma conversa mais direcionada.</p>
        </div>
      </div>
      <div className="objective-list">
        {objectives.map((objective, index) => (
          <a
            href="#quiz"
            className="objective-row"
            key={objective.id}
            onClick={() => onChoose(objective.id)}
            aria-label={`Começar planejamento para ${objective.title}`}
          >
            <span className="objective-number">0{index + 1}</span>
            <span className="objective-title">{objective.title}</span>
            <span className="objective-description">{objective.description}</span>
            <span className="objective-arrow"><Arrow diagonal /></span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="process" id="como-funciona" aria-labelledby="process-title">
      <div className="section-frame section-pad">
        <div className="section-heading-grid" data-slide-reveal="" data-slide-direction="right">
          <p className="section-label">02 / COMO FUNCIONA</p>
          <div>
            <h2 id="process-title">Planejamento antes <span>da decisão.</span></h2>
            <p className="section-intro">O consórcio é uma forma de organizar uma conquista no tempo. Demithrius ajuda você a entender as opções e as regras antes de escolher.</p>
          </div>
        </div>
        <div className="process-steps">
          <article>
            <span className="process-number">01</span>
            <h3>Defina seu objetivo</h3>
            <p>Conte o que pretende conquistar e qual valor faz sentido para o seu momento.</p>
          </article>
          <article>
            <span className="process-number">02</span>
            <h3>Entenda as possibilidades</h3>
            <p>Avalie carta de crédito, parcelas e condições do plano com orientação individual.</p>
          </article>
          <article>
            <span className="process-number">03</span>
            <h3>Escolha com clareza</h3>
            <p>Conheça custos, contrato e formas de contemplação antes de tomar sua decisão.</p>
          </article>
        </div>
        <p className="process-note"><span aria-hidden="true">↗</span> A contemplação ocorre por sorteio ou lance, conforme as regras e os recursos do grupo. Não há garantia de data específica.</p>
      </div>
    </section>
  )
}

function Choice({ name, value, label, selected, onChange, detail }) {
  return (
    <label className={`choice ${selected ? 'choice--selected' : ''}`}>
      <input type="radio" name={name} value={value} checked={selected} onChange={onChange} />
      <span className="choice-control" aria-hidden="true" />
      <span className="choice-label">{label}{detail && <small>{detail}</small>}</span>
      <Arrow diagonal />
    </label>
  )
}

function Quiz({ answers, setAnswers, step, setStep }) {
  const panelRef = useRef(null)
  const contentRef = useRef(null)
  const isSummary = step === 4
  const update = (key, value) => setAnswers((current) => ({ ...current, [key]: value }))
  const goToStep = (nextStep) => {
    setStep(nextStep)
    window.requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
      contentRef.current?.focus({ preventScroll: true })
    })
  }
  const canAdvance = step === 0 ? Boolean(answers.objective)
    : step === 1 ? Boolean(answers.credit || answers.creditUnknown)
      : step === 2 ? Boolean(answers.monthly || answers.monthlyUnknown)
        : step === 3 ? Boolean(answers.horizon)
          : false

  const creditText = answers.creditUnknown ? 'Ainda não sei' : formatMoney(answers.credit)
  const monthlyText = answers.monthlyUnknown ? 'Quero orientação' : formatMoney(answers.monthly)
  const message = [
    'Olá, Demithrius! Fiz o planejamento inicial pelo site e gostaria de conversar sobre um consórcio Ademicon.',
    `Meu objetivo: ${answers.objective}.`,
    `Crédito desejado: ${creditText}.`,
    `Parcela mensal confortável: ${monthlyText}.`,
    `Meu horizonte: ${answers.horizon}.`,
  ].join('\n')
  const quizWhatsApp = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`

  return (
    <section className="quiz-section section-frame section-pad" id="quiz" aria-labelledby="quiz-title">
      <div className="quiz-intro" data-slide-reveal="" data-slide-direction="left">
        <p className="section-label">03 / SEU PLANEJAMENTO</p>
        <h2 id="quiz-title">Seu objetivo começa <span>com uma conversa.</span></h2>
        <p>Quatro respostas ajudam Demithrius a entender o que você busca. Sem cadastro e sem compromisso.</p>
        <div className="quiz-intro-decoration" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span></div>
      </div>

      <div className="quiz-panel" ref={panelRef}>
        <div className="quiz-panel-top">
          <span>PLANEJAMENTO INICIAL</span>
          <span aria-live="polite">{isSummary ? 'RESUMO' : `ETAPA 0${step + 1} / 04`}</span>
        </div>
        <div className="quiz-progress" role="progressbar" aria-valuenow={isSummary ? 4 : step + 1} aria-valuemin="0" aria-valuemax="4" aria-label="Progresso do planejamento">
          <span style={{ width: `${((isSummary ? 4 : step + 1) / 4) * 100}%` }} />
        </div>

        <div className="quiz-content" key={step} ref={contentRef} tabIndex={-1}>
          {step === 0 && (
            <fieldset>
              <legend>O que você quer planejar?</legend>
              <p className="quiz-help">Escolha o objetivo que mais combina com este momento.</p>
              <div className="choice-list">
                {objectives.map((objective) => (
                  <Choice key={objective.id} name="objective" value={objective.id} label={objective.title} selected={answers.objective === objective.id} onChange={() => update('objective', objective.id)} />
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend>Qual valor de crédito você tem em mente?</legend>
              <p className="quiz-help">Pode ser uma estimativa. O valor final será discutido com Demithrius.</p>
              <label className="amount-label" htmlFor="credit">Valor aproximado</label>
              <input
                id="credit"
                className="amount-input"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="R$ 0"
                value={formatMoney(answers.credit)}
                disabled={answers.creditUnknown}
                onChange={(event) => update('credit', onlyDigits(event.target.value))}
              />
              <label className="unknown-choice"><input type="checkbox" checked={answers.creditUnknown} onChange={(event) => update('creditUnknown', event.target.checked)} /><span>Ainda não sei o valor</span></label>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend>Qual parcela mensal cabe no seu planejamento?</legend>
              <p className="quiz-help">Uma referência confortável para começar a conversa, sem compromisso.</p>
              <label className="amount-label" htmlFor="monthly">Parcela aproximada</label>
              <input
                id="monthly"
                className="amount-input"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="R$ 0"
                value={formatMoney(answers.monthly)}
                disabled={answers.monthlyUnknown}
                onChange={(event) => update('monthly', onlyDigits(event.target.value))}
              />
              <label className="unknown-choice"><input type="checkbox" checked={answers.monthlyUnknown} onChange={(event) => update('monthlyUnknown', event.target.checked)} /><span>Quero orientação para definir</span></label>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend>Quando você gostaria de realizar esse objetivo?</legend>
              <p className="quiz-help">Seu horizonte ajuda no planejamento. Ele não representa uma previsão de contemplação.</p>
              <div className="choice-list">
                {horizons.map((horizon) => (
                  <Choice key={horizon} name="horizon" value={horizon} label={horizon} selected={answers.horizon === horizon} onChange={() => update('horizon', horizon)} />
                ))}
              </div>
            </fieldset>
          )}

          {isSummary && (
            <div className="quiz-summary">
              <span className="summary-check" aria-hidden="true">✓</span>
              <h3>Agora, vamos conversar sobre o seu plano.</h3>
              <p>Confira suas respostas. Você pode editar qualquer etapa antes de abrir o WhatsApp.</p>
              <dl>
                <div><dt>Objetivo</dt><dd>{answers.objective}</dd><button type="button" onClick={() => goToStep(0)} aria-label="Editar objetivo">Editar</button></div>
                <div><dt>Crédito desejado</dt><dd>{creditText}</dd><button type="button" onClick={() => goToStep(1)} aria-label="Editar crédito desejado">Editar</button></div>
                <div><dt>Parcela mensal</dt><dd>{monthlyText}</dd><button type="button" onClick={() => goToStep(2)} aria-label="Editar parcela mensal">Editar</button></div>
                <div><dt>Horizonte</dt><dd>{answers.horizon}</dd><button type="button" onClick={() => goToStep(3)} aria-label="Editar horizonte">Editar</button></div>
              </dl>
              <a className="button button--solid quiz-send" href={quizWhatsApp} target="_blank" rel="noopener noreferrer" data-magnetic=""><MagneticContent><span>Enviar meu objetivo pelo WhatsApp</span><Arrow diagonal /></MagneticContent></a>
              <small className="quiz-privacy">O WhatsApp abrirá com uma mensagem preenchida. Você escolhe se deseja enviá-la. O site não armazena suas respostas.</small>
            </div>
          )}
        </div>

        {!isSummary && (
          <div className="quiz-controls">
            {step > 0 ? <button type="button" className="quiz-back" onClick={() => goToStep(step - 1)}>← Voltar</button> : <span />}
            <button type="button" className="button button--solid quiz-next" onClick={() => goToStep(step + 1)} disabled={!canAdvance} data-magnetic="">
              <MagneticContent><span>{step === 3 ? 'Ver meu resumo' : 'Continuar'}</span><Arrow /></MagneticContent>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about section-frame section-pad" id="sobre" aria-labelledby="about-title">
      <div className="section-heading-grid" data-slide-reveal="" data-slide-direction="right">
        <p className="section-label">04 / QUEM ACOMPANHA VOCÊ</p>
        <div>
          <h2 id="about-title">Uma decisão sua. <span>Uma orientação próxima.</span></h2>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-portrait">
          <img src="/assets/demithrius-cruz.png" alt="Demithrius Cruz, consultor Ademicon" width="480" height="627" loading="lazy" />
          <span>DEMITHRIUS CRUZ / FLORIANÓPOLIS</span>
        </div>
        <div className="about-copy">
          <div className="about-brand">
            <img src="/assets/ademicon-symbol.jpeg" alt="Símbolo da Ademicon" width="2000" height="2000" loading="lazy" />
            <span>CONSULTOR AUTORIZADO<br />ADEMICON</span>
          </div>
          <h3>Planejamento financeiro começa com uma boa conversa.</h3>
          <p>Demithrius Cruz acompanha pessoas que querem conquistar bens, realizar projetos e construir patrimônio por meio do consórcio. O atendimento parte do seu objetivo, do seu momento e das condições que fazem sentido para você.</p>
          <div className="about-facts">
            <div><strong>+10MM</strong><span>SOB GESTÃO</span></div>
            <div><strong>Brasil<br />e exterior</strong><span>CLIENTES ATENDIDOS</span></div>
          </div>
          <a className="inline-action" href={directWhatsApp} target="_blank" rel="noopener noreferrer">Conversar com Demithrius <Arrow diagonal /></a>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="faq section-frame section-pad" id="duvidas" aria-labelledby="faq-title">
      <div className="section-heading-grid" data-slide-reveal="" data-slide-direction="left">
        <p className="section-label">05 / DÚVIDAS FREQUENTES</p>
        <div>
          <h2 id="faq-title">Entenda antes <span>de decidir.</span></h2>
          <p className="section-intro">Informação clara ajuda você a fazer perguntas melhores e escolher com confiança.</p>
        </div>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <details key={item.question}>
            <summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="section-frame final-cta-inner" data-slide-reveal="" data-slide-direction="right">
        <p className="section-label">06 / PRÓXIMO PASSO</p>
        <h2 id="final-title">O melhor momento para planejar é quando o objetivo <em>fica claro.</em></h2>
        <div className="final-cta-bottom">
          <p>Conte o que você quer realizar. Demithrius ajuda a avaliar as possibilidades com clareza e atenção ao seu contexto.</p>
          <div className="final-actions">
            <ButtonLink href="#quiz" variant="light">Começar meu planejamento</ButtonLink>
            <a className="final-whatsapp" href={directWhatsApp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Ou falar diretamente no WhatsApp <Arrow diagonal /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-frame">
      <div className="footer-main">
        <div>
          <a className="footer-name" href="#topo">Demithrius Cruz<span>.</span></a>
          <p>Consultor autorizado Ademicon.<br />Florianópolis · Atendimento em todo o Brasil.</p>
        </div>
        <div className="footer-links">
          <a href={directWhatsApp} target="_blank" rel="noopener noreferrer"><img className="footer-app-icon" src="/assets/whatsapp.svg" alt="" width="20" height="20" aria-hidden="true" />WhatsApp <Arrow diagonal /></a>
          <a href="https://www.instagram.com/demithrius.cruz/" target="_blank" rel="noopener noreferrer"><img className="footer-app-icon" src="/assets/instagram.svg" alt="" width="20" height="20" aria-hidden="true" />Instagram <Arrow diagonal /></a>
          <a href="https://www.ademicon.com.br/" target="_blank" rel="noopener noreferrer"><span className="footer-brand-icon" aria-hidden="true"><img src="/assets/ademicon-symbol.jpeg" alt="" width="2000" height="2000" /></span>Ademicon <Arrow diagonal /></a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} DEMITHRIUS CRUZ</span><span>CONSÓRCIO É PLANEJAMENTO. CONSULTE AS CONDIÇÕES DO PLANO.</span><a href="#topo">VOLTAR AO TOPO ↑</a></div>
    </footer>
  )
}

function App() {
  const pageRef = useRef(null)
  useSiteMotion(pageRef)
  useSlideReveal(pageRef)
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState({
    objective: '',
    credit: '',
    creditUnknown: false,
    monthly: '',
    monthlyUnknown: false,
    horizon: '',
  })

  return (
    <div className="site-shell" ref={pageRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="site-progress" aria-hidden="true" />
      <AmbientField />
      <Header />
      <main id="conteudo">
        <Hero />
        <SectionCut tones="paper-red" compact />
        <MotionRail />
        <SectionCut tones="red-paper" direction="fall" compact />
        <Objectives onChoose={(objective) => {
          setAnswers((current) => ({ ...current, objective }))
          setQuizStep(0)
        }} />
        <GoalMedia />
        <Process />
        <SectionCut tones="dark-sand" />
        <div className="quiz-band"><Quiz answers={answers} setAnswers={setAnswers} step={quizStep} setStep={setQuizStep} /></div>
        <SectionCut tones="sand-paper" direction="fall" />
        <About />
        <SectionCut tones="paper-paper" />
        <FAQ />
        <SectionCut tones="paper-red" direction="fall" />
        <FinalCTA />
        <SectionCut tones="red-dark" />
      </main>
      <Footer />
    </div>
  )
}

export default App
