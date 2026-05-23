class TeachingStyleEngine:
    def __init__(self):
        self.styles = {
            "storytelling": "Teach this concept through a fun short story for children. Use characters and a narrative to explain the idea.",
            "visual": "Explain this concept using vivid descriptions and mental imagery. Describe how things look, move, and interact.",
            "step-by-step": "Break this concept down into small, logical steps. Explain each step clearly before moving to the next.",
            "conversational": "Explain this concept in a simple, friendly conversational style, as if you are a kind teacher talking to a student.",
            "hint-based": "Do not reveal the answer directly. Provide small hints step-by-step to lead the student to the answer."
        }

    def get_prompt_modifier(self, style):
        return self.styles.get(style, self.styles["conversational"])

teaching_style_engine = TeachingStyleEngine()
