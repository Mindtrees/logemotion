import Demo from "../../components/Demo"
import EmotionAnalyzer from "../../components/Emotion-test/EmotionAnalyzer"
import ExamplePosts from "../../components/ExamplePosts"
import Features from "../../components/Features"
import Hero from "../../components/Hero"

const Home = () => (
  <div>
    <Hero />
    <Features />
    <Demo />
    <ExamplePosts />
    {/* <EmotionAnalyzer /> */}
  </div>
)

export default Home