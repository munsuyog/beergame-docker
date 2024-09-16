# firebase_config.py
import firebase_admin
from firebase_admin import credentials, firestore, storage
from firebase_admin import auth

def initialize_firebase():
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'beergame-10edc.appspot.com'  # Replace with your actual storage bucket
    })
    return firebase_admin.get_app()

app = initialize_firebase()
db = firestore.client()
bucket = storage.bucket()

def verify_id_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        # Fetch user's role from Firestore
        user_doc = db.collection('users').document(uid).get()
        if user_doc.exists:
            role = user_doc.to_dict().get('role', 'player')
        else:
            role = 'player'
        return uid, role
    except:
        return None
    
def get_storage_bucket():
    return bucket