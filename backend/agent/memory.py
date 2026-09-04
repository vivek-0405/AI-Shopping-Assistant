class AgentMemory:
    def __init__(self):
        self.sessions = {}

    def get_history(self, session_id: str) -> list:
        return self.sessions.get(session_id, [])

    def add_interaction(self, session_id: str, query: str, response: dict):
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        self.sessions[session_id].append({
            "user": query,
            "agent": response
        })

agent_memory = AgentMemory()
