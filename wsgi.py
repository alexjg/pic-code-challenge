from whitenoise import WhiteNoise

from unichance.handlers import app

from os import path
PROJECT_ROOT = path.dirname(__file__)
app = WhiteNoise(app, root=path.join(PROJECT_ROOT, "build"))

