import os
import sys


ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")

# Allow importing backend modules when this file is used as the WSGI entrypoint.
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from api.server import app  # noqa: E402


if __name__ == "__main__":
    app.run(port=5000, debug=True)