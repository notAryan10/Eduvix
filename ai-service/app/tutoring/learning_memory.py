class LearningMemory:
    def __init__(self):
        pass

    def get_student_context(self, learning_profile):
        """
        Formats the student's learning profile into a concise context for the LLM.
        """
        weak_topics = [t["topic"] for t in learning_profile.get("weakTopics", [])[:3]]
        strong_topics = learning_profile.get("strongTopics", [])[:3]
        
        context = f"The student is at an {learning_profile.get('readingLevel', 'Beginner')} level. "
        context += f"They learn at a {learning_profile.get('learningSpeed', 'medium')} pace. "
        
        if weak_topics:
            context += f"They have recently struggled with: {', '.join(weak_topics)}. "
        
        if strong_topics:
            context += f"They are very good at: {', '.join(strong_topics)}. "
            
        return context

learning_memory = LearningMemory()
