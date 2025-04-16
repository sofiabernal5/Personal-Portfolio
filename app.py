# app.py
from flask import Flask, render_template, send_from_directory, abort
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/download/<path:filename>')
def download_file(filename):
    try:
        return send_from_directory(
            os.path.join(app.root_path, 'static/files'),
            filename, as_attachment=True
        )
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)