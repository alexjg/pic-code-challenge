import flask
from flask_webpack import Webpack

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

