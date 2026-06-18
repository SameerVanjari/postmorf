import type { Account, Platform, Post, SourcePost } from "@/lib/types";

export const platforms: Platform[] = [
  { id: "twitter", name: "Twitter / X", icon: "twitter" },
  { id: "linkedin", name: "LinkedIn", icon: "linkedin" },
  { id: "facebook", name: "Facebook", icon: "facebook" },
  { id: "instagram", name: "Instagram", icon: "instagram" },
];

export const accounts: Account[] = [
  {
    id: "acc-1",
    platformId: "twitter",
    handle: "@postmorph",
    avatar: "https://github.com/shadcn.png",
    displayName: "PostMorph Official",
  },
  {
    id: "acc-2",
    platformId: "linkedin",
    handle: "postmorph-ai",
    avatar: "https://github.com/shadcn.png",
    displayName: "PostMorph AI",
  },
  {
    id: "acc-3",
    platformId: "facebook",
    handle: "postmorph.page",
    avatar: "https://github.com/shadcn.png",
    displayName: "PostMorph",
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    title: "How AI Is Transforming Content Creation in 2026",
    content:
      "## The New Era of Content\n\nArtificial intelligence has fundamentally changed how we approach content creation. From automated drafting to intelligent scheduling, the landscape is evolving rapidly.\n\n### Key Trends\n\n1. **AI-Assisted Writing**: Tools like PostMorph help creators produce high-quality drafts in seconds\n2. **Multi-Platform Publishing**: One piece of content, optimized for every platform\n3. **Data-Driven Optimization**: AI analyzes performance and suggests improvements\n\n### What This Means for Creators\n\nThe barrier to producing professional content has never been lower. With the right tools, a single creator can maintain a presence across multiple platforms without sacrificing quality.",
    excerpt:
      "AI is reshaping how we create and distribute content across platforms. Here's what you need to know.",
    status: "published",
    platforms: ["twitter", "linkedin"],
    createdAt: "2026-05-28T10:30:00Z",
    updatedAt: "2026-05-29T14:00:00Z",
    scheduledAt: null,
    sourcePostId: "src-1",
    tags: ["AI", "content-creation", "productivity"],
  },
  {
    id: "post-2",
    title: "Building a Consistent Brand Voice Across Social Platforms",
    content:
      "## Why Brand Voice Matters\n\nYour brand voice is the personality of your business. It's how customers recognize you, trust you, and connect with you.\n\n### The Challenge\n\nEach platform has its own culture and expectations:\n\n- **LinkedIn**: Professional, thought-leadership tone\n- **Twitter/X**: Conversational, punchy, timely\n- **Instagram**: Visual-first, aspirational\n- **Facebook**: Community-focused, personal\n\n### How PostMorph Helps\n\nPostMorph's AI engine adapts your core message to each platform's unique style while maintaining your authentic voice.",
    excerpt:
      "Maintaining a consistent brand voice across platforms is challenging. Here's how to do it right.",
    status: "draft",
    platforms: ["linkedin", "twitter", "facebook"],
    createdAt: "2026-05-30T09:00:00Z",
    updatedAt: "2026-05-30T16:30:00Z",
    scheduledAt: null,
    sourcePostId: null,
    tags: ["branding", "social-media", "strategy"],
  },
  {
    id: "post-3",
    title: "The Ultimate Guide to Social Media Scheduling",
    content:
      "## Why Schedule?\n\nConsistency is key to social media success. Scheduling your posts ensures you maintain a regular presence even during busy periods.\n\n### Best Practices\n\n1. Analyze your audience's peak activity times\n2. Space posts evenly throughout the week\n3. Mix content types (text, images, video)\n4. Leave room for timely/trending content\n\n### Using PostMorph's Scheduler\n\nPostMorph makes scheduling effortless with its intelligent calendar and multi-platform support.",
    excerpt:
      "Master the art of social media scheduling with our comprehensive guide.",
    status: "scheduled",
    platforms: ["twitter", "linkedin", "facebook"],
    createdAt: "2026-05-25T11:00:00Z",
    updatedAt: "2026-05-31T08:00:00Z",
    scheduledAt: "2026-06-03T14:00:00Z",
    sourcePostId: null,
    tags: ["scheduling", "social-media", "guide"],
  },
  {
    id: "post-4",
    title: "Why We Built PostMorph: A Letter from the Founders",
    content:
      "## The Problem\n\nContent creation is broken. Creators spend more time managing tools and switching between platforms than actually creating.\n\n### Our Solution\n\nPostMorph brings everything together:\n\n- **One Workspace**: Draft, edit, and manage all your content\n- **AI-Powered**: Generate ideas, drafts, and platform-optimized versions\n- **Seamless Publishing**: Schedule and publish to multiple platforms at once\n\n### Our Promise\n\nWe're building the content workspace we always wished existed.",
    excerpt:
      "The story behind PostMorph and our mission to simplify content creation.",
    status: "published",
    platforms: ["linkedin", "twitter"],
    createdAt: "2026-05-15T12:00:00Z",
    updatedAt: "2026-05-15T12:00:00Z",
    scheduledAt: null,
    sourcePostId: null,
    tags: ["company", "announcement", "mission"],
  },
  {
    id: "post-5",
    title: "Top 10 Content Strategy Tips for 2026",
    content:
      "## Stay Ahead of the Curve\n\nContent strategy evolves fast. Here are the top tips for staying relevant in 2026.\n\n### The List\n\n1. Embrace AI as a creative partner\n2. Focus on video-first content\n3. Build community, not just followers\n4. Repurpose long-form into short-form\n5. Use data to inform creative decisions\n6. Prioritize authenticity over polish\n7. Experiment with new formats\n8. Cross-post strategically\n9. Engage with your audience daily\n10. Measure what matters\n\nStart implementing these today with PostMorph.",
    excerpt: "The top content strategy tips to keep you ahead in 2026.",
    status: "crafting",
    platforms: ["twitter", "linkedin", "instagram"],
    createdAt: "2026-05-31T07:00:00Z",
    updatedAt: "2026-05-31T07:00:00Z",
    scheduledAt: null,
    sourcePostId: "src-2",
    tags: ["strategy", "tips", "2026"],
  },
  {
    id: "post-6",
    title: "From Zero to 10K: Growing Your Professional Brand",
    content:
      "## The Journey\n\nBuilding a professional brand takes time, but with the right strategy, you can accelerate your growth significantly.\n\n### Phase 1: Foundation\n\n- Define your niche and expertise\n- Optimize your profiles across platforms\n- Create a content calendar\n\n### Phase 2: Growth\n\n- Engage with industry leaders\n- Share original insights regularly\n- Leverage AI tools for consistency\n\n### Phase 3: Scale\n\n- Build systems and workflows\n- Delegate where possible\n- Focus on high-impact activities",
    excerpt:
      "A practical guide to growing your professional brand from scratch.",
    status: "draft",
    platforms: ["linkedin"],
    createdAt: "2026-05-29T15:00:00Z",
    updatedAt: "2026-05-29T15:00:00Z",
    scheduledAt: null,
    sourcePostId: null,
    tags: ["growth", "personal-brand", "linkedin"],
  },
  {
    id: "post-7",
    title: "How to Write Engaging LinkedIn Posts That Get 100K+ Views",
    content:
      "## The Formula\n\nViral LinkedIn posts follow predictable patterns. Here's how to replicate them.\n\n### The Structure\n\n1. **Hook**: Start with a bold statement or question\n2. **Story**: Share a personal experience or insight\n3. **Lesson**: Distill the key takeaway\n4. **CTA**: Encourage engagement with a question\n\n### Key Elements\n\n- Use short paragraphs (1-2 sentences)\n- Include line breaks for readability\n- Add emojis sparingly for visual breaks\n- Tag relevant people or companies\n\nPostMorph's AI can help you craft posts using this exact formula.",
    excerpt:
      "The writing formula behind LinkedIn posts that generate massive engagement.",
    status: "published",
    platforms: ["linkedin"],
    createdAt: "2026-05-20T09:00:00Z",
    updatedAt: "2026-05-20T09:00:00Z",
    scheduledAt: null,
    sourcePostId: null,
    tags: ["linkedin", "writing", "engagement"],
  },
];

export const sourcePosts: SourcePost[] = [
  {
    id: "src-1",
    url: "https://techcrunch.com/2026/05/ai-content-creation-tools",
    title: "AI Content Creation Tools Reshape the Creator Economy",
    content:
      "The creator economy is experiencing a seismic shift as AI-powered content tools become mainstream...",
    platform: "web",
    importedAt: "2026-05-28T10:00:00Z",
  },
  {
    id: "src-2",
    url: "https://medium.com/@creator/content-strategy-2026",
    title: "Content Strategy Trends for 2026: What Creators Need to Know",
    content:
      "As we move further into 2026, content strategy continues to evolve at a rapid pace...",
    platform: "web",
    importedAt: "2026-05-31T06:30:00Z",
  },
  {
    id: "src-3",
    url: "https://newsletter.creator-economy.com/issue-42",
    title: "Issue #42: The State of AI-Assisted Content",
    content:
      "This week we dive deep into how AI is changing the content landscape from drafting to distribution...",
    platform: "substack",
    importedAt: "2026-05-27T14:00:00Z",
  },
];
