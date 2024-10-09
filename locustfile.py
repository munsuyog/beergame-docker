import random
import json
from locust import HttpUser, task, between

class BeerGameUser(HttpUser):
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks

    def on_start(self):
        # This method is called when a user starts
        self.user_id = f"user_{random.randint(1000, 9999)}@example.com"
        self.session_id = None
        self.game_id = None
        self.current_week = 0

    @task(1)
    def create_session(self):
        session_name = f"Test Session {random.randint(1000, 9999)}"
        num_teams = random.randint(1, 5)
        
        with self.client.post("/create_session", json={
            "session_name": session_name,
            "num_teams": num_teams,
            "user_id": self.user_id
        }, catch_response=True) as response:
            if response.status_code == 201:
                self.session_id = response.json().get("session_id")
                print(f"Created session: {self.session_id}")
            else:
                response.failure(f"Failed to create session: {response.text}")

    @task(1)
    def play_demo_game(self):
        with self.client.get("/demo", catch_response=True) as response:
            if response.status_code == 200:
                self.game_id = response.json().get("id")
                print(f"Started demo game: {self.game_id}")
            else:
                response.failure(f"Failed to start demo game: {response.text}")

    @task(3)
    def join_game(self):
        if not self.session_id:
            return

        with self.client.post("/join_session", json={
            "session_id": self.session_id,
            "player_uid": self.user_id
        }, catch_response=True) as response:
            if response.status_code == 200:
                print(f"Joined session: {self.session_id}")
            else:
                response.failure(f"Failed to join session: {response.text}")

    @task(5)
    def place_order(self):
        if not self.game_id:
            return

        # Simulating order placement for the Manufacturer role
        order_data = {
            "DATA": {
                "this_game": self.game_id,
                "this_station": "Manufacturer",
                "week": self.current_week,
                "suppliers": {"MyWorkshop": random.randint(5, 20)},
                "customers": {"Distributor": random.randint(5, 20)}
            }
        }

        with self.client.post("/submit", json=order_data, catch_response=True) as response:
            if response.status_code == 200:
                print(f"Placed order for game {self.game_id}, week {self.current_week}")
                self.current_week += 1
            else:
                response.failure(f"Failed to place order: {response.text}")

    @task(2)
    def get_game_status(self):
        if not self.game_id:
            return

        with self.client.get(f"/get_game_status?game={self.game_id}", catch_response=True) as response:
            if response.status_code == 200:
                print(f"Got game status for game {self.game_id}")
            else:
                response.failure(f"Failed to get game status: {response.text}")