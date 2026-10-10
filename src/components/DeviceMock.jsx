import './DeviceMock.css'

/**
 * Abstract UI previews drawn in CSS — stand-ins for real screenshots.
 * Swap the `.mock-*` innards for an <img> once you have real captures.
 */

function PhoneScreen({ variant }) {
  return (
    <div className="mock-phone">
      <div className="mock-notch" />
      <div className="mock-screen">
        <div className="mock-topbar">
          <span className="mock-avatar" />
          <span className="mock-line w-40" />
          <span className="mock-pill" />
        </div>

        {variant === 'chat' ? (
          <div className="mock-chat">
            <span className="bubble in w-70" />
            <span className="bubble out w-55" />
            <span className="bubble in w-85" />
            <span className="bubble out w-45" />
            <span className="bubble in w-60" />
            <div className="mock-composer">
              <span className="mock-line w-60" />
              <span className="mock-send" />
            </div>
          </div>
        ) : (
          <div className="mock-feed">
            <div className="mock-hero-card">
              <span className="mock-line w-50 bright" />
              <span className="mock-line w-30" />
              <div className="mock-bars">
                <span style={{ height: '38%' }} />
                <span style={{ height: '66%' }} />
                <span style={{ height: '48%' }} />
                <span style={{ height: '88%' }} />
                <span style={{ height: '58%' }} />
                <span style={{ height: '74%' }} />
              </div>
            </div>
            <div className="mock-tiles">
              <span />
              <span />
            </div>
            <div className="mock-rows">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div className="mock-tabbar">
          <span className="is-active" />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function DesktopScreen({ variant }) {
  return (
    <div className="mock-desktop">
      <div className="mock-chrome">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="mock-url" />
      </div>

      <div className="mock-window">
        {variant === 'site' ? (
          <div className="mock-site">
            <div className="mock-site-nav">
              <span className="mock-line w-20 bright" />
              <div className="mock-site-links">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="mock-site-hero">
              <span className="mock-line w-70 bright tall" />
              <span className="mock-line w-50" />
              <div className="mock-site-btns">
                <span className="filled" />
                <span />
              </div>
            </div>
            <div className="mock-site-cards">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : variant === 'chat' ? (
          <div className="mock-ai-chat">
            <aside className="mock-ai-sidebar">
              <span className="mock-ai-brand">Nura AI</span>
              <span className="is-active">New Chat</span>
              <span>Search</span>
              <span>Library</span>
              <span>Prompts</span>
              <span>Settings</span>
            </aside>
            <div className="mock-ai-main">
              <div className="mock-ai-heading">
                <strong>How can I help you today?</strong>
                <span>Chat, plan, write, and get things done.</span>
              </div>
              <div className="mock-ai-message is-user">Help me brainstorm ideas for a productivity app.</div>
              <div className="mock-ai-message is-assistant">
                Here are a few ideas to help you get started.
                <span />
                <span />
                <span />
              </div>
              <div className="mock-ai-composer">
                <span>Message Nura AI...</span>
                <b aria-hidden="true">›</b>
              </div>
            </div>
          </div>
        ) : (
          <div className="mock-dash">
            <aside className="mock-side">
              <span className="mock-logo" />
              <span className="is-active" />
              <span />
              <span />
              <span />
              <span />
            </aside>
            <div className="mock-main">
              <div className="mock-kpis">
                <span />
                <span />
                <span />
              </div>
              <div className="mock-chart">
                <svg viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M0 34 L15 26 L30 30 L45 16 L60 21 L75 9 L90 14 L105 5 L120 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0 34 L15 26 L30 30 L45 16 L60 21 L75 9 L90 14 L105 5 L120 10 L120 44 L0 44 Z"
                    fill="currentColor"
                    opacity=".14"
                  />
                </svg>
              </div>
              <div className="mock-table">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DeviceMock({ device = 'phone', variant, accent = '#7c5cff' }) {
  return (
    <div className="mock" style={{ '--mock-accent': accent }}>
      <div className="mock-glow" aria-hidden="true" />
      {device === 'phone' ? (
        <div className="mock-phones">
          <PhoneScreen variant={variant} />
          <PhoneScreen variant={variant} />
        </div>
      ) : (
        <DesktopScreen variant={variant} />
      )}
    </div>
  )
}
