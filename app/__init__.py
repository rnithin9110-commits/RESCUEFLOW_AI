from flask import Flask, render_template
from app.extensions import db


def create_app():
    app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)

    app.config["SECRET_KEY"] = "change-this-in-development"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///rescueflow.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    from app.models.incident import Incident
    from app.routes.incidents import incidents_bp

    app.register_blueprint(incidents_bp)

    with app.app_context():
        db.create_all()

    @app.get("/")
    def home():
        return render_template("dashboard/index.html")

    @app.get("/health/database")
    def database_health():
        total = db.session.query(Incident).count()
        return f"Database connected! Total simulated incidents: {total}"

    return app