"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function CodexLanding() {
  const [currentPage, setCurrentPage] = useState<"initial" | "funnel">("initial")
  const [typedText, setTypedText] = useState("")
  const [showCTA, setShowCTA] = useState(false)
  const [copyIndex, setCopyIndex] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showGlitch, setShowGlitch] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [logoGlitch, setLogoGlitch] = useState(false)
  const [initialLogoGlitch, setInitialLogoGlitch] = useState(false)
  const [ctaGlitch, setCtaGlitch] = useState(false)
  const [watermarkGlitch, setWatermarkGlitch] = useState(false)
  const [backgroundGlitch, setBackgroundGlitch] = useState(false)
  const [showFinalCTA, setShowFinalCTA] = useState(false)
  const [finalCtaGlitch, setFinalCtaGlitch] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [systemError, setSystemError] = useState(false)
  const [errorFixed, setErrorFixed] = useState(false)
  const [textBeforeError, setTextBeforeError] = useState("")
  const [textAfterError, setTextAfterError] = useState("")
  const [feedbackIndex, setFeedbackIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Audio context for synthetic sounds
  const audioContextRef = useRef<AudioContext | null>(null)

  const copy = `Quantas vezes você já perdeu horas tentando criar um criativo que realmente vende?

Abre o Canva, tenta modelar algo, mas nada fica bom. E mesmo quando termina, bate a dúvida: "Será que isso vai converter?"

Agora, por apenas ??,?? reais, você pode acabar com esse ciclo.

Um agente de inteligência artificial cria pra você criativos completos, no estilo que quiser: cinemático, publicitário, Pixar, cartoon, o que estiver no hype.

Você só diz o que quer, pode subir sua imagem, e em 3 minutos recebe dois criativos:
um com texto, outro com o fundo separado pra testar variações.

Viu só? É isso que eu faço: apenas um comando simples e ela faz criativos. O resultado? Anúncios que não só chamam atenção, mas convertem de verdade.

"Mas isso vende mesmo?"

Subi uma campanha com esses criativos. Resultado?
116 vendas de um e-book com CPA de R$6,59.

SOCIAL_PROOF_CAROUSEL

Você pode continuar travado, perdendo tempo, ou ativar agora o Agente de Criativos com I.A.

E o melhor: esse plano é só uma degustação — sua porta de entrada pro mundo real dos criativos que convertem e da I.A. que transforma.

Você recebe:
• O Agente Gerador de Criativos
• Uma vídeo-aula ensinando como usar
• Acesso vitalício
• E tudo isso… por apenas R$17

De R$197 por R$17.

Sem mensalidade. Sem enrolação. Sem desculpa.`

  const typingSpeed = 30
  const pauseBetweenSentences = 1000
  const errorTriggerText = "um com texto, outro com o fundo separado pra testar variações."

  const testimonials = [
    { id: 1, text: "8 VENDAS EM 24H - nem mexi em nada! 🚀" },
    { id: 2, text: "5 VARIAÇÕES EM 10 MIN - conversão subiu 300% 📈" },
    { id: 3, text: "12 VENDAS NO PRIMEIRO DIA - mudou tudo! 💰" },
    { id: 4, text: "CPA CAIU DE R$45 PARA R$6 - inacreditável! ⚡" },
  ]

  // Initialize audio context
  const initAudioContext = () => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        console.log("🎵 AudioContext inicializado")
      } catch (error) {
        console.log("⚠️ AudioContext não suportado:", error)
      }
    }
  }

  // Play synthetic sound
  const playSyntheticSound = (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) => {
    if (!soundEnabled || !userInteracted || !audioContextRef.current) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + duration)
    } catch (error) {
      console.log("⚠️ Erro ao tocar som sintético:", error)
    }
  }

  const playTypingSound = () => playSyntheticSound(800, 0.1, "square", 0.05)
  const playErrorSound = () => playSyntheticSound(200, 2, "square", 0.1)
  const playSuccessSound = () => playSyntheticSound(523, 1.5, "sine", 0.08)

  // Detect first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true)
        initAudioContext()
        console.log("👆 Primeira interação detectada!")
      }
    }

    document.addEventListener("click", handleFirstInteraction, { once: true })
    return () => document.removeEventListener("click", handleFirstInteraction)
  }, [userInteracted])

  // Timeline Feedbacks Component
  const TimelineFeedbacks = ({
    currentIndex,
    setCurrentIndex,
  }: { currentIndex: number; setCurrentIndex: (index: number) => void }) => {
    const currentTestimonial = testimonials[currentIndex]

    return (
      <div className="simple-timeline-feedbacks">
        <div className="testimonials-title">📊 FEEDBACKS ✅</div>

        <div className="simple-feedback-item show">
          <div className="simple-feedback-box">
            <div className="simple-feedback-header">
              <span className="simple-feedback-title">💬 Resultado #{currentTestimonial.id}</span>
              <span className="simple-feedback-time">há {currentIndex + 1}h</span>
            </div>
            <div className="simple-feedback-content">"{currentTestimonial.text}"</div>
            <div className="simple-feedback-footer">
              <span className="simple-feedback-verified">✅ Verificado</span>
            </div>
          </div>
        </div>

        <div className="dots">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="testimonial-list">
          <div className="testimonial-list-title">Últimos resultados (clique para ver):</div>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-list-item ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              • {testimonial.text}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Text formatting
  const renderStyledText = (text: string) => {
    let styledText = text

    styledText = styledText.replace(/(\?\?,\?\?)/g, (match) => {
      return `<span class="price-highlight">${match}</span>`
    })

    styledText = styledText.replace(/(De )(R\$197)( por )(R\$17)(\.)/g, (match, de, oldPrice, por, newPrice, dot) => {
      return `${de}<span class="price-old">${oldPrice}</span>${por}<span class="price-new">${newPrice}</span>${dot}`
    })

    styledText = styledText.replace(/(por apenas )(R\$17)( reais)/g, (match, porApenas, price, reais) => {
      return `${porApenas}<span class="price-new">${price}</span>${reais}`
    })

    if (styledText !== text) {
      return <span className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: styledText }} />
    }

    return <span className="whitespace-pre-wrap">{text}</span>
  }

  const renderTextWithSocialProof = (text: string) => {
    const carouselMarker = "SOCIAL_PROOF_CAROUSEL"
    const carouselIndex = text.indexOf(carouselMarker)

    if (carouselIndex !== -1) {
      const beforeCarousel = text.substring(0, carouselIndex)
      const afterCarousel = text.substring(carouselIndex + carouselMarker.length)

      return (
        <>
          {renderStyledText(beforeCarousel)}
          <TimelineFeedbacks currentIndex={feedbackIndex} setCurrentIndex={setFeedbackIndex} />
          {renderStyledText(afterCarousel)}
        </>
      )
    }

    return renderStyledText(text)
  }

  // Text corruption for error state
  const getDisplayText = (text: string) => {
    if (!systemError || errorFixed) {
      return text
    }

    const chars = ["█", "▓", "▒", "░", "!", "@", "#", "$", "%", "^", "&", "*", "?", "<", ">", "|", "~"]
    return text
      .split("")
      .map((char) => {
        if (char === " " || char === "\n") return char
        const random = Math.random()
        if (random < 0.3) return chars[Math.floor(Math.random() * chars.length)]
        if (random < 0.4) return ""
        if (random < 0.5) return char + char
        return char
      })
      .join("")
  }

  // Sentence detection
  const isStartOfSentence = (text: string, index: number) => {
    if (index === 0) return true
    const prevChar = text[index - 1]
    const currentChar = text[index]
    return (prevChar === "." || prevChar === "!" || prevChar === "?") && currentChar !== " " && currentChar !== "\n"
  }

  const isEndOfSentence = (text: string, index: number) => {
    const char = text[index - 1]
    const nextChar = text[index]
    return (
      (char === "." || char === "!" || char === "?") && (nextChar === " " || nextChar === "\n" || index === text.length)
    )
  }

  // Show continue button after 1 second
  useEffect(() => {
    if (currentPage === "initial") {
      const timer = setTimeout(() => {
        setShowContinueButton(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentPage])

  // Glitch effects
  useEffect(() => {
    if (currentPage === "initial") {
      const initialDelay = setTimeout(() => {
        const glitchInterval = setInterval(() => {
          setShowGlitch(true)
          setTimeout(() => setShowGlitch(false), 200)
        }, 1000)
        return () => clearInterval(glitchInterval)
      }, 2000)
      return () => clearTimeout(initialDelay)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPage === "initial") {
      const interval = setInterval(() => {
        setInitialLogoGlitch(true)
        setTimeout(() => setInitialLogoGlitch(false), 200)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPage === "funnel") {
      const interval = setInterval(() => {
        setLogoGlitch(true)
        setTimeout(() => setLogoGlitch(false), 150)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [currentPage])

  useEffect(() => {
    if (showCTA && currentPage === "funnel") {
      const interval = setInterval(() => {
        setCtaGlitch(true)
        setTimeout(() => setCtaGlitch(false), 180)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [showCTA, currentPage])

  useEffect(() => {
    if (currentPage === "funnel") {
      const interval = setInterval(() => {
        setWatermarkGlitch(true)
        setTimeout(() => setWatermarkGlitch(false), 300)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPage === "funnel") {
      const interval = setInterval(() => {
        setBackgroundGlitch(true)
        setTimeout(() => setBackgroundGlitch(false), 300)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [currentPage])

  useEffect(() => {
    if (typingComplete && !showFinalCTA) {
      const timer = setTimeout(() => {
        setShowFinalCTA(true)
        setTimeout(() => {
          setFinalCtaGlitch(true)
          setTimeout(() => setFinalCtaGlitch(false), 300)
          const glitchInterval = setInterval(() => {
            setFinalCtaGlitch(true)
            setTimeout(() => setFinalCtaGlitch(false), 300)
          }, 3000)
          return () => clearInterval(glitchInterval)
        }, 1000)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [typingComplete, showFinalCTA])

  // Typing effect
  useEffect(() => {
    if (currentPage === "funnel" && copyIndex <= copy.length && !isPaused) {
      if (typedText.includes(errorTriggerText) && !systemError && !errorFixed) {
        const triggerIndex = typedText.indexOf(errorTriggerText)
        const beforeError = typedText.substring(0, triggerIndex + errorTriggerText.length)
        const afterError = copy.substring(triggerIndex + errorTriggerText.length)

        setTextBeforeError(beforeError)
        setTextAfterError(afterError)

        setTimeout(() => {
          setSystemError(true)
        }, 1000)
        return
      }

      if (errorFixed && textAfterError) {
        const remainingText = textAfterError
        const currentAfterIndex = copyIndex - textBeforeError.length

        if (currentAfterIndex < remainingText.length) {
          if (isStartOfSentence(textAfterError, currentAfterIndex)) {
            playTypingSound()
          }

          if (isEndOfSentence(textAfterError, currentAfterIndex)) {
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setCopyIndex(copyIndex + 1)
            }, pauseBetweenSentences)
            return
          }

          const timer = setTimeout(() => {
            setCopyIndex(copyIndex + 1)
          }, typingSpeed)
          return () => clearTimeout(timer)
        } else {
          setTypingComplete(true)
        }
        return
      }

      const currentText = copy.substring(0, copyIndex)
      if (currentText.includes("SOCIAL_PROOF_CAROUSEL")) {
        const beforeTestimonials = currentText.replace("SOCIAL_PROOF_CAROUSEL", "")
        setTypedText(beforeTestimonials)

        setTimeout(() => {
          setCopyIndex(copy.indexOf("SOCIAL_PROOF_CAROUSEL") + "SOCIAL_PROOF_CAROUSEL".length)
        }, 2000)
        return
      }

      if (!typedText.includes(errorTriggerText)) {
        if (isStartOfSentence(copy, copyIndex)) {
          playTypingSound()
        }

        if (isEndOfSentence(copy, copyIndex)) {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setTypedText(copy.substring(0, copyIndex))
            setCopyIndex(copyIndex + 1)
          }, pauseBetweenSentences)
          return
        }

        const timer = setTimeout(() => {
          setTypedText(copy.substring(0, copyIndex))
          setCopyIndex(copyIndex + 1)
        }, typingSpeed)
        return () => clearTimeout(timer)
      }
    } else if (copyIndex > copy.length && !systemError) {
      setTypedText(copy)
      setTypingComplete(true)
      setTimeout(() => setShowCTA(true), 300)
    }
  }, [
    currentPage,
    copyIndex,
    copy,
    typedText,
    systemError,
    errorFixed,
    errorTriggerText,
    textBeforeError,
    textAfterError,
    isPaused,
  ])

  // Force scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    return () => clearTimeout(timer)
  }, [currentPage])

  const handleEnter = () => {
    window.scrollTo(0, 0)
    setCurrentPage("funnel")
    setCopyIndex(0)
    setTypedText("")
    setShowCTA(false)
    setShowFinalCTA(false)
    setTypingComplete(false)
    setSystemError(false)
    setErrorFixed(false)
    setTextBeforeError("")
    setTextAfterError("")
    setIsPaused(false)

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 50)
  }

  const scrollToSignup = () => {
    window.open("https://checkout.perfectpay.com.br/P/646077", "_blank")
  }

  const handleFinalCTA = () => {
    window.open("https://checkout.perfectpay.com.br/P/646077", "_blank")
  }

  const handleFixError = () => {
    playSuccessSound()
    setTimeout(() => {
      setErrorFixed(true)
      setTimeout(() => {
        setCopyIndex(textBeforeError.length)
      }, 1500)
    }, 200)
  }

  // Rain Effect Component
  const RainEffect = () => {
    return (
      <div className="rain-container">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`raindrop-${i}`} className="raindrop" />
        ))}
      </div>
    )
  }

  if (currentPage === "initial") {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative screen-border font-mono">
        <div className="absolute top-4 right-4 z-10">
          <div
            className="text-sm text-gray-500 cursor-pointer hover:text-gray-300 transition-colors select-none"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            Som : {soundEnabled ? "ON" : "OFF"} (synthetic)
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className={`${initialLogoGlitch ? "glitch-logo-3d" : ""}`}>
              <Image
                src="/images/codex-logo-clean.png"
                alt="Logo CODEX"
                width={120}
                height={120}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter brightness-110"
                priority
              />
            </div>

            <div
              className={`text-white text-base sm:text-lg md:text-xl leading-relaxed max-w-md ${showGlitch ? "glitch-text" : ""}`}
            >
              A inteligência artificial criou a sala. Você foi o escolhido pra entrar.
            </div>

            {showContinueButton && (
              <div
                className="text-gray-500 cursor-pointer animate-pulse hover:text-gray-300 transition-colors text-sm sm:text-base mt-8"
                onClick={handleEnter}
              >
                {"> continuar _"}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen text-white screen-border relative font-mono ${systemError && !errorFixed ? "system-corrupted" : ""} ${backgroundGlitch ? "background-glitch-soft" : ""}`}
      style={{
        backgroundImage: `url('/images/codex-logo-cyberpunk.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-90" style={{ zIndex: 1 }} />

      <RainEffect />

      <div className="flex justify-between items-center p-4 relative z-10">
        <div className={`${logoGlitch ? "glitch-logo" : ""} ${systemError && !errorFixed ? "corrupted-logo" : ""}`}>
          <Image
            src="/images/codex-logo-clean.png"
            alt="Logo CODEX"
            width={60}
            height={60}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain filter brightness-110"
          />
        </div>

        <div
          className="text-sm text-gray-500 cursor-pointer hover:text-gray-300 transition-colors select-none"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          Som : {soundEnabled ? "ON" : "OFF"} (synthetic)
        </div>
      </div>

      <div className="px-4 pb-20 relative z-10">
        <div
          className={`text-white text-sm sm:text-base leading-relaxed ${systemError && !errorFixed ? "corrupted-text" : ""}`}
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9)" }}
        >
          {systemError ? (
            <span className="whitespace-pre-wrap">{getDisplayText(textBeforeError || typedText)}</span>
          ) : (
            renderTextWithSocialProof(typedText)
          )}
          {!systemError && !typingComplete && <span className="text-red-400 animate-pulse">_</span>}
        </div>

        {systemError && (
          <div
            className={`mt-6 mb-6 cursor-pointer transition-all duration-700 transform ${
              errorFixed ? "success-bar scale-105 hover:scale-110" : "error-bar hover:scale-102 animate-pulse"
            }`}
            onClick={!errorFixed ? handleFixError : undefined}
          >
            {errorFixed ? (
              <>
                <div className="success-bar-content">✅ &gt;&gt;&gt; SISTEMA REINTEGRADO COM SUCESSO ✅</div>
                <div className="success-bar-subtitle">Sistema operando normalmente</div>
              </>
            ) : (
              <>
                <div className="error-bar-content">🔒 &gt;&gt;&gt; ERRO NO SISTEMA - REINTEGRAÇÃO NECESSÁRIA 🔒</div>
                <div className="error-bar-subtitle">Clique para resolver o problema e continuar</div>
              </>
            )}
          </div>
        )}

        {errorFixed && textAfterError && (
          <div
            className="text-white text-sm sm:text-base leading-relaxed"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9)" }}
          >
            {renderTextWithSocialProof(textAfterError.substring(0, copyIndex - textBeforeError.length))}
            {copyIndex - textBeforeError.length < textAfterError.length && (
              <span className="text-red-400 animate-pulse">_</span>
            )}
          </div>
        )}

        {showFinalCTA && (
          <div className="mt-4">
            <span
              onClick={handleFinalCTA}
              className="text-white text-sm sm:text-base leading-relaxed cursor-pointer hover:text-cyan-400 transition-colors duration-300"
              style={{
                color: finalCtaGlitch ? "#00ff00" : "#ffffff",
                transform: finalCtaGlitch ? "translate(-2px, 1px)" : "translate(0)",
                textShadow: finalCtaGlitch
                  ? "2px 0 #ff0000, -2px 0 #0000ff, 0 2px #00ff00"
                  : "2px 2px 4px rgba(0,0,0,0.9)",
                filter: finalCtaGlitch ? "brightness(1.5) contrast(2) hue-rotate(90deg)" : "brightness(1)",
                display: "inline-block",
              }}
            >
              Clique aqui agora e transforme sua criação de anúncios para sempre.
            </span>
          </div>
        )}

        {showCTA && (
          <div
            className={`mt-6 text-cyan-400 cursor-pointer text-sm hover:text-cyan-300 transition-all duration-300 ${ctaGlitch ? "glitch-text-hacker" : ""}`}
            onClick={scrollToSignup}
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9)" }}
          >
            &gt; acesse_agora_o_sistema.exe
          </div>
        )}
      </div>
    </div>
  )
}
