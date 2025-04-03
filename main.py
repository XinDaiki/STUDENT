from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__, static_folder='.', static_url_path='')

# Mock database for deadlines and other information
DEADLINES = [
    {"title": "Midterm Week", "date": "2025-04-15", "type": "exam"},
    {"title": "Finals Week", "date": "2025-05-20", "type": "exam"},
    {"title": "Project Submission", "date": "2025-04-30", "type": "project"}
]

def get_upcoming_deadlines():
    today = datetime.now()
    upcoming = []
    for deadline in DEADLINES:
        deadline_date = datetime.strptime(deadline["date"], "%Y-%m-%d")
        if deadline_date > today:
            upcoming.append(f"{deadline['title']} on {deadline['date']}")
    return upcoming

def generate_response(message):
    message = message.lower()
    
    # Handle different types of queries
    if any(word in message for word in ['deadline', 'due', 'upcoming']):
        deadlines = get_upcoming_deadlines()
        if deadlines:
            return "Here are your upcoming deadlines:\n• " + "\n• ".join(deadlines)
        return "You have no upcoming deadlines!"
        
    elif 'exam' in message or 'test' in message:
        return "The next exam period is Finals Week starting May 20th, 2025"
        
    elif 'project' in message:
        return "Your next project submission is due on April 30th, 2025"
        
    elif any(word in message for word in ['hello', 'hi', 'hey']):
        return "Hello! I can help you with information about deadlines, exams, and projects. What would you like to know?"
    
    elif 'schedule' in message:
        return "Your class schedule is available in the Schedule Inquiry section. Would you like me to show you how to access it?"
    
    elif 'grade' in message:
        return "You can check your grades in the Student Performance section. Would you like me to guide you there?"
    
    else:
        return "I'm here to help! You can ask me about:\n• Upcoming deadlines\n• Exam schedules\n• Project due dates\n• Your class schedule\n• Grades"

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    response = generate_response(user_message)
    return jsonify({
        'response': response,
        'timestamp': datetime.now().strftime('%H:%M')
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
