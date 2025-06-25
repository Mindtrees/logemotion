import ExamplePosts from "./components/ExamplePosts"
import Demo from "./components/Demo"
import Features from "./components/Features"
import Hero from "./components/Hero"
import EmotionAnalyzer from "./components/Emotion-test/EmotionAnalyzer"

const Home = () => (
  <div>
    <Hero />
    <Features />
    <Demo />
    <ExamplePosts />
    <EmotionAnalyzer />
  </div>
)

export default Home