import json
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def hello_world():
    with open("courses.json", "r") as f:
        courses = json.load(f)

    return render_template("index.html", courses=courses)


if __name__ == "__main__":
    app.run(debug=True)
