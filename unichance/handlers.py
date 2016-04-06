import flask
from flask_webpack import Webpack
import json

webpack = Webpack()

app = flask.Flask("unichance", static_folder="../build", static_url_path="/assets")
app.config.update(
    DEBUG=True,
    WEBPACK_MANIFEST_PATH="../build/manifest.json",
    WEBPACK_ASSETS_PATH="/assets/",
)
webpack.init_app(app)

@app.route("/")
def home():
    return flask.render_template(
        "base.html",
    )

@app.route("/acceptance_probability")
def acceptance_probability():
    return flask.Response(
        json.dumps({"value": 0.1234}),
        mimetype="application/json",
    )
