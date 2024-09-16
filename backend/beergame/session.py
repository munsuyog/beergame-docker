# In session.py or wherever your Session class is defined

import uuid

class Session:
    def __init__(self, session_name, owner_id, num_teams):
        self.id = str(uuid.uuid4())
        self.name = session_name
        self.owner_id = owner_id
        self.num_teams = num_teams
        self.games = []
        self.players = set([owner_id])

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'num_teams': self.num_teams,
            'games': self.games,
            'players': list(self.players)
        }

    # Add any other methods you need for the Session class