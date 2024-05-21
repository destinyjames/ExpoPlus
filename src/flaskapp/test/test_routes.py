import pytest
from flask import json
import sys
from werkzeug.security import generate_password_hash
from datetime import datetime, timezone, timedelta

# Correct usage without type annotations
current_utc_time = datetime.now(timezone.utc)
expiration_time = current_utc_time + timedelta(minutes=30)
sys.path.append('..')

from flaskapp.app import app as flask_app
@pytest.fixture
def client():
    # Set the app to testing mode
    flask_app.config['TESTING'] = True

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client

#def test_register(client):
 #   """Test registration endpoint"""
 ##   response = client.post('/register', json={
 #       'username': 'testuser1',
  #      'password': 'testpass'
  #  })
 #   assert response.status_code == 201
  #  assert json.loads(response.data)['message'] == "User registered successfully"
  
def test_registration_existing_user(client):
    """Test registration with an existing user"""
    response = client.post('/register', json={
        'username': 'testuser',
        'password': 'newtestpassword'
    })
    assert response.status_code == 409
    
def test_user_login_success(client, db):
    hashed_password = generate_password_hash('testpass')
    db['Users'].insert_one({
        'username': 'testuser1',
        'password': hashed_password
    })
    response = client.post('/login', json={
        'username': 'testuser',
        'password': 'testpass'
    })
    assert response.status_code == 200
    assert 'token' in response.json
    
def test_user_login_failure(client, db):
    response = client.post('/login', json={
        'username': 'nonexistentuser',
        'password': 'testpassword'
    })
    assert response.status_code == 401
    


def test_allprojects_pagination(client, db):
    # Insert some test data into the fake database
    for i in range(30):
        db['AllProjects'].insert_one({'project_id': i, 'title': f'Project {i}'})

    # Send a GET request to /allprojects with pagination parameters
    response = client.get('/allprojects?page=1&limit=10')
    
    # Check if the response status code is 200
    assert response.status_code == 200
    
    # Check if the response contains the expected number of projects and pagination
    data = json.loads(response.data)
    assert len(data) == 10

def test_get_project_title(client, db):
    # Insert a test project into the fake database
    db['AllProjects'].insert_one({'project_id': 1, 'title': 'Test Project'})

    # Send a GET request to /api/allprojects/1 to get the title of project with ID 1
    response = client.get('/api/allprojects/1')
    
    # Check if the response status code is 200
    assert response.status_code == 200
    
    # Check if the response contains the expected project title
    data = json.loads(response.data)
    assert 'title' in data

def test_check_preferences(client, db):
    # Insert a test user's preferences into the fake database
    db['Preferences'].insert_one({'user_id': 1, 'preferences': {'programs': ['Program A', 'Program B']}})

    # Send a POST request to /check-preferences with a username
    response = client.post('/check-preferences', json={'username': 'testuser'})

    # Check if the response status code is 200
    assert response.status_code == 200

    # Check if the response indicates that preferences exist
    data = json.loads(response.data)
    assert data['exists'] is False
    
def test_recommend_projects(client, db):
    # Insert test projects into the fake database
    db['AllProjects'].insert_many([
        {'project_id': 1, 'title': 'Project 1', 'description': 'This is project 1'},
        {'project_id': 2, 'title': 'Project 2', 'description': 'This is project 2'},
        {'project_id': 3, 'title': 'Another Project', 'description': 'This is another project'}
    ])

    # Send a GET request to /recommend with a username
    response = client.get('/recommend?username=testuser')

    # Check if the response status code is 200
    assert response.status_code == 200

    # Check if the response contains recommended projects
    data = json.loads(response.data)
    assert len(data['projects']) == 0