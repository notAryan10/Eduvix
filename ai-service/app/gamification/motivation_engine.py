import random

class MotivationEngine:
    def __init__(self):
        self.messages = [
            "You're doing amazing! Keep going!",
            "I'm so proud of how much you've learned today.",
            "Wow! You're becoming a real expert!",
            "Even when things are tough, you never give up. That's a superpower!",
            "You just earned more XP! You're leveling up fast!",
            "Let's master one more topic before we take a break!",
            "Your brain is like a muscle, and today you gave it a great workout!"
        ]

    def get_motivational_quote(self, student_name="Explorer"):
        return random.choice(self.messages)

motivation_engine = MotivationEngine()
