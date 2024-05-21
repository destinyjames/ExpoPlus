from flask import Flask,request, jsonify, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from pymongo import MongoClient
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from bson import ObjectId, json_util
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from flask_mail import Mail
from flask_mail import Message



app = Flask(__name__)
# Configure your email and SMTP server details here
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'expopluscontact@gmail.com'
app.config['MAIL_PASSWORD'] = 'nlux kaed akqo zpia'
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')


# Initialize Flask-Mail
mail = Mail(app)
SECRET_KEY = os.getenv('SECRET_KEY')
CORS(app)
# MongoDB connection string
MONGO_URI = os.getenv('MONGO_URI')

# Set up the MongoDB client
client = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True )
# Database Collections
db = client['ExpoProjects']  
app.config["db"] = db



UserCollection = db['Users']
AllProjects = db['AllProjects']
HighlightedCollection = db['HighlightedProjects']
ComputerappsCollection = db['ComputerApplicationsProjects']
PreferencesCollection = db['Preferences']
FeedbackCollection = db['Feedback']
RatingsCollection = db['Ratings']




@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    email = data['email']
    username = data['username']  # Retrieve the username from the JSON
    otp = data['otp']

    # Verify if the email and username are in the database
    user = UserCollection.find_one({"email": email, "username": username})
    if user is None:
        return jsonify({'message': 'User not found with provided email and username.'}), 404

    # Store OTP with an expiration time
    otp_expiration = datetime.now() + timedelta(minutes=5)
    UserCollection.update_one(
        {'email': email, 'username': username}, 
        {'$set': {'otp': otp, 'otp_expires': otp_expiration}},
        upsert=True
    )

    # Send the email with the OTP
    msg = Message('Your OTP', sender='your_email@example.com', recipients=[email])
    msg.body = f'Your OTP is: {otp}'
    mail.send(msg)

    return jsonify({'message': 'OTP sent successfully.'}), 200

@app.route('/update-password', methods=['POST'])
def update_password():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')  # Get the username from the request
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')
    otp_string = data.get('otp')
    
    # Convert OTP from string to integer
    try:
        otp = int(otp_string)
    except ValueError:
        return jsonify({'message': 'OTP must be a numeric value.'}), 400
    # Check if the OTP matches for the given username and email
    user = UserCollection.find_one({'email': email, 'username': username, 'otp': otp})
    if not user:
        return jsonify({'message': 'Invalid OTP or username.'}), 400

    # Check if passwords match
    if new_password != confirm_password:
        return jsonify({'message': 'Passwords do not match.'}), 400

    # Hash the new password
    hashed_password = generate_password_hash(new_password)

    # Update the user's password in the database
    updated_count = UserCollection.update_one(
        {'email': email, 'username': username, 'otp': otp},  # Filter document with username
        {'$set': {'password': hashed_password}}  # Update document
    ).modified_count

    # Now unset the otp field
    UserCollection.update_one(
        {'email': email, 'username': username},
        {'$unset': {'otp': ""}}  # Update document to unset OTP
    )

    if updated_count == 0:
        return jsonify({'message': 'Password update failed.'}), 500

    return jsonify({'message': 'Password updated successfully.'}), 200



@app.route('/validate-user', methods=['POST'])
def validate_user():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    
    # Access the 'Users' collection
    
    # Check if there is a user with the given username and email
    user = UserCollection.find_one({'username': username, 'email': email})
    
    if user:
        return jsonify({'isValid': True, 'message': 'User is valid.'}), 200
    else:
        return jsonify({'isValid': False, 'message': 'User not found.'}), 404
    
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    email = data['email']
    try:
        provided_otp = int(data['otp'])  # Convert string to int and handle errors
    except ValueError:
        return jsonify({'message': 'OTP must be a numeric value.'}), 400

    # Check if the OTP matches and has not expired
    user = UserCollection.find_one({'email': email, 'otp': provided_otp, 'otp_expires': {'$gt': datetime.now()}})
    if user:
        return jsonify({'success': True}), 200
    else:
        return jsonify({'message': 'Invalid or expired OTP.'}), 401

@app.route('/api/maps')
def highlight_projects():
    try:
        username = request.args.get('username')

        if not username:
            return jsonify(error="No username provided"), 400

        # Fetch the document for the given username
        user_project = HighlightedCollection.find_one({'username': username})

        if not user_project:
            return jsonify(error="User not found"), 404

        # Extract the 'project_ids' from the document
        project_ids = user_project.get('project_ids', [])
        
        # Convert ObjectIds to strings if necessary
        project_ids = [str(pid) for pid in project_ids]

        # Return the project_ids as a JSON response
        return jsonify(project_ids)
    except Exception as e:
        # Handle the exception if something goes wrong, return a JSON error message
        return jsonify(error=str(e)), 500
    

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if user or email already exists
    if UserCollection.find_one({'username': username}):
        return jsonify({"message": "Username already exists"}), 409


    # Hash the user's password
    hashed_password = generate_password_hash(password)
    user_count = UserCollection.count_documents({})
    user_id = user_count + 1

    # Store the new user in the database with the hashed password
    UserCollection.insert_one({
        'user_id': user_id,
        'username': username,
        'email': email,
        'password': hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201



@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = UserCollection.find_one({'username': username})

    if not user:
        return make_response(jsonify({"message": "User not found"}), 401)

    if user and check_password_hash(user['password'], password):
        # Create JWT token
        token = jwt.encode({
            'sub': str(user['_id']),  # Convert MongoDB ObjectId to string
            'name': user['username'], 
            'iat': datetime.now(timezone.utc),
            'exp': datetime.now(timezone.utc) + timedelta(minutes=30),
        }, SECRET_KEY, algorithm='HS256')  # Include the algorithm parameter

        return jsonify({
            'token': token,
            'username': user['username']  # Include the username directly in the response
        }), 200
    else:
        return make_response(jsonify({"message": "Invalid username or password"}), 401)
    
@app.route('/allprojects', methods=['GET'])
def all_projects():
    try:
        # Get page and limit values from query parameters or set to default
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit

        # Fetch documents within the AllProjects collection with pagination
        projects_cursor = db['AllProjects'].find({}).skip(skip).limit(limit)

        # Convert the cursor to a list of dictionaries
        projects_list = list(projects_cursor)

        # remove the MongoDB ID
        for project in projects_list:
            project.pop('_id', None)

        # Return the projects list as a JSON response
        return jsonify(projects_list), 200
    except Exception as e:
        return jsonify(error=str(e)), 500
@app.route('/api/highlight', methods=['POST'])
def highlight_project():
    data = request.get_json()
    username = data.get('username')
    project_id = data.get('project_id')

    if not username or not project_id:
        return jsonify({"error": "Missing username or project ID"}), 400

    # Check if the user already exists in the database
    existing_user = HighlightedCollection.find_one({'username': username})

    if existing_user:
        # Check if the project is already highlighted by the user
        if project_id in existing_user['project_ids']:
            return jsonify({"message": "Project already highlighted by the user"}), 400

        # Add the project to the user's list of highlighted projects
        result = HighlightedCollection.update_one(
            {'username': username},
            {'$addToSet': {'project_ids': project_id}}
        )
    else:
        # If the user doesn't exist, create a new document for them
        result = HighlightedCollection.insert_one({
            'username': username,
            'project_ids': [project_id]
        })

    if result.modified_count > 0 or result.upserted_id:
        return jsonify({"message": "Project highlighted successfully"}), 200
    else:
        return jsonify({"message": "Failed to highlight the project"}), 500

@app.route('/search', methods=['GET'])
def search():
    search_term = request.args.get('q', '')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    skip = (page - 1) * limit

    try:
        query = {'$text': {'$search': search_term}} if not search_term.isdigit() else {'project_id': int(search_term)}
        total_count = AllProjects.count_documents(query)
        search_results = AllProjects.find(query).skip(skip).limit(limit)

        projects = [project for project in search_results]
        for project in projects:
            project.pop('_id', None)

        return jsonify({"projects": projects, "total": total_count}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    
    # User preferences
@app.route('/preferences', methods=['POST'])
def store_preferences():
    data = request.get_json()
    username = data.get('username')
    preferences = data.get('preferences')

    if not username or not preferences:
        return jsonify({"error": "Missing username or preferences"}), 400

    # Find the user by username to get the custom numeric user_id
    user = UserCollection.find_one({'username': username})

    if not user:
        return jsonify({"error": "User not found"}), 404

    user_id = user.get('user_id')

    if not user_id:
        return jsonify({"error": "User ID not found"}), 404

    # Use update_one with upsert=True to update if exists or insert if not
    result = PreferencesCollection.update_one(
        {'user_id': user_id},  # Query matches the document by user_id
        {'$set': {'preferences': preferences}},  # Update the preferences
        upsert=True  # Insert a new document, if one doesn't exist
    )

    if result.matched_count > 0:
        return jsonify({"message": "Preferences updated successfully"}), 200
    else:
        return jsonify({"message": "Preferences saved successfully"}), 201
    
    
@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    # Attempt to get JSON data from the request
    feedback_data = request.json

    # Check if the request contains JSON data
    if not feedback_data:
        return jsonify({"error": "Request body must be JSON"}), 400

    # Extract individual fields from the JSON data
    name = feedback_data.get('name')
    email = feedback_data.get('email')
    rating = feedback_data.get('rating')
    comments = feedback_data.get('comments')

    # Validate 'name' field: it should exist and be of type string
    if not name or not isinstance(name, str):
        return jsonify({"error": "Name is required and must be a string."}), 400

    # Validate 'rating' field: it should exist, be an integer, and within the range 1-5
    if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
        return jsonify({"error": "Rating must be an integer between 1 and 5."}), 400
    
    # Validate 'comments' field: it should exist and be of type string
    if not comments or not isinstance(comments, str):
        return jsonify({"error": "Comments are required and must be a string."}), 400    
    
        # Attempt to insert the validated feedback data into the database
    try:
        FeedbackCollection.insert_one({
            "name": name,
            "email": email,
            "rating": rating,
            "comments": comments
        })
        # Return a success message if the insertion is successful
        return jsonify({"message": "Feedback received successfully"}), 200
    except Exception as e:
        # Catch any database errors and return an error message
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/api/allprojects/<int:project_id>', methods=['GET'])
def get_project_title(project_id):
    project = AllProjects.find_one({"project_id": project_id})
    if project:
        return jsonify({"title": project["project_title"],"module": project["student_programme"]})
    
    
    else:
        return jsonify({"error": "Project not found"}), 404


@app.route('/api/remove-project/<string:user_id>/<int:project_id>', methods=['DELETE'])
def remove_project(user_id, project_id):
    try:
        # Authenticate the user and ensure they are authorized to perform this action

        result = HighlightedCollection.update_one(
            {"username": user_id},
            {"$pull": {"project_ids": project_id}}
        )

        if result.modified_count == 0:
            return jsonify({"error": "Project not found or user not correct"}), 404

        return jsonify({"message": "Project removed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    


@app.route('/api/ratings', methods=['POST'])

def update_rating():
    data = request.json
    username = data.get('username')  # You'll be passing the username
    project_id = data.get('project_id')
    rating = data.get('rating')
    
    try:
        # Look up the user_id based on the username
        user = UserCollection.find_one({'username': username})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        user_id = user.get('user_id')  # Now we have the user_id from the users collection
        
        # Check if the user already has a rating for this project
        user_rating_exists = RatingsCollection.find_one({'user_id': user_id, 'ratings.project_id': project_id})
        if user_rating_exists:
            # Update existing rating
            RatingsCollection.update_one(
                {'user_id': user_id, 'ratings.project_id': project_id},
                {'$set': {'ratings.$.rating': rating}}
            )
        else:
            # Add new rating if one doesn't exist
            RatingsCollection.update_one(
                {'user_id': user_id},
                {'$push': {'ratings': {'project_id': project_id, 'rating': rating}}},
                upsert=True  # This creates the user document if it doesn't exist
            )
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        # Use json_util.default from bson to properly serialize MongoDB objects for JSON
        return jsonify({'error': str(e), 'details': json_util.default(e)}), 500
    
@app.route('/api/get-user-ratings', methods=['GET'])
def get_user_ratings():
    username = request.args.get('username')
    
    try:
        # Look up the user_id based on the username
        user = UserCollection.find_one({'username': username})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        user_id = user.get('user_id')
        
        # Get the user's ratings
        user_ratings = RatingsCollection.find_one({'user_id': user_id})
        
        # If the user has no ratings, return an empty array
        if not user_ratings:
            return jsonify([]), 200

        # Return the ratings
        return jsonify(user_ratings.get('ratings', [])), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/projects', methods=['GET'])
def get_projects():
    try:
        # Get collection name from query parameter
        collection_name = request.args.get('collection', None)
        if not collection_name:
            return jsonify(error="Collection name is required."), 400
        
        
        

        # Get page and limit values from query parameters or set to default
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit

        # Fetch documents within the specified collection with pagination
        projects_cursor = db[collection_name].find({}).skip(skip).limit(limit)

        # Convert the cursor to a list of dictionaries
        projects_list = list(projects_cursor)

        # Remove the MongoDB ID
        for project in projects_list:
            project.pop('_id', None)

        # Return the projects list as a JSON response
        return jsonify(projects_list), 200
    except Exception as e:
        return jsonify(error=str(e)), 500
    
# fetching 2 modules from 2 different collections
@app.route('/projects2', methods=['GET'])
def get_projectss():
    try:
        # Get the collection names from the query parameters
        collection_name_1 = request.args.get('collection1', None)
        collection_name_2 = request.args.get('collection2', None)

        # Validate the collection names
        if not collection_name_1 or not collection_name_2:
            return jsonify(error="Both collection names are required."), 400

        # Get pagination parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit

        # Get documents from both collections
        projects_list_1 = list(db[collection_name_1].find({}).skip(skip).limit(limit))
        projects_list_2 = list(db[collection_name_2].find({}).skip(skip).limit(limit))

        # Concatenate both lists
        combined_projects = projects_list_1 + projects_list_2

        # Apply pagination to the combined list
       

        # Remove the MongoDB ID from each project document
        for project in combined_projects:
            project.pop('_id', None)

        # Return the paginated combined projects list as a JSON response
        return jsonify(combined_projects), 200
    except Exception as e:
        return jsonify(error=str(e)), 500
    

def preprocess_preference(preference):
    return re.sub(r'[\s\(\)]+', '_', preference)

@app.route('/recommend', methods=['GET'])
def recommend_projects():
    username = request.args.get('username')
    user = UserCollection.find_one({'username': username})
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_id = user.get('user_id')

    # Check the number of ratings by the user
    user_ratings = RatingsCollection.find_one({'user_id': user_id})
    if user_ratings is None or len(user_ratings.get('ratings', [])) < 5:
        # if theree is not enough ratings then use the default recommendations
        project_ids = get_default_recommendations(user_id)
        use_collaborative = False  # Collaborative model not used
    else:
        # If enough ratings then collaborative filtering will be added
        project_ids = get_collaborative_recommendations(user_id)
        use_collaborative = True  # Collaborative model used

    # Converts project_ids to integers if they are not stored as strings in MongoDB
    project_ids = [int(pid) for pid in project_ids]

    # Fetches project details from AllProjects collection
    projects_cursor = AllProjects.find({'project_id': {'$in': project_ids}})

    # Converts cursor to list of dictionaries
    projects = list(projects_cursor)

    # Creates a dictionary that maps project_id to project for fast lookup
    projects_dict = {project['project_id']: project for project in projects}

    # Reorder projects based on the order of project_ids
    ordered_projects = [projects_dict[pid] for pid in project_ids if pid in projects_dict]

    # Convert ObjectId to string for each project
    for project in ordered_projects:
        project['_id'] = str(project['_id'])

    # Used to return the projects as JSON in the correct order
    return jsonify({
        "projects": ordered_projects,
        "isCollaborative": use_collaborative
    })

def get_default_recommendations(user_id):
    # Retrieve the user's preferences from the database
    preferences = PreferencesCollection.find_one({'user_id': user_id})
    
    # If theres no preferences found for the user then an empty list is returned
    if not preferences:
        return []

    # Extracts and turns the user's preferred programs, technologies, and areas to lowercase
    preferred_programs = [prog.lower() for prog in preferences['preferences'].get('programs', [])]
    preferred_technologies = [tech.lower() for tech in preferences['preferences'].get('technologies', [])]
    preferred_areas = [area.lower() for area in preferences['preferences'].get('Areas', [])]

    # Retrieve all projects from the database
    all_projects = list(AllProjects.find())
    
    # Initialize a list to store recommended projects
    recommended_projects = []

    # Used to calculate scores and filter through the projects
    for project in all_projects:
        score = 0
        project_programs = project['student_programme'].lower()
        project_areas = [area.lower().strip() for area in project['project_area'].split(',')]
        project_technologies = [tech.lower().strip() for tech in project['project_technology'].split(',')]

        # Check if the project's program matches any of the user's preferred programs
        if project_programs in preferred_programs:
            score += 2
        
        # Check if any of the project's areas matches any of the user's preferred areas
        if any(area in project_areas for area in preferred_areas):
            score += 1
        
        # Same as aboev but for technologies
        if any(tech in project_technologies for tech in preferred_technologies):
            score += 1

        # Only take 2 or higher scores as recommended
        if score >= 2:
            recommended_projects.append((score, project['project_id']))
    
    # Sort recommended projects based on scores in descending order
    recommended_projects.sort(reverse=True, key=lambda x: x[0])

    # Extract only the project IDs from the sorted list
    return [project_id for _, project_id in recommended_projects]

# function to handle collaborative filtering recommendations
def get_collaborative_recommendations(user_id):
    # Fetch preferences from the database
    preferences = list(db.Preferences.find())

    # Initialize lists to store user ids and their combined preferences
    user_ids = []
    all_preferences = []

    # Scans over each user's preferences
    for user_pref in preferences:
        # Extract user ids
        user_ids.append(user_pref['user_id'])
        
        # Preprocesses each preference category and combines them
        programs = ' '.join(preprocess_preference(p) for p in user_pref['preferences']['programs'])
        technologies = ' '.join(preprocess_preference(t) for t in user_pref['preferences']['technologies'])
        areas = ' '.join(preprocess_preference(a) for a in user_pref['preferences']['Areas'])
        combined_prefs = ' '.join([programs, technologies, areas])
        all_preferences.append(combined_prefs)
    
    # Creates a DataFrame to store user ids and their combined preferences
    preferences_df = pd.DataFrame({
       'user_id': user_ids,
       'all_preferences': all_preferences
    })

    # Turn the combined preferences into a numerical format with 0s and 1s
    vectorizer = CountVectorizer(binary=True, token_pattern=r'(?u)\b[\w_]+\b') 
    X_binary = vectorizer.fit_transform(preferences_df['all_preferences'])

    # Make a table from the numerical data
    binary_df = pd.DataFrame(X_binary.toarray(), columns=vectorizer.get_feature_names_out(), index=preferences_df['user_id']) 

    # Calculate how similar the preferences are between all users
    cosine_sim = cosine_similarity(X_binary)
    cosine_sim_df = pd.DataFrame(cosine_sim, index=preferences_df['user_id'], columns=preferences_df['user_id'])

    # Identify users with similar preferences ie  cosine similarity
    similar_users_series = cosine_sim_df.loc[user_id]
    similar_users = similar_users_series.index[similar_users_series > 0].tolist()  # Ignore similarities of zero

    # Set up a place to keep track of weighted ratings for projects
    weighted_ratings = {}  

        # Iterate over similar users
    for similar_user in similar_users:
        # Fetch ratings of the similar user
        user_ratings = RatingsCollection.find_one({'user_id': similar_user})
        
        # Process ratings if available
        if user_ratings and 'ratings' in user_ratings:
            # Iterate over ratings
            for rating in user_ratings['ratings']:
                project_id = rating['project_id']
                project_rating = rating['rating']
                
                # Consider ratings >= 3
                if project_rating >= 3:
                    if project_id not in weighted_ratings:
                        weighted_ratings[project_id] = 0
                    # Weighted sum of ratings based on similarity
                    weighted_ratings[project_id] += project_rating * similar_users_series[similar_user]
    

        # Sorts projects based on weighted ratings
    recommended_projects = sorted(weighted_ratings.items(), key=lambda item: item[1], reverse=True)
    
    # Fetch ratings of the active user
    active_user_ratings = RatingsCollection.find_one({'user_id': user_id}, {'_id': 0, 'ratings': 1})
    active_user_rated_projects = set()
    if active_user_ratings:
        # Extract project ids rated by the active user
        active_user_rated_projects = {rating['project_id'] for rating in active_user_ratings['ratings']}
    
    # Filters out projects the active user has already rated
    final_recommendations = [project for project in recommended_projects if project[0] not in active_user_rated_projects]
    
    N = 40  # Number of recommendations you want to show
    
    # Selects top N recommended projects
    top_n_recommendations = final_recommendations[:N]

    return [project_id for project_id, _ in top_n_recommendations]

@app.route('/check-preferences', methods=['POST'])
def check_preferences():
    username = request.json.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = UserCollection.find_one({'username': username})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_id = user.get('user_id')  # Now we have the user_id from the users collection

    user_id = db.Preferences.find_one({'user_id': user_id})
    if user_id:
        return jsonify({'exists': True}), 200
    else:
        return jsonify({'exists': False}), 200
    


if __name__ == '__main__':
    app.run(debug=True, port=5000)

