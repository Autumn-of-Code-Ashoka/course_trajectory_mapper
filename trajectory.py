from flask import Flask, render_template
app = Flask(__name__)
@app.route('/')
def hello_world():
    courses={'Calculus Enabler':['MAT-1000','4','yes']}
    return render_template('index.html', courses=courses)