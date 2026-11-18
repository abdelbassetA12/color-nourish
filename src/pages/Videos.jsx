
import { useState } from 'react';

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@ColorNourish';

const videos = [
  // SHORTS
  {
    id: '-TduBVTZskE',
    title: 'Relaxing Coloring Short 1',
    type: 'short',
  },
  {
    id: 'CQAllRb13ts',
    title: 'Relaxing Coloring Short 2',
    type: 'short',
  },
  {
    id: 'K9uhAP0l6B8',
    title: 'Relaxing Coloring Short 3',
    type: 'short',
  },
  {
    id: 'GxNH7i6xkrY',
    title: 'Relaxing Coloring Short 4',
    type: 'short',
  },
  {
    id: '7yF8xER_bQo',
    title: 'Relaxing Coloring Short 5',
    type: 'short',
  },
  {
    id: '-xfgkVL2mZY',
    title: 'Relaxing Coloring Short 6',
    type: 'short',
  },
  {
    id: 'V0sjHRINNGU',
    title: 'Relaxing Coloring Short 7',
    type: 'short',
  },
  {
    id: 'jB6vrb-w4_8',
    title: 'Relaxing Coloring Short 8',
    type: 'short',
  },
  {
    id: '86HzZ1X92AA',
    title: 'Relaxing Coloring Short 9',
    type: 'short',
  },

  // REGULAR VIDEOS - DEMO
  {
    id: 'IeFIldWDNak',
    title: 'Relaxing Mandala Coloring',
    type: 'video',
  },
  {
    id: 'RwPsgZEerSs',
    title: 'Color and Calm – Mandala Coloring',
    type: 'video',
  },
  {
    id: '9Nhm8zyqSyg',
    title: 'Gold Mandala Background',
    type: 'video',
  },
];

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);

  const shorts = videos.filter((video) => video.type === 'short');
  const regularVideos = videos.filter((video) => video.type === 'video');

  return (
    <main className="videos-page">

      {/* HERO SECTION */}
      <section className="videos-hero">
        <div className="container">
          <span className="eyebrow">
            COLORNOURISH ON YOUTUBE
          </span>

          <h1>Relax, Watch & Get Inspired</h1>

          <p>
            Discover relaxing mandala coloring videos,
            creative inspiration and beautiful coloring moments.
          </p>

          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* SHORTS SECTION */}
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <span className="eyebrow">
              QUICK COLORING MOMENTS
            </span>

            <h2>YouTube Shorts</h2>

            <p className="section-heading__text">
              Enjoy short and relaxing coloring videos
              whenever you need a creative break.
            </p>
          </div>

          <div className="videos-grid">
            {shorts.map((video) => (
              <button
                className="video-card"
                key={video.id}
                onClick={() => setActiveVideo(video)}
                aria-label={`Watch ${video.title}`}
                type="button"
              >
                <div className="video-card__thumbnail video-card__thumbnail--short">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                  />

                  <span className="video-card__play">
                    ▶
                  </span>

                  <span className="video-card__label">
                    SHORTS
                  </span>
                </div>

                <div className="video-card__body">
                  <h3>{video.title}</h3>
                  <span>Watch video →</span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* REGULAR VIDEOS SECTION */}
      <section className="section videos-regular-section">
        <div className="container">

          <div className="section-heading">
            <span className="eyebrow">
              RELAXING COLORING EXPERIENCES
            </span>

            <h2>Full-Length Videos</h2>

            <p className="section-heading__text">
              Take your time, relax and enjoy longer
              coloring videos and creative inspiration.
            </p>
          </div>

          <div className="videos-grid videos-grid--regular">
            {regularVideos.map((video) => (
              <button
                className="video-card"
                key={video.id}
                onClick={() => setActiveVideo(video)}
                aria-label={`Watch ${video.title}`}
                type="button"
              >
                <div className="video-card__thumbnail video-card__thumbnail--video">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                  />

                  <span className="video-card__play">
                    ▶
                  </span>

                  <span className="video-card__label">
                    VIDEO
                  </span>
                </div>

                <div className="video-card__body">
                  <h3>{video.title}</h3>
                  <span>Watch video →</span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section className="videos-subscribe">
        <div className="container">

          <span className="eyebrow">
            JOIN OUR COMMUNITY
          </span>

          <h2>Love Coloring? Subscribe!</h2>

          <p>
            Follow ColorNourish for more relaxing videos
            and creative inspiration.
          </p>

          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Visit ColorNourish on YouTube ↗
          </a>

        </div>
      </section>

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div
          className="video-modal"
          onClick={() => setActiveVideo(null)}
          role="presentation"
        >
          <div
            className={`video-modal__content video-modal__content--${activeVideo.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal__close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              type="button"
            >
              ×
            </button>

            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

    </main>
  );
}
