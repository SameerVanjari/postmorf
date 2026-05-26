import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlmodel import Session, select
from app.core.db import engine
from app.core.security import get_hashed_password
from app.models import (
    User,
    SocialAccount,
    SourcePost,
    SourcePostChunk,
    GeneratedPost,
    PostArtifact,
    ArtifactVersion,
    GenerationFeedback,
)


def seed():
    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email == "admin@example.com")).first()
        if existing:
            print("Database already seeded. Skipping.")
            return

        print("Seeding database...")

        # --- 1. Users ---
        user = User(
            email="admin@example.com",
            name="Alice Johnson",
            avatar_url="https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
            hashed_password=get_hashed_password("password123"),
            is_superuser=True,
        )
        session.add(user)
        session.flush()

        user2 = User(
            email="bob@example.com",
            name="Bob Smith",
            avatar_url="https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
            hashed_password=get_hashed_password("password123"),
            is_superuser=False,
        )
        session.add(user2)
        session.flush()

        # --- 2. Social Accounts ---
        twitter_account = SocialAccount(
            user_id=user.id,
            platform="twitter",
            platform_user_id="123456789",
            username="alice_dev",
            display_name="Alice Johnson (Developer)",
            profile_image="https://pbs.twimg.com/profile_images/123/abc.jpg",
            access_token="mock_access_token_twitter",
            refresh_token="mock_refresh_token_twitter",
            last_synced_at=None,
        )
        session.add(twitter_account)
        session.flush()

        # --- 3. Source Post (single tweet) ---
        source_post = SourcePost(
            social_account_id=twitter_account.id,
            platform_post_id="tweet_001",
            post_type="single",
            content="Just shipped a major refactor of our authentication system. Reduced complexity by 40% and improved response times by 25%. Clean code is happy code!",
            author_username="alice_dev",
            source_url="https://twitter.com/alice_dev/status/1234567890",
            posted_at="2025-05-20T10:00:00Z",
            post_metadata={
                "likes": 342,
                "retweets": 89,
                "replies": 45,
                "impressions": 15000,
            },
            raw_payload={"api_version": "2", "includes": {"media": []}},
        )
        session.add(source_post)
        session.flush()

        # --- 4. Source Post Chunks (a thread) ---
        thread_post = SourcePost(
            social_account_id=twitter_account.id,
            platform_post_id="thread_001",
            post_type="thread",
            content="Thread: Lessons learned from scaling our microservices architecture over the last 2 years.",
            author_username="alice_dev",
            source_url="https://twitter.com/alice_dev/status/thread_001",
            posted_at="2025-05-18T08:00:00Z",
            post_metadata={
                "likes": 1200,
                "retweets": 450,
                "replies": 120,
                "impressions": 80000,
            },
            raw_payload={},
        )
        session.add(thread_post)
        session.flush()

        chunks = [
            SourcePostChunk(
                source_post_id=thread_post.id,
                platform_chunk_id="thread_001_1",
                content="Thread: Lessons learned from scaling our microservices architecture over the last 2 years.",
                sequence_number=1,
            ),
            SourcePostChunk(
                source_post_id=thread_post.id,
                platform_chunk_id="thread_001_2",
                content="We started with a monolith. It worked for the first year. Then came the pain: long CI times, coordination nightmares, and scaling bottlenecks.",
                sequence_number=2,
            ),
            SourcePostChunk(
                source_post_id=thread_post.id,
                platform_chunk_id="thread_001_3",
                content="Key takeaway #1: Start with clear bounded contexts. Draw your service boundaries around business capabilities, not technical layers.",
                sequence_number=3,
            ),
            SourcePostChunk(
                source_post_id=thread_post.id,
                platform_chunk_id="thread_001_4",
                content="Key takeaway #2: Invest in observability early. Distributed tracing, centralized logging, and good dashboards save you when things go wrong at 2 AM.",
                sequence_number=4,
            ),
            SourcePostChunk(
                source_post_id=thread_post.id,
                platform_chunk_id="thread_001_5",
                content="Key takeaway #3: Event-driven communication > synchronous REST chains. Kafka saved our sanity for cross-service workflows.",
                sequence_number=5,
            ),
        ]
        for chunk in chunks:
            session.add(chunk)
        session.flush()

        # --- 5. Generated Posts (AI LinkedIn content) ---
        gen_post_1 = GeneratedPost(
            source_post_id=source_post.id,
            generation_prompt="Turn this tweet into a professional LinkedIn post about code quality",
            tone="professional",
            content_type="linkedin_post",
            generated_content="""I'm thrilled to share that we've just completed a major refactor of our authentication system! 🎉

After months of incremental improvements, we've successfully:
✨ Reduced code complexity by 40%
⚡ Improved response times by 25%
🔒 Strengthened our security posture without sacrificing performance

This is a testament to the team's dedication to clean code principles. We proved that taking the time to refactor isn't just about making code "prettier"—it directly translates to measurable business value.

What's your experience with large-scale refactors? I'd love to hear your stories in the comments!

#CleanCode #SoftwareEngineering #TechLeadership #DevOps""",
            model_name="gpt-4",
            generation_metadata={
                "temperature": 0.7,
                "tokens_used": 285,
                "model_version": "gpt-4-0613",
            },
        )
        session.add(gen_post_1)
        session.flush()

        gen_post_2 = GeneratedPost(
            source_post_id=thread_post.id,
            generation_prompt="Turn this Twitter thread into a LinkedIn article about microservices lessons",
            tone="storytelling",
            content_type="linkedin_article",
            generated_content="""2 Years of Microservices: What I Wish I Knew Before Starting

Two years ago, my team embarked on a journey to break apart our monolith. Here's what we learned the hard way—so you don't have to.

**Start with Boundaries, Not Technology**

The biggest mistake teams make is reaching for Kubernetes before understanding their domain. We learned that service boundaries should mirror business capabilities, not technical layers. Ask yourself: "If this service fails, what business function is affected?"

**Invest in Observability from Day One**

When you have 20+ services, you can't SSH into boxes anymore. We learned this painfully during a 3 AM incident where a cascading failure took down our entire platform. Distributed tracing with OpenTelemetry, centralized logging, and real-time dashboards aren't luxuries—they're necessities.

**Embrace Event-Driven Architecture**

Our early architecture relied heavily on synchronous REST calls between services. This created tight coupling and fragile chains. Moving to an event-driven model with Apache Kafka transformed how we think about service communication. Services became truly independent, and new features became easier to add without fear of breaking things.

**The Bottom Line**

Microservices aren't a silver bullet, but when done right, they enable teams to move faster and scale better. The key is respecting the complexity they introduce and investing in the foundations early.

Would you like to learn more about any of these topics? Drop a comment below!

#Microservices #SoftwareArchitecture #TechLeadership #Scalability""",
            model_name="gpt-4",
            generation_metadata={
                "temperature": 0.8,
                "tokens_used": 420,
                "model_version": "gpt-4-0613",
            },
        )
        session.add(gen_post_2)
        session.flush()

        gen_post_3 = GeneratedPost(
            source_post_id=source_post.id,
            generation_prompt="Turn this tweet into an educational LinkedIn post about refactoring",
            tone="educational",
            content_type="linkedin_post",
            generated_content="""How do you measure the success of a refactor? 📊

I recently led a refactor of our authentication system, and here's the framework I used to measure success:

**Before the refactor:**
• 12 interconnected modules
• 45-minute CI pipeline
• 30% of code had no test coverage
• Average bug fix time: 4 hours

**After the refactor:**
• 5 clean modules with clear boundaries
• 15-minute CI pipeline
• 95% test coverage
• Average bug fix time: 45 minutes

The key metric that matters most? Developer velocity. If your refactor doesn't make your team faster, you're doing it wrong.

Here's my 3-step framework for any refactor:
1. Measure current state (BLUF: Bottom Line Up Front)
2. Define clear success criteria
3. Ship incrementally, not in a big bang

What metrics do you use to measure code quality improvements?

#Refactoring #CodeQuality #SoftwareEngineering #BestPractices""",
            model_name="gpt-3.5-turbo",
            generation_metadata={
                "temperature": 0.7,
                "tokens_used": 310,
                "model_version": "gpt-3.5-turbo-0613",
            },
        )
        session.add(gen_post_3)
        session.flush()

        # --- 6. Post Artifacts ---
        artifact_1 = PostArtifact(
            user_id=user.id,
            generated_post_id=gen_post_1.id,
            title="Authentication System Refactor - LinkedIn Post",
            final_content="""Proud to share a major milestone: our authentication system refactor is complete!

After months of careful planning and execution, we achieved:
• 40% reduction in code complexity
• 25% improvement in response times
• Strengthened security across the board

This project reinforced my belief that investing in code quality isn't just technical debt repayment—it's a business strategy. Clean code = faster delivery = happier customers.

#SoftwareEngineering #Tech #CleanCode #Engineering""",
            status="published",
            is_favorite=True,
        )
        session.add(artifact_1)
        session.flush()

        artifact_2 = PostArtifact(
            user_id=user.id,
            generated_post_id=gen_post_2.id,
            title="Microservices Lessons - LinkedIn Article (Draft)",
            final_content="""2 Years of Microservices: What I Wish I Knew Before Starting

Two years ago, my team embarked on a journey to break apart our monolith. Here's what we learned the hard way—so you don't have to.

**Start with Boundaries, Not Technology**
Service boundaries should mirror business capabilities, not technical layers.

**Invest in Observability from Day One**
Distributed tracing, centralized logging, and real-time dashboards aren't luxuries—they're necessities.

**Embrace Event-Driven Architecture**
Moving to an event-driven model with Apache Kafka transformed our service communication.

Would you like to learn more? Drop a comment below!""",
            status="draft",
            is_favorite=False,
        )
        session.add(artifact_2)
        session.flush()

        # --- 7. Artifact Versions ---
        version_1 = ArtifactVersion(
            artifact_id=artifact_1.id,
            content="""Proud to share a major milestone: our authentication system refactor is complete!

After months of careful planning and execution, we achieved:
• 40% reduction in code complexity
• 25% improvement in response times
• Strengthened security across the board

#SoftwareEngineering #Tech #CleanCode #Engineering""",
            version_number=1,
        )
        session.add(version_1)

        version_2 = ArtifactVersion(
            artifact_id=artifact_1.id,
            content="""Proud to share a major milestone: our authentication system refactor is complete!

After months of careful planning and execution, we achieved:
• 40% reduction in code complexity
• 25% improvement in response times
• Strengthened security across the board

This project reinforced my belief that investing in code quality isn't just technical debt repayment—it's a business strategy. Clean code = faster delivery = happier customers.

#SoftwareEngineering #Tech #CleanCode #Engineering""",
            version_number=2,
        )
        session.add(version_2)

        version_3 = ArtifactVersion(
            artifact_id=artifact_2.id,
            content="""2 Years of Microservices: What I Wish I Knew Before Starting

Two years ago, my team embarked on a journey to break apart our monolith. Here's what we learned the hard way.

**Start with Boundaries, Not Technology**
**Invest in Observability from Day One**
**Embrace Event-Driven Architecture**""",
            version_number=1,
        )
        session.add(version_3)

        # --- 8. Generation Feedback ---
        feedback_1 = GenerationFeedback(
            generated_post_id=gen_post_1.id,
            rating=5,
            feedback_text="Perfect tone and structure. Used it as-is with minor edits.",
        )
        session.add(feedback_1)

        feedback_2 = GenerationFeedback(
            generated_post_id=gen_post_2.id,
            rating=4,
            feedback_text="Great content but the article is quite long. Consider breaking into multiple posts.",
        )
        session.add(feedback_2)

        session.commit()
        print("Database seeded successfully!")
        print(f"\n  Created:")
        print(f"  - 2 Users")
        print(f"  - 1 Social Account (Twitter/X)")
        print(f"  - 2 Source Posts (1 single tweet, 1 thread with 5 chunks)")
        print(f"  - 3 Generated Posts (LinkedIn content)")
        print(f"  - 2 Post Artifacts (1 published, 1 draft)")
        print(f"  - 3 Artifact Versions")
        print(f"  - 2 Generation Feedbacks")
        print(f"\n  Login credentials: admin@example.com / password123")


if __name__ == "__main__":
    seed()