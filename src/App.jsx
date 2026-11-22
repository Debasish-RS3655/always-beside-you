import { useState, useEffect } from 'react'
import './App.css'


// bgType can be either 'image' or 'video'
// Video scenes are disabled in the current app version.
const SCENES = [
  {
    title: "Hi, I am Debasish",
    text: "or more so a digital version of me. I want you to meet someone who's so precious to me.",
    image: "/characters/debasish-nobg.png",
    background: "/scene/bg-yellow.png",
    bgType: "image"
  },
  {
    title: "Mur Abhilakhi",
    text: "My girl, My seetest woman, My love of this life. whom I would travel universes for.",
    image: "/characters/abhilakhi-nobg.png",
    background: "/scene/bg-yellow.png",
    bgType: "image"
  },
  {
    title: "She's my everything.",
    text: "She's the reason I belive in goodness, love and hope. She's the reason I wake up every morning with a smile on my face and shes the person I see when I turn to sleep.",
    image: "/characters/abhilakhi-smiling-nobg.png",
    background: "/scene/scene-loving-girl.jpg",
    bgType: "image"
  },
  {
    title: "My strong, beautiful, intelligent and loving girl.",
    text: "I love to see her studying and working hard. While always making sure to take out time for me. Mur Jaan, always remember...",
    image: "/characters/abhilakhi-studying-nobg.png",
    background: "/scene/scene-mech-engineer.jpg",
    bgType: "image"
  },
    {
    title: "I am always here for you.",
    text: "Through all thick and thin, I will always be here for you. I will always be your support system, your shoulder to cry on, your partner in crime and your best friend. I love you sooo much...",
    image: "/characters/hug-nobg.png",
    background: "/scene/scene-loving-girl.jpg",
    bgType: "image"
  },
];

function App() {
  const [loaded, setLoaded] = useState(true)
  const [showCharacter, setShowCharacter] = useState(false)
  const [canAdvance, setCanAdvance] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)

  useEffect(() => {
    SCENES.forEach((scene) => {
      const backgroundImage = new window.Image()
      backgroundImage.src = scene.background
    })
  }, [])

  useEffect(() => {
    if (!loaded) return;

    setCanAdvance(false);
    const timeoutId = setTimeout(() => {
      setShowCharacter(true);
      setCanAdvance(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [loaded, currentScene]);

  const handleNextScene = () => {
    if (!canAdvance) return;
    setCurrentScene((prev) => (prev + 1) % SCENES.length);
  }

  const activeScene = SCENES[currentScene];

  return (
    <>
      <div className="desktop-warning">
        Please phone r portrait mode t khuliba eitu ;)
      </div>

      <div className="mobile-app">
        {/* Waiting scene for video elements is disabled.
        {!loaded && (
          <div className="loader">
            <div className="spinner"></div>
            <p>please wait a moment my mam!</p>
          </div>
        )}
        */}

        {SCENES.map((scene, index) => (
          <img
            key={scene.background}
            src={scene.background}
            className={`bg-image ${loaded && activeScene.bgType === 'image' && currentScene === index ? 'visible' : 'hidden'}`}
            alt={`Scene background ${index}`}
          />
        ))}

        {/* Video scenes are disabled in the current app version.
        <video
          ref={videoRef}
          src="/scene/scene.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={`bg-video ${(loaded && activeScene.bgType === 'video') ? 'visible' : 'hidden'}`}
        />
        */}

        {loaded && (
          <div className="content">
            <h1>{activeScene.title}</h1>
            <p>{activeScene.text}</p>
          </div>
        )}

        {/* Render all character images to preload them in the DOM, but only show the active one */}
        {SCENES.map((scene, index) => (
          <img
            key={index}
            src={scene.image}
            alt={`Character ${index}`}
            className={`character alive-portrait ${showCharacter && currentScene === index ? 'visible' : 'hidden'}`}
          />
        ))}

        <button
          className={`next-scene-btn ${canAdvance ? 'visible' : 'hidden'}`}
          onClick={handleNextScene}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default App
