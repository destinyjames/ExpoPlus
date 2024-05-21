# conftest.py
import pytest
from flaskapp.app import app as flask_app
from pymongo import MongoClient

@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    # Set up your app with testing configuration here
    flask_app.config['TESTING'] = True
    yield flask_app

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()

@pytest.fixture
def db(request):
    # Setup: Connect to the MongoDB database
    client = MongoClient("mongodb+srv://ExpoPlus:ExpoPlus2024@projects.aol6oa9.mongodb.net/?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)
    db = client['test_db']  # Use a separate database for testing
    yield db

@pytest.fixture
def actual_db(request):
    # Setup: Connect to the actual MongoDB database
    client = MongoClient("mongodb+srv://ExpoPlus:ExpoPlus2024@projects.aol6oa9.mongodb.net/?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)
    actual_db = client['Exprojects']  # Use the actual database
    yield actual_db
