import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'joshidarshit2002@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Darshit, I am reaching out to you because...',

    oldPortfolio: 'https://www.legacy.me.toinfinite.dev',
    upworkProfile: 'https://www.upwork.com/freelancers/~018df6b96968e88ced',

    meetingLinks: {
        '15min': 'https://cal.com/darshit.joshi/15min',
        '30min': 'https://cal.com/darshit.joshi/30min',
    },
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/WhoJoshi69' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/darshitjoshi2002' },
    { name: 'instagram', url: 'https://www.instagram.com/dar_shit_joshi' },
];

export const MY_STACK = {
    backend: [
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'FastAPI',
            icon: '/logo/fastapi.svg',
        },
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    frontend: [
        {
            name: 'Javascript',
            icon: '/logo/js.png',
        },
        {
            name: 'Typescript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    AI: [
        {
            name: 'Prompt Engineering',
            icon: '/logo/prompt.svg',
        },
        {
            name: 'Lang Chain',
            icon: '/logo/langchain.svg',
        },
        {
            name: 'Hugging Face',
            icon: '/logo/hugging.svg',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'AI call assistant',
        slug: 'smart-call-assistant',
        year: 2025,
        description: `An AI-powered voice assistant built for home sales in Florida, designed to handle inbound calls and guide prospects through a human-like conversation to book community visits. Powered by Twilio for telephony, Bedrock-hosted LLMs for dialogue, and ElevenLabs for ultra-realistic voice output. Integrated with OpenSearch for knowledge retrieval and Google Calendar for appointment booking.<br/><br/>

Key Features:<br/>
<ul>
  <li>📞 AI Voice Assistant: Handles inbound calls with natural, conversational tone</li>
  <li>🗣️ Realistic TTS/STT: ElevenLabs for expressive speech and AWS Transcribe for accurate recognition</li>
  <li>🧠 Smart Dialogue Control: LangGraph-powered workflows for guided, dynamic conversations</li>
  <li>📅 Calendar Booking: Real-time event creation with Google Calendar and SMS confirmations</li>
  <li>🏘️ Multi-Community Support: Pulls structured info from different home communities using RAG</li>
  <li>📊 Observability: Integrated with Langfuse for prompt tracking, metrics, and debugging</li>
</ul><br/>

Technical Highlights:
<ul>
  <li>Used Amazon Bedrock-hosted LLM for consistent and cost-effective language generation</li>
  <li>Leveraged Twilio Programmable Voice for call routing and audio streaming</li>
  <li>Built Python backend to manage conversation flow, STT/TTS, and calendar events</li>
  <li>Integrated OpenSearch as a vector-based knowledge base for real-time context grounding</li>
  <li>Employed LangGraph for multi-turn state machine control and fallback handling</li>
  <li>Used PipeCat for real-time audio stream handling between Twilio and ElevenLabs</li>
</ul>
`,
        role: `
        Full-Stack AI Engineer <br/>
Led the full lifecycle of voice assistant development and deployment:
<ul>
  <li>✅ Backend: Developed a Python server for managing voice inputs, LLM prompts, and event creation</li>
  <li>📞 Voice Pipeline: Integrated Twilio, ElevenLabs TTS, and AWS Transcribe for fluid call experience</li>
  <li>🧠 LLM Integration: Used Amazon Bedrock with LangGraph and Langfuse to control conversation logic</li>
  <li>🔍 RAG System: Connected to OpenSearch vector DB for real-time community info retrieval</li>
  <li>📅 Calendar Integration: Synced appointment bookings directly with Google Calendar + SMS confirmation</li>
  <li>🚀 Deployment: Hosted services using AWS infrastructure with observability and error tracking</li>
</ul>

      `,
        techStack: [
            'Python',
            'Twilio',
            'Amazon Bedrock',
            'ElevenLabs TTS',
            'AWS Transcribe',
            'LangGraph',
            'Langfuse',
            'PipeCat',
            'OpenSearch',
            'Google Calendar API',
        ],
        thumbnail: '/projects/long/ai-smart-call-long.png',
        longThumbnail: '/projects/long/ai-smart-call-long.png',
        images: [
            '/projects/images/ai-call.png',
            '/projects/images/ai-call-2.png',
        ],
    },
    {
        title: 'DosePack',
        slug: 'dosepack',
        techStack: [
            'FastAPI',
            'Celery',
            'Redis',
            'PostgreSQL',
            'Docker',
            'Kubernetes',
            'Jenkins',
            'Api Integration',
        ],
        thumbnail: '/projects/long/dosepack.png',
        longThumbnail: '/projects/long/dosepack.png',
        images: ['/projects/images/dosepack.png'],
        liveUrl: 'https://dosepacker.com/',
        year: 2023,
        description: `An automated backend system built for DosePack to streamline pharmacy prescription filling, labeling, and packaging processes. Designed for high availability and scalability within a Kubernetes-managed infrastructure. <br/><br/>

Key Features:<br/>
<ul>
  <li>💊 Prescription Intake: Automated processing of incoming prescriptions from multiple sources</li>
  <li>🔁 Task Queuing: Reliable job execution pipeline using Celery for background processing</li>
  <li>🧾 Label Generation: Dynamic PDF label generation with medication and dosage info</li>
  <li>📦 Packaging Integration: API interfaces for communicating with robotic packaging hardware</li>
  <li>📈 Monitoring: Integrated logging and job tracking for real-time system observability</li>
</ul><br/>

Technical Highlights:
<ul>
  <li>Developed scalable FastAPI services with modular architecture</li>
  <li>Set up Celery workers with Redis broker to handle asynchronous tasks like parsing, validation, and label generation</li>
  <li>Containerized services with Docker and deployed on Kubernetes with health checks and auto-scaling</li>
  <li>Configured CI/CD pipelines using Jenkins for testing, building, and deploying services</li>
  <li>Implemented secure API communication between services and external hardware endpoints</li>
</ul>
`,
        role: `Backend Engineer <br/>
Led backend architecture and automation workflows:
<ul>
  <li>✅ API Development: Built FastAPI endpoints for prescription intake, status tracking, and label generation</li>
  <li>🔄 Task Orchestration: Designed and managed Celery workflows for job scheduling and execution</li>
  <li>📦 Infrastructure: Containerized backend services with Docker and deployed them using Kubernetes</li>
  <li>🛠️ CI/CD: Set up Jenkins pipelines for automated builds, tests, and deployments</li>
  <li>🔒 Integration: Developed secure communication protocols with pharmacy hardware units</li>
  <li>📊 Observability: Integrated logging, tracing, and retry mechanisms for reliable operations</li>
</ul>`,
    },
    {
        title: 'Zen Space',
        slug: 'zen-space',
        techStack: ['Next.js', 'Prisma', 'Tailwind CSS'],
        thumbnail: '/projects/long/zen-space.png',
        longThumbnail: '/projects/long/zen-space.png',
        images: [
            '/projects/images/zen-space-1.png',
            '/projects/images/zen-space-2.png',
        ],
        sourceCode: 'https://github.com/WhoJoshi69/zen.space',
        liveUrl: 'https://zenspace-five.vercel.app/',
        year: 2025,
        description: `A wellness-focused productivity web app where users can create their own calming space, manage tasks with to-do lists, use the Pomodoro technique, and listen to ambient sounds like rain, ASMR, and meditation music to enhance focus. <br/><br/>

Key Features:<br/>
<ul>
  <li>📝 To-Do List: Minimal and intuitive task manager with priority tagging</li>
  <li>⏱️ Pomodoro Timer: Customizable focus/break intervals with session tracking</li>
  <li>🎧 Ambient Sound Player: Users can mix ambient sounds like rain, ocean, forest, ASMR, and soft music</li>
  <li>🧘 Personalized Space: Users can select themes, backgrounds, and toggle features</li>
  <li>💾 Persistent Storage: Local storage or user-authenticated cloud save for preferences and tasks</li>
</ul><br/>

Technical Highlights:
<ul>
  <li>Implemented audio mixer with layered ambient sounds and volume control</li>
  <li>Built modular components using React and Tailwind for a clean, relaxing UI</li>
  <li>Used Zustand for state management to sync Pomodoro, task list, and audio controls</li>
  <li>Added theme switching and animations for personalized experiences</li>
  <li>Integrated service workers for offline support</li>
</ul>
`,
        role: `
Full-Stack Developer <br/>
Led the development and experience design of the platform:
<ul>
  <li>✅ Frontend: Developed UI components in Next with Tailwind CSS</li>
  <li>🎵 Audio Engine: Created a custom ambient sound player with multi-track mixing</li>
  <li>⏱️ Productivity Tools: Implemented Pomodoro logic and responsive to-do lists with drag-and-drop</li>
  <li>🧘 UX Design: Designed calm and focused UI/UX with theme customization</li>
  <li>🗂️ State Persistence: Used Zustand and browser storage for seamless user experience</li>
  <li>🚀 Deployment: Deployed on Vercel with PWA capabilities for installable app-like behavior</li>
</ul>
`,
    },
    {
        title: 'Movie Recommendation',
        slug: 'movie-recommendation',
        techStack: [
            'React.js',
            'Redux',
            'Tailwind CSS',
            'Framer Motion',
            'Node.js',
            'Pupeteer',
            'TMDB API',
            'Axios',
        ],
        thumbnail: '/projects/long/movie-r.png',
        longThumbnail: '/projects/long/movie-r.png',
        images: [
            '/projects/images/movie-r-1.png',
            '/projects/images/movie-r-2.png',
            '/projects/images/movie-r-3.png',
            '/projects/images/movie-r-4.png',
        ],
        sourceCode:
            'https://github.com/WhoJoshi69/whojoshi-movie-recommendation',
        liveUrl: 'https://whojoshi-recommendation.vercel.app/',
        year: 2025,
        description: `An AI-powered movie and TV show recommendation platform that personalizes suggestions using generative AI. Integrated with TMDB for rich metadata, trailers, and posters. Users can discover, get recommendations, and stream content directly on the server. <br/><br/>

Key Features:<br/>
<ul>
  <li>🎬 Smart Recommendations: AI-generated suggestions based on user mood, genre, or previous choices</li>
  <li>📺 Dual Support: Browse both Movies and TV Shows with detailed overviews, ratings, and cast info</li>
  <li>🔍 TMDB Integration: Real-time search and discovery powered by The Movie Database API</li>
  <li>📼 Built-in Streaming: Server-hosted player to stream selected titles</li>
  <li>🧠 Generative AI Chat: Users can chat with an AI to get tailored watchlists or ask for hidden gems</li>
</ul><br/>

Technical Highlights:
<ul>
  <li>Implemented OpenAI/Groq-backed generative AI to provide conversational recommendations</li>
  <li>Integrated TMDB APIs for fetching movie data, trailers, and search autocomplete</li>
  <li>Used React with shadcn UI components for a clean, responsive interface</li>
  <li>Created a full-featured media player with support for server-hosted video streaming</li>
  <li>Built custom recommendation engine to blend AI results with TMDB trending data</li>
</ul>

`,
        role: `
Full-Stack Developer <br/>
Architected the entire experience from frontend to AI integration:
<ul>
  <li>✅ Frontend: Built the React interface using Tailwind CSS and shadcn for consistent design</li>
  <li>🎥 Media Player: Integrated custom video player with seek, subtitles, and fullscreen support</li>
  <li>🧠 AI Layer: Connected a generative AI model to interpret user queries and recommend titles</li>
  <li>🔗 API Integration: Fetched and synced metadata from TMDB with caching for speed</li>
  <li>🗂️ Backend: Managed content streaming and media storage on server</li>
  <li>🚀 Deployment: Deployed app and streaming server with optimized video delivery and CDN support</li>
</ul>
`,
    },
    {
        title: 'Youtube Subscription Manager',
        slug: 'youtube-subscription-manager',
        techStack: [
            'React.js',
            'Node.js',
            'Supabase',
            'Axios',
            'Tailwind CSS',
            'Framer Motion',
        ],
        thumbnail: '/projects/long/yt.png',
        longThumbnail: '/projects/long/yt.png',
        images: [
            '/projects/images/yt-0.png',
            '/projects/images/yt-1.png',
            '/projects/images/yt-2.png',
            '/projects/images/yt-3.png',
            '/projects/images/yt-4.png',
            '/projects/images/yt-5.png',
            '/projects/images/yt-6.png',
            '/projects/images/yt-7.png',
        ],
        sourceCode:
            'https://github.com/WhoJoshi69/Youtube-subscription-manager',
        liveUrl: 'https://youtube-subscription-manager.vercel.app',
        year: 2025,
        description: `A personalized YouTube subscription management platform that helps users organize, track, and interact with their favorite channels more efficiently. Built with React and powered by Supabase for real-time data sync and user authentication. <br/><br/>

Key Features:<br/>
<ul>
  <li>🔍 Channel Search: Search and subscribe to any YouTube channel using the YouTube Data API</li>
  <li>📺 Video Feed: View latest videos from your subscribed channels in a grid layout</li>
  <li>✅ Watched Tracker: Mark videos as watched to hide them from view and reduce clutter</li>
  <li>🗂️ Filter & Sort: Organize feed by newest, oldest, most popular, or channel name</li>
  <li>🔐 Auth & Sync: Supabase authentication and real-time sync of user subscriptions</li>
</ul><br/>

Technical Highlights:
<ul>
  <li>Used YouTube Data API to fetch channel and video metadata dynamically</li>
  <li>Implemented Supabase for authentication, database, and real-time updates</li>
  <li>Built UI using React and Tailwind with shadcn for clean, modern components</li>
  <li>Designed scalable schema to store subscriptions, watched status, and preferences per user</li>
  <li>Added sorting, filtering, and pagination for optimal performance and UX</li>
</ul>
`,
        role: `Full-Stack Developer <br/>
Handled the complete product flow from backend schema to frontend UI:
<ul>
  <li>✅ Frontend: Developed the app using React, Tailwind, and shadcn for seamless UX</li>
  <li>📡 API Integration: Connected YouTube Data API for channel/video retrieval and metadata display</li>
  <li>🗃️ Database Design: Structured Supabase tables for subscriptions and watched history</li>
  <li>🔐 Auth: Implemented Supabase Auth for user login, session management, and access control</li>
  <li>♻️ Real-Time Sync: Used Supabase's real-time features to reflect updates across sessions instantly</li>
  <li>🚀 Deployment: Deployed the app on Vercel with environment-secured API tokens and Supabase keys</li>
</ul>`,
    },
    {
        title: 'WhoJoshi Stable Diffusion',
        slug: 'whojoshi-stable-diffusion',
        liveUrl: 'https://stable-diffusion-l99s.onrender.com/',
        year: 2023,
        description: `A generative art platform built for WhoJoshi using Stable Diffusion models to create stylized AI artwork based on user prompts. Integrated with Hugging Face-hosted models and LoRA fine-tunings for high customization. <br/><br/>

Key Features:<br/>
<ul>
  <li>🎨 Prompt-to-Image Generator: Users can generate AI art using custom text prompts</li>
  <li>🔧 LoRA Switching: Dynamic application of different LoRA fine-tuned models for varied styles</li>
  <li>🧠 Hugging Face Integration: Hosted and called inference endpoints securely</li>
  <li>📱 Responsive Design: Optimized interface for mobile and desktop users</li>
  <li>⚡ Fast Generation Feedback: Asynchronous task queue to handle image generation efficiently</li>
</ul><br/>

Technical Highlights:
<ul>
  <li>Integrated Hugging Face Inference API with token-based authorization</li>
  <li>Built Python backend to manage prompt processing, LoRA selection, and image output</li>
  <li>Designed frontend with React and Tailwind for a smooth UX</li>
  <li>Implemented asynchronous queue system (using Celery + Redis or similar) to manage inference load</li>
  <li>Added local image gallery with download and share options</li>
</ul>
      `,
        role: `
        Full-Stack Developer <br/>
Owned end-to-end development and model integration:
<ul>
  <li>✅ Backend: Created a Python-based server to handle Stable Diffusion prompt processing and LoRA selection</li>
  <li>🎨 Frontend: Built the UI in React with Tailwind CSS, optimized for art previews</li>
  <li>🧠 Model Ops: Integrated multiple LoRA models via Hugging Face endpoints</li>
  <li>🔁 Async Workflow: Set up task queue system for smooth async generation (Celery/Redis)</li>
  <li>🚀 Deployment: Deployed backend on AWS EC2 and frontend on Vercel</li>
  <li>📂 File Handling: Managed image output storage and delivery via secure download links</li>
</ul>
      `,
        techStack: [
            'React.js',
            'Python',
            'Hugging Face',
            'Civit AI LoRA',
            'Tailwind CSS',
            'Vercel',
        ],
        thumbnail: '/projects/long/stable-diffusion.png',
        longThumbnail: '/projects/long/stable-diffusion.png',
        images: ['/projects/images/stable-diffusion.png'],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Software Engineer (Backend)',
        company: 'Dosepack',
        duration: 'Dec 2022 - Mar 2025',
    },
    {
        title: 'Software Engineer (Generative AI)',
        company: 'Armakuni',
        duration: 'April 2025 - Present',
    },
];
