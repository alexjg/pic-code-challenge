import sys
from os import path

PROJECT_ROOT = path.dirname(path.dirname(__file__))
sys.path.append(PROJECT_ROOT)

from unichance.handlers import app
app.run(debug=True)
