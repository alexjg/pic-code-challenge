import flask
from flask_webpack import Webpack
import json
import marshmallow
from .model import Model
import pandas

from os import path
PROJECT_ROOT = path.dirname(path.dirname(__file__))
model = Model(pandas.read_csv(path.join(PROJECT_ROOT, "data", "extracted.csv")))


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
    try:
        s = AcceptanceRequestSerializer(strict=True)
        data = s.load(flask.request.args).data
    except marshmallow.ValidationError as ex:
        return flask.Response(
            json.dumps({"message": ex.messages}),
            mimetype="application/json",
            status=400
        )
    if data["sex"] == "male":
        result = model.predict("men", data["ethnicity"])
    else:
        result = model.predict("women", data["ethnicity"])
    return flask.Response(
        json.dumps({"value": result}),
        mimetype="application/json",
    )

class AcceptanceRequestSerializer(marshmallow.Schema):
    ethnicity = marshmallow.fields.String(
        required=True,
        validate=marshmallow.validate.OneOf(
            ["asian", "black", "mixed", "white", "other", "unknown"]
        )
    )
    sex = marshmallow.fields.String(
        required=True,
        validate=marshmallow.validate.OneOf(
            ["male", "female"]
        )
    )


