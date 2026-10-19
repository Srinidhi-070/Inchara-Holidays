import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type Concept = "A" | "B" | "C"
type Language = "en" | "kn"

const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
}>({ language: "en", setLanguage: () => undefined })

function useLanguage() {
  return useContext(LanguageContext)
}

function LanguageToggle({ footer = false }: { footer?: boolean }) {
  const { language, setLanguage } = useLanguage()
  return (
    <div
      aria-label="Select language"
      className={`language-toggle ${footer ? "language-toggle-footer" : ""}`}
      role="group"
    >
      <button
        aria-pressed={language === "kn"}
        className={language === "kn" ? "active" : ""}
        lang="kn"
        onClick={() => setLanguage("kn")}
        type="button"
      >
        ಕನ್ನಡ
      </button>
      <i />
      <button
        aria-pressed={language === "en"}
        className={language === "en" ? "active" : ""}
        onClick={() => setLanguage("en")}
        type="button"
      >
        EN
      </button>
    </div>
  )
}

const photos = {
  munnar:
    "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=2000&q=88",
  tea: "https://images.unsplash.com/photo-1455157823797-3019317cbcf0?auto=format&fit=crop&w=1400&q=85",
  kerala:
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1400&q=85",
  keralaBoat:
    "https://images.unsplash.com/photo-1593417033942-bcdf26b74700?auto=format&fit=crop&w=1400&q=85",
  rajasthan:
    "https://images.unsplash.com/photo-1713682995521-22ec819b50ac?auto=format&fit=crop&w=1600&q=85",
  himachal:
    "https://images.unsplash.com/photo-1736914319111-d54ada582633?auto=format&fit=crop&w=1500&q=85",
  temple:
    "https://images.unsplash.com/photo-1736914309887-6403a7a7b9b8?auto=format&fit=crop&w=1000&q=85",
  global:
    "https://images.unsplash.com/photo-1653189382464-25302f3e7409?auto=format&fit=crop&w=1400&q=85",
  bali: "https://images.unsplash.com/photo-1742175257067-414cbe9033ff?auto=format&fit=crop&w=1200&q=85",
  food: "https://images.unsplash.com/photo-1728910156510-77488f19b152?auto=format&fit=crop&w=1400&q=85",
}

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top">
      <Mark />
      <span>
        <strong lang="kn">ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್</strong>
        <small>INCHARA HOLIDAYS</small>
      </span>
    </a>
  )
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Button({
  children,
  variant = "gold",
  href = "#planner",
}: {
  children: ReactNode
  variant?: "gold" | "outline" | "dark" | "text"
  href?: string
}) {
  return (
    <a className={`button button-${variant}`} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

function ConceptSwitcher({
  concept,
  onChange,
}: {
  concept: Concept
  onChange: (concept: Concept) => void
}) {
  const concepts: { id: Concept name: string detail: string }[] = [
    {
      id: "A",
      name: "Indian Luxury Edit",
      detail: "Quiet, cinematic, refined",
    },
    {
      id: "B",
      name: "Living Travel Journal",
      detail: "Layered, tactile, storied",
    },
    { id: "C", name: "Global Explorer", detail: "Bold, modern, expansive" },
  ]
  return (
    <aside
      className="concept-dock"
      aria-label="Explore three homepage concepts"
    >
      <div className="concept-intro">
        <span>03 directions / 01 spirit</span>
        <p>Choose an art direction</p>
      </div>
      <div className="concept-options">
        {concepts.map((item) => (
          <button
            className={concept === item.id ? "active" : ""}
            key={item.id}
            onClick={() => onChange(item.id)}
            type="button"
          >
            <b>0{item.id === "A" ? "1" : item.id === "B" ? "2" : "3"}</b>
            <span>
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </span>
          </button>
        ))}
      </div>
      <span className="selected-note">
        {concept === "A" ? "Selected direction" : "Concept preview"}
      </span>
    </aside>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()
  const kn = language === "kn"
  return (
    <header className="header">
      <Brand light />
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <a href="#destinations">{kn ? "ತಾಣಗಳು" : "Destinations"}</a>
        <a href="#experiences">{kn ? "ಅನುಭವಗಳು" : "Experiences"}</a>
        <a href="#services">
          {kn ? "ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಕ್ಯಾಟರಿಂಗ್" : "Corporate & Catering"}
        </a>
        <a href="#services">{kn ? "ಶಾಲಾ ಪ್ರವಾಸಗಳು" : "School Trips"}</a>
        <a href="#difference">{kn ? "ನಮ್ಮ ಕಥೆ" : "Our Story"}</a>
      </nav>
      <div className="header-actions">
        <LanguageToggle />
        <Button href="#planner">
          {kn ? "ಪ್ರಯಾಣ ರೂಪಿಸಿ" : "Plan your journey"}
        </Button>
        <button
          aria-label="Toggle navigation"
          className="menu"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero({ concept }: { concept: Concept }) {
  const { language } = useLanguage()
  const kn = language === "kn"
  if (concept === "B") {
    return (
      <section className="hero hero-journal" id="top">
        <Header />
        <div className="journal-photo photo-munnar" />
        <div className="journal-postcard">
          <span>FIELD NOTE / 01</span>
          <p lang="kn">ಮಣ್ಣಿನ ಕಥೆ. ಜನರ ಆತ್ಮೀಯತೆ.</p>
          <small>Western Ghats · 12.97° N</small>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            {kn
              ? "ಸಂಸ್ಕೃತಿಯಿಂದ ರೂಪುಗೊಂಡ, ಹೃದಯದಿಂದ ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಯಾಣಗಳು"
              : "Journeys shaped by culture, guided by heart"}
          </p>
          <h1>
            {kn
              ? "ನಿಧಾನವಾಗಿ ಸಾಗಿದಾಗ ಪ್ರಯಾಣವೇ ಕಥೆಯಾಗುತ್ತದೆ."
              : "Travel becomes a story when you slow down."}
          </h1>
          <p className="kannada" lang="kn">
            ನಿಧಾನವಾಗಿ ಸಾಗಿ. ಆಳವಾಗಿ ಅನುಭವಿಸಿ.
          </p>
          <div className="hero-actions">
            <Button>{kn ? "ನಿಮ್ಮ ಕಥೆ ಆರಂಭಿಸಿ" : "Begin your story"}</Button>
            <Button variant="outline" href="#destinations">
              {kn ? "ಪ್ರಯಾಣ ಪತ್ರಿಕೆ ತೆರೆಯಿರಿ" : "Open the journal"}
            </Button>
          </div>
        </div>
        <div className="thread-line" aria-hidden="true" />
      </section>
    )
  }

  if (concept === "C") {
    return (
      <section className="hero hero-global" id="top">
        <Header />
        <div className="global-word" aria-hidden="true">
          BEYOND
        </div>
        <div className="global-image image-one" />
        <div className="global-image image-two" />
        <div className="hero-copy">
          <p className="eyebrow">
            {kn
              ? "ಭಾರತದಿಂದ ವಿಶ್ವದವರೆಗೆ · ನಿಮಗಾಗಿ ರೂಪಿಸಿದ"
              : "India to the world · Curated privately"}
          </p>
          <h1>
            {kn ? "ಇನ್ನೂ" : "GO"}
            <br />
            <em>{kn ? "ಮುಂದೆ." : "FURTHER."}</em>
          </h1>
          <p className="kannada" lang="kn">
            ಜಗತ್ತನ್ನು ನಿಮ್ಮ ರೀತಿಯಲ್ಲಿ ಅನ್ವೇಷಿಸಿ.
          </p>
          <Button>{kn ? "ನನ್ನ ಪ್ರವಾಸ ರೂಪಿಸಿ" : "Design my escape"}</Button>
        </div>
        <p className="global-caption">
          One thoughtful travel studio.
          <br />A world of uncommon places.
        </p>
      </section>
    )
  }

  return (
    <section className="hero hero-luxury" id="top">
      <Header />
      <div className="hero-image" />
      <div className="hero-rule" />
      <div className="location-stamp">
        <span>12° 58′ N · 75° 46′ E</span>
        <strong>Western Ghats, India</strong>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">
          {kn
            ? "ಸಂಸ್ಕೃತಿಯಿಂದ ರೂಪುಗೊಂಡ, ಹೃದಯದಿಂದ ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಯಾಣಗಳು"
            : "Journeys shaped by culture, guided by heart"}
        </p>
        <h1>
          {kn ? "ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ," : "Discover India,"}
          <br />
          <em>{kn ? "ಸಾಮಾನ್ಯತೆಯನ್ನು ಮೀರಿ." : "beyond the ordinary."}</em>
        </h1>
        <p className="kannada" lang="kn">
          ಭಾರತವನ್ನು ಹೊಸ ಅನುಭವಗಳೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ.
        </p>
        <p className="hero-summary">
          {kn
            ? "ಚಿಂತನೆಯಿಂದ ರೂಪಿಸಿದ ಪ್ರಯಾಣಗಳು, ನೈಜ ಸ್ಥಳೀಯ ಅನುಭವಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಪ್ರಯಾಣವನ್ನೂ ಆತ್ಮೀಯವಾಗಿಸುವ ಆತಿಥ್ಯ."
            : "Thoughtfully curated journeys, authentic local experiences, and hospitality that makes every journey feel personal."}
        </p>
        <div className="hero-actions">
          <Button>{kn ? "ಪ್ರಯಾಣ ರೂಪಿಸಿ" : "Plan your journey"}</Button>
          <Button variant="outline" href="#destinations">
            {kn ? "ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ" : "Explore destinations"}
          </Button>
        </div>
      </div>
      <div className="scroll-cue">
        <span />
        Scroll to wander
      </div>
    </section>
  )
}

const destinations = [
  {
    name: "Karnataka",
    note: "Coffee estates · living heritage · wild forests",
    image: photos.tea,
    className: "destination-lead",
  },
  {
    name: "Kerala",
    note: "Backwaters at the pace of the palms",
    image: photos.kerala,
    className: "destination-tall",
  },
  {
    name: "Rajasthan",
    note: "Desert light and palace stories",
    image: photos.rajasthan,
    className: "destination-wide",
  },
  {
    name: "Himachal",
    note: "Mountain air and quiet villages",
    image: photos.himachal,
    className: "destination-small",
  },
  {
    name: "Beyond India",
    note: "Distinctive places, thoughtfully chosen",
    image: photos.global,
    className: "destination-global",
  },
]

function SectionTitle({
  label,
  title,
  copy,
  light = false,
}: {
  label: string
  title: ReactNode
  copy?: string
  light?: boolean
}) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <p className="section-label">
        <span>✦</span> {label}
      </p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  )
}

function Destinations() {
  return (
    <section className="destinations section-pad" id="destinations">
      <div className="title-row">
        <SectionTitle
          label="DESTINATION DISCOVERY"
          title={
            <>
              A world worth
              <br /> travelling <em>slowly.</em>
            </>
          }
          copy="From our home in South India to places across the world, every route is chosen for what it lets you feel—not how much it lets you tick off."
        />
        <div className="journey-links">
          <a href="#journeys">
            Domestic journeys <Arrow />
          </a>
          <a href="#journeys">
            International escapes <Arrow />
          </a>
        </div>
      </div>
      <div className="destination-grid">
        {destinations.map((item, index) => (
          <a
            className={`destination ${item.className}`}
            href="#planner"
            key={item.name}
          >
            <img alt={`${item.name} travel landscape`} src={item.image} />
            <span className="image-wash" />
            <div>
              <small>0{index + 1} / EXPLORE</small>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </div>
            <b>
              <Arrow />
            </b>
          </a>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services" id="services">
      <div className="services-heading section-pad">
        <SectionTitle
          label="MORE THAN TRAVEL"
          title={
            <>
              Hospitality,
              <br /> in all its <em>forms.</em>
            </>
          }
        />
        <p>
          One attentive team, four ways to bring people together. Every detail
          is considered, from the first conversation to the final farewell.
        </p>
      </div>
      <div className="service-holidays">
        <img alt="Lush tea gardens in Munnar" src={photos.munnar} />
        <div className="service-number">01</div>
        <div className="service-copy">
          <span>PRIVATE & GROUP TRAVEL</span>
          <h3>Curated Holidays</h3>
          <p>
            Personalised journeys across India and beyond, built around your
            pace and curiosities.
          </p>
          <Button variant="text">Discover holidays</Button>
        </div>
      </div>
      <div className="service-duo">
        <article className="service-corporate">
          <span className="service-number">02</span>
          <p className="mini-label">GATHER WITH PURPOSE</p>
          <h3>Corporate Events</h3>
          <p>
            Team offsites, retreats and conferences made memorable through
            place, people and precision.
          </p>
          <div className="line-illustration" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Button variant="text">Plan an event</Button>
        </article>
        <article className="service-food">
          <img alt="An abundant table of Indian dishes" src={photos.food} />
          <div className="food-caption">
            <span>03 / CATERING & HOSPITALITY</span>
            <h3>A table full of stories.</h3>
            <p>
              Regional menus and warm hospitality for celebrations of every
              scale.
            </p>
            <Button variant="outline">Explore catering</Button>
          </div>
        </article>
      </div>
      <div className="service-school section-pad">
        <div className="school-art">
          <div className="arch">
            <img alt="Himalayan heritage architecture" src={photos.temple} />
          </div>
          <span className="orbit">LEARN · WONDER · CONNECT ·</span>
        </div>
        <div className="school-copy">
          <span>04 / SCHOOL & EDUCATIONAL TRIPS</span>
          <h3>The world is the most vivid classroom.</h3>
          <p>
            Thoughtfully organised educational excursions that turn history,
            culture, ecology and community into experiences students remember.
          </p>
          <Button variant="dark">Plan an educational trip</Button>
        </div>
      </div>
    </section>
  )
}

const journeys = [
  {
    name: "The Soul of Karnataka",
    meta: "8 days · Culture & nature",
    image: photos.tea,
  },
  {
    name: "Monsoon in the Ghats",
    meta: "5 days · Slow & restorative",
    image: photos.munnar,
  },
  {
    name: "Royal Rajasthan",
    meta: "9 days · Heritage & cuisine",
    image: photos.rajasthan,
  },
  {
    name: "Himalayan Quietude",
    meta: "7 days · Mountain retreat",
    image: photos.himachal,
  },
]

function SignatureJourneys() {
  return (
    <section className="journeys section-pad" id="journeys">
      <div className="journey-head">
        <SectionTitle
          light
          label="SIGNATURE JOURNEYS"
          title={
            <>
              Made to stay
              <br /> with you.
            </>
          }
          copy="A small collection of journeys with a strong sense of place. Consider these a beginning—we shape the rest around you."
        />
        <Button variant="outline">View all journeys</Button>
      </div>
      <div className="journey-list">
        {journeys.map((journey, index) => (
          <a href="#planner" key={journey.name}>
            <span>0{index + 1}</span>
            <h3>{journey.name}</h3>
            <p>{journey.meta}</p>
            <div className="journey-thumb">
              <img alt={journey.name} src={journey.image} />
            </div>
            <b>
              <Arrow />
            </b>
          </a>
        ))}
      </div>
    </section>
  )
}

function Difference() {
  return (
    <section className="difference section-pad" id="difference">
      <div className="difference-photo">
        <img
          alt="Houseboat moving through Kerala backwaters"
          src={photos.keralaBoat}
        />
        <div className="photo-note">
          <span>Our philosophy / ನಮ್ಮ ತತ್ವ</span>
          <p>Travel well. Return changed.</p>
        </div>
      </div>
      <div className="difference-copy">
        <SectionTitle
          label="THE INCHARA DIFFERENCE"
          title={
            <>
              The smallest details
              <br /> make the <em>deepest journeys.</em>
            </>
          }
        />
        <p className="lead">
          We believe thoughtful travel starts with listening. To you, to a
          place, and to the people who call it home.
        </p>
        <div className="principles">
          {[
            [
              "01",
              "Planned around you",
              "Pace, interests and comfort shape every route.",
            ],
            [
              "02",
              "Rooted in place",
              "Local voices, regional food and meaningful encounters.",
            ],
            [
              "03",
              "Hospitality that stays close",
              "A helpful human presence, from idea to homecoming.",
            ],
          ].map(([number, title, copy]) => (
            <div key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Planner() {
  const [region, setRegion] = useState("India")
  const { language } = useLanguage()
  const kn = language === "kn"
  return (
    <section className="planner section-pad" id="planner">
      <div className="planner-intro">
        <p className="section-label">
          <span>✦</span>{" "}
          {kn ? "ನಿಮ್ಮ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭ" : "YOUR JOURNEY STARTS HERE"}
        </p>
        <h2>
          {kn
            ? "ನಿಮ್ಮ ಕನಸಿನ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಹೇಳಿ."
            : "Tell us what you’re dreaming of."}
        </h2>
        <p lang="kn">ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಯಾಣವನ್ನು ಒಟ್ಟಿಗೆ ರೂಪಿಸೋಣ.</p>
        <small>
          {kn
            ? "ನಿಗದಿತ ಪ್ಯಾಕೇಜುಗಳಿಲ್ಲ. ಆರಂಭಿಸಲು ಕೆಲವು ಸರಳ ಪ್ರಶ್ನೆಗಳು."
            : "No rigid packages. Just a few thoughtful questions to begin."}
        </small>
      </div>
      <div className="planner-card">
        <div className="planner-progress">
          <span>STEP 01 OF 06</span>
          <div>
            <i />
          </div>
          <b>01</b>
        </div>
        <fieldset>
          <legend>
            {kn
              ? "ನೀವು ಎಲ್ಲಿಗೆ ಪ್ರಯಾಣಿಸಲು ಬಯಸುತ್ತೀರಿ?"
              : "Where would you like to travel?"}
          </legend>
          <p>
            {kn
              ? "ಆರಂಭದ ತಾಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಉಳಿದುದನ್ನು ಒಟ್ಟಿಗೆ ನಿರ್ಧರಿಸೋಣ."
              : "Choose a starting point. We’ll narrow it down together."}
          </p>
          <div className="choice-row">
            {["Karnataka", "India", "International"].map((choice) => (
              <button
                className={region === choice ? "selected" : ""}
                key={choice}
                onClick={() => setRegion(choice)}
                type="button"
              >
                <span>
                  {choice === "Karnataka"
                    ? "ಕರ್ನಾಟಕ"
                    : choice === "India"
                      ? "भारत"
                      : "✦"}
                </span>
                <strong>{choice}</strong>
                <i>{region === choice ? "✓" : "○"}</i>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="next-questions">
          {[
            "When would you like to go?",
            "How many days?",
            "Who is travelling?",
            "Your travel style?",
            "Comfort preference?",
          ].map((question, index) => (
            <span key={question}>
              0{index + 2} <i>{question}</i>
            </span>
          ))}
        </div>
        <div className="planner-actions">
          <small>
            Preview interaction · Your choices are not submitted yet
          </small>
          <Button variant="dark">
            {kn ? "ಯೋಜನೆ ಮುಂದುವರಿಸಿ" : "Continue planning"}
          </Button>
        </div>
      </div>
    </section>
  )
}

function Stories() {
  return (
    <section className="stories section-pad">
      <div className="stories-heading">
        <SectionTitle
          label="TRAVELLER STORIES"
          title={
            <>
              Notes from
              <br /> the <em>road.</em>
            </>
          }
        />
        <p>
          Space for real memories from Inchara travellers—unhurried mornings,
          unexpected conversations, and places that felt like home.
        </p>
      </div>
      <div className="story-layout">
        <img
          alt="Quiet mountain village in Himachal Pradesh"
          src={photos.himachal}
        />
        <blockquote>
          <span>SAMPLE STORY PLACEHOLDER / TO BE REPLACED</span>
          <p>
            “Share a genuine traveller reflection here—what surprised them, what
            they carried home, and how the journey made them feel.”
          </p>
          <footer>Guest name · Journey · Travel date</footer>
        </blockquote>
        <div className="story-controls">
          <button aria-label="Previous story" type="button">
            ←
          </button>
          <span>01 / 03</span>
          <button aria-label="Next story" type="button">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { language } = useLanguage()
  const kn = language === "kn"
  return (
    <footer className="footer">
      <div className="footer-image">
        <img alt="Misty tea fields at dawn" src={photos.munnar} />
        <div>
          <span>{kn ? "ನಿಮ್ಮ ಕಥೆ ಕಾಯುತ್ತಿದೆ" : "YOUR STORY IS WAITING"}</span>
          <h2>
            {kn
              ? "ನಿಮ್ಮ ಮನಸ್ಸು ಮುಂದೆ ಎಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ?"
              : "Where will your heart take you next?"}
          </h2>
          <p lang="kn">ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.</p>
          <Button>{kn ? "ಪ್ರಯಾಣ ರೂಪಿಸಿ" : "Plan your journey"}</Button>
        </div>
      </div>
      <div className="footer-main section-pad">
        <div className="footer-brand">
          <Brand light />
          <p>
            Thoughtful journeys, genuine encounters,
            <br /> and hospitality from the heart.
          </p>
          <a href="mailto:hello@incharaholidays.com">
            hello@incharaholidays.com
          </a>
          <a href="tel:+910000000000">+91 00000 00000</a>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <a href="#destinations">Destinations</a>
            <a href="#journeys">Signature journeys</a>
            <a href="#experiences">Experiences</a>
            <a href="#difference">About Inchara</a>
          </div>
          <div>
            <span>SERVICES</span>
            <a href="#services">Corporate events</a>
            <a href="#services">Catering</a>
            <a href="#services">School trips</a>
            <a href="#planner">Plan your journey</a>
          </div>
          <div>
            <span>CONNECT</span>
            <a href="#footer">Instagram ↗</a>
            <a href="#footer">Facebook ↗</a>
            <a href="#footer">WhatsApp ↗</a>
            <LanguageToggle footer />
          </div>
        </div>
      </div>
      <div className="footer-bottom" id="footer">
        <span>© 2025 Inchara Holidays</span>
        <span>Travel slowly. Remember deeply.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [concept, setConcept] = useState<Concept>("A")
  const [language, setLanguage] = useState<Language>("en")
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <main
        className={`site concept-${concept.toLowerCase()} language-${language}`}
        lang={language === "kn" ? "kn" : "en"}
      >
        <ConceptSwitcher concept={concept} onChange={setConcept} />
        <Hero concept={concept} />
        <Destinations />
        <div id="experiences">
          <Services />
        </div>
        <SignatureJourneys />
        <Difference />
        <Planner />
        <Stories />
        <Footer />
      </main>
    </LanguageContext.Provider>
  )
}
