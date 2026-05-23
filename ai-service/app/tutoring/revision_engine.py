from datetime import datetime, timedelta

class RevisionEngine:
    def __init__(self):
        pass

    def generate_plan(self, learning_profile):
        """
        Creates a personalized revision plan based on weak topics and spaced repetition.
        """
        weak_topics = learning_profile.get("weakTopics", [])
        strong_topics = learning_profile.get("strongTopics", [])
        
        # Sort weak topics by score (more mistakes = higher priority)
        sorted_weak = sorted(weak_topics, key=lambda x: x.get("score", 0), reverse=True)
        
        plan = []
        
        # Priority 1: High Mistake Topics (immediate revision)
        for topic_data in sorted_weak[:3]:
            plan.append({
                "topic": topic_data["topic"],
                "priority": "high",
                "reason": f"You've had some trouble with this recently ({topic_data['score']} misses)."
            })
            
        # Priority 2: Medium Priority (Spaced Repetition)
        for topic_data in sorted_weak[3:6]:
             plan.append({
                "topic": topic_data["topic"],
                "priority": "medium",
                "reason": "Time for a quick review to keep it fresh!"
            })
             
        # Priority 3: Keep Strong Topics Sharp
        if strong_topics:
            plan.append({
                "topic": strong_topics[0],
                "priority": "low",
                "reason": "You're great at this! Let's do a quick victory lap."
            })
            
        return {
            "userId": learning_profile.get("userId"),
            "topics": plan,
            "scheduledDate": (datetime.now() + timedelta(days=1)).isoformat(),
            "generatedAt": datetime.now().isoformat()
        }

revision_engine = RevisionEngine()
