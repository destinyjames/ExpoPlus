import hashlib

class User:
    def __init__(self, username, password):
        self.username = username
        self.hashed_password = self.hash_password(password)

    def hash_password(self, password):
        # Hashing the password for security
        return password

    def to_dict(self):
        # Method to convert the user object into a dictionary suitable for MongoDB
        return {
            "username": self.username,
            "password": self.hashed_password
        }
