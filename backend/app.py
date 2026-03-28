import os

from whitenoise import WhiteNoise

from api.server import app


BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BACKEND_DIR, ".."))
FRONTEND_BUILD_CANDIDATES = [
    os.path.join(PROJECT_ROOT, "frontend", "dist"),
    os.path.join(PROJECT_ROOT, "frontend", "build"),
]
FRONTEND_BUILD_DIR = next(
    (
        candidate
        for candidate in FRONTEND_BUILD_CANDIDATES
        if os.path.isfile(os.path.join(candidate, "index.html"))
    ),
    None,
)

if FRONTEND_BUILD_DIR:
    app.wsgi_app = WhiteNoise(app.wsgi_app, root=FRONTEND_BUILD_DIR, prefix="")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
