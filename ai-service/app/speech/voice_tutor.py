from app.tutoring.adaptive_tutor import adaptive_tutor

class VoiceTutor:
    def __init__(self):
        pass

    def process_voice_query(self, query, learning_profile, session_history=None):
        """
        Wrapper around adaptive tutor for voice-specific logic.
        """
        # We can add voice-specific instructions here (e.g., be more concise for speech)
        response = adaptive_tutor.generate_response(query, learning_profile, session_history)
        
        # Potentially shorten for TTS
        # response['answer'] = self.make_concise(response['answer'])
        
        return response

voice_tutor = VoiceTutor()
