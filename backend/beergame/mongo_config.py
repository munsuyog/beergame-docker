import os
from pymongo import MongoClient

# MongoDB configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client["beergame"]  # Replace "beergame" with your database name if different

# Collections
games_collection = db["games"]
sessions_collection = db["sessions"]