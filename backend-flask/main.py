from flask import request, response
from motion import process_video

@app.route('/process/', methods=['POST'])
def process_video():
    if request.headers['Content-Type'] == 'application/json':
        return process_video()
    else:
        return response("json record not found in request", 415)