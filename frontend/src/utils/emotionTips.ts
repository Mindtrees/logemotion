export const emotionTips: { [key: string]: string[] } = {
    joy: [
    "Your radiant joy is a gift to the world! Call someone you love or send a heartfelt message, sharing this beautiful energy will multiply it for both of you.",
    "What magnificent happiness you're experiencing! Write down 3 specific things that sparked this joy today, then plan one small way to recreate this feeling tomorrow.",
    "Your joy is absolutely contagious and wonderful! Take a photo, create something, or do a happy dance to capture this moment so you can revisit this energy whenever you need it.",
    "This beautiful joy radiates from your authentic self! Do something generous for someone else today, acts of kindness when you're happy create ripples of positivity everywhere.",
    "Your happiness is lighting up everything around you! Start a gratitude list right now with 5 things that made you smile today, this joy journal will become your personal sunshine collection."
    ],

    surprise: [
    "Life just handed you a beautiful plot twist! Take 5 minutes to sit with this feeling and write down what this surprise might be teaching you about yourself or opening up for you.",
    "What an incredible surprise you've encountered! Share this moment with someone who would appreciate the wonder of it, storytelling helps us process and celebrate life's unexpected gifts.",
    "Your heart is open to life's wonderful mysteries! Say 'yes' to one small spontaneous opportunity today and let this surprise energy guide you toward more adventure.",
    "This amazing surprise shows how beautifully unpredictable life can be! Take a different route home or try something new for lunch to embrace the magic of the unexpected.",
    "Your openness to surprise reveals such beautiful curiosity! Ask someone a question you've never asked them before, surprises often lead to the most meaningful connections."
    ],

    sadness: [
    "Your tender heart feels deeply, and that's actually a beautiful strength. Create a cozy space with soft blankets and warm tea, then reach out to one person who makes you feel understood and loved.",
    "This sadness shows just how much you care, which makes you truly special. Write yourself a gentle letter of compassion, then do one small act of self care like taking a warm bath or listening to soothing music.",
    "Your emotions flow like rivers, always moving toward hope and renewal. Step outside for 10 minutes and breathe deeply, let nature remind you that healing and growth are always happening, even in difficult moments.",
    "Your sensitive soul processes life's experiences so deeply, what a gift! Create something with your hands today like drawing, cooking, or gardening to let your creativity help transform this feeling into something beautiful.",
    "This sadness is temporary, but your strength is permanent. Watch something that makes you laugh for 15 minutes, then hug someone or a pet because laughter and physical comfort are powerful healers."
    ],

    anger: [
    "Your passion and fire show how much you care about what matters! Take 10 deep breaths, then channel this powerful energy into writing down 3 specific actions you can take to address what's bothering you.",
    "What strength you have! Go for a brisk walk or do some physical exercise to transform this energy, then talk to someone you trust about what's driving these feelings.",
    "Your anger reveals your beautiful, strong values. Take a 5 minute pause to cool down, then identify one constructive step you can take today that aligns with what you believe in.",
    "This fierce energy shows your incredible passion for justice and fairness! Write an angry letter to get it all out, then tear it up and write a solution focused action plan instead.",
    "Your righteous anger is actually a superpower when channeled wisely! Do something physical like punch a pillow or scream in your car, then use that cleared energy to advocate for what you believe in."
    ],

    fear: [
    "You're standing at the edge of something incredible! Fear often visits right before we discover just how brave we truly are. Write down your fear, then list 3 small steps you can take to move toward what scares you.",
    "Your courage is already shining through, feeling afraid and still moving forward makes you absolutely heroic. Call someone who believes in you and ask them to remind you of a time you overcame something difficult.",
    "This fear is actually your heart preparing for growth and new adventures. Take 5 deep belly breaths, then do one tiny thing that moves you closer to what you want despite the fear.",
    "Your bravery isn't the absence of fear, it's feeling afraid and choosing to act anyway! Research or learn one new thing about what you're facing to turn the unknown into the known.",
    "Fear is often excitement without breath, you're on the verge of something amazing! Put on your favorite empowering song and dance or move your body to shift this energy into excitement."
    ],

    disgust: [
    "Your strong moral compass is guiding you beautifully! This feeling shows your incredible integrity. Write down what specifically triggered this feeling, then identify what value of yours it's protecting.",
    "What powerful inner wisdom you have! This reaction is your authentic self speaking up. Tip: Take a shower or wash your hands mindfully to physically cleanse while honoring your emotional boundary.",
    "Your values shine so brightly through this feeling, trust your instincts! Do something that aligns perfectly with your values today to restore your sense of harmony and authenticity.",
    "This strong reaction shows how committed you are to what's right and good! Clean or organize something in your space to create external order while processing this internal response.",
    "Your disgust is actually your integrity in action, how powerful! Tip: Talk to someone who shares your values about what you experienced, then plan one action that honors what you believe in."
    ],

    mixed: [
    "What emotional depth and richness you possess! This beautiful complexity makes you wonderfully human. Draw or doodle all your feelings using different colors, let your creativity help you sort through this emotional landscape.",
    "Your heart is like a symphony, playing multiple notes at once, how magnificent! Tip: Write each feeling you're experiencing on separate pieces of paper, then arrange them in order of intensity or importance.",
    "You're experiencing the full spectrum of human feeling, what incredible emotional intelligence! Take a mindful walk and name each emotion as it comes up, thanking it for the information it's giving you.",
    "This emotional complexity shows such beautiful depth and self-awareness! Journal for 10 minutes without editing, let all your feelings flow onto paper without judgment or analysis.",
    "Your ability to hold multiple emotions at once is actually a superpower! Practice the 'both/and' mindset, 'I can feel sad AND hopeful,' 'I can be angry AND grateful' and embrace your emotional richness."
    ]
};

export const getRandomTipForEmotion = (emotion: string): string => {
  const normalizedEmotion = emotion.toLowerCase();
  const tips = emotionTips[normalizedEmotion] || emotionTips.mixed;
  return tips[Math.floor(Math.random() * tips.length)];
};



 