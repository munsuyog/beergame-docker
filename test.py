from locust import HttpUser, task, between
import random
import json

class DemoBeerGameUser(HttpUser):
    wait_time = between(1, 5)  # Wait 1-5 seconds between tasks

    def on_start(self):
        self.demo_data = None
        self.create_demo_game()

    def create_demo_game(self):
        response = self.client.get("/demo")
        if response.status_code == 200:
            self.demo_data = response.json()
            print(f"Created demo game: {self.demo_data['team_name']}")
        else:
            print(f"Failed to create demo game: {response.text}")

    @task(3)
    def get_play_screen(self):
        if self.demo_data:
            response = self.client.get("/play_screen", params={
                "selected_game": self.demo_data['team_name'],
                "selected_station": "Manufacturer"
            })
            print(f"Get play screen: {response.status_code}")

    @task(2)
    def submit_turn(self):
        if self.demo_data:
            response = self.client.post("/submit", json={
                "DATA": {
                    "this_game": self.demo_data['team_name'],
                    "this_station": "Manufacturer",
                    "week": random.randint(1, 52),
                    "suppliers": {"Supplier": random.randint(1, 100)},
                    "customers": {"Customer": random.randint(1, 100)}
                }
            })
            print(f"Submit turn: {response.status_code}")

    @task(3)
    def get_station_status(self):
        if self.demo_data:
            response = self.client.get("/get_station_status", params={
                "game": self.demo_data['team_name'],
                "station": "Manufacturer"
            })
            print(f"Get station status: {response.status_code}")

    @task(2)
    def get_game_status(self):
        if self.demo_data:
            response = self.client.get("/get_game_status", params={
                "game": self.demo_data['team_name']
            })
            print(f"Get game status: {response.status_code}")

    @task(1)
    def create_new_demo_game(self):
        self.create_demo_game()