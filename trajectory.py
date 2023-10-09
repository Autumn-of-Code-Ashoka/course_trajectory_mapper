import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

with open("courses.json", "r") as f:
    COURSES = json.load(f)


@app.route("/", methods=["GET"])
def hello_world():
    return render_template("index.html")


@app.route("/courses", methods=["GET"])
def courses():
    query = request.args.get("q")
    if not query:
        return jsonify(COURSES)

    final_courses = []

    for course in COURSES:
        if any(
            [
                query.lower().strip() in i.lower()
                for i in course.values()
                if type(i) == str
            ]
        ):
            final_courses.append(course)

    return jsonify(final_courses)


if __name__ == "__main__":
    app.run(debug=True)
