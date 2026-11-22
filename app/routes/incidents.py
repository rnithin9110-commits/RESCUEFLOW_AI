
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.incident import Incident
from app.services.priority_classifier import classify_priority
from app.services.team_matcher import recommend_team

incidents_bp = Blueprint("incidents", __name__, url_prefix="/api/incidents")


@incidents_bp.route("", methods=["POST"])
def create_incident():
    data = request.get_json() or {}

    title = data.get("title")
    description = data.get("description")
    incident_type = data.get("incident_type")

    if not title or not description or not incident_type:
        return jsonify({"error": "Required fields are missing"}), 400

    incident = Incident(
        title=title,
        description=description,
        incident_type=incident_type,
        priority=data.get("priority") or classify_priority(
            title, description, incident_type
        ),
        latitude=data.get("latitude"),
        longitude=data.get("longitude")
    )

    db.session.add(incident)
    db.session.commit()

    return jsonify({
        "message": "Incident created successfully",
        "id": incident.id,
        "latitude": incident.latitude,
        "longitude": incident.longitude
    }), 201


@incidents_bp.route("", methods=["GET"])
def get_incidents():
    incidents = Incident.query.order_by(Incident.id.desc()).all()

    return jsonify([
        {
            "id": incident.id,
            "title": incident.title,
            "description": incident.description,
            "incident_type": incident.incident_type,
            "priority": incident.priority,
            "status": incident.status,
            "latitude": incident.latitude,
            "longitude": incident.longitude
        }
        for incident in incidents
    ]), 200


@incidents_bp.route("/<int:incident_id>", methods=["PUT"])
def update_incident(incident_id):
    incident = db.session.get(Incident, incident_id)

    if incident is None:
        return jsonify({"error": "Incident not found"}), 404

    data = request.get_json() or {}
    new_status = data.get("status")

    allowed_statuses = ["Reported", "In Progress", "Resolved"]

    if new_status not in allowed_statuses:
        return jsonify({"error": "Invalid status"}), 400

    incident.status = new_status
    db.session.commit()

    return jsonify({
        "message": "Incident status updated successfully",
        "id": incident.id,
        "status": incident.status
    }), 200


@incidents_bp.route("/<int:incident_id>/recommend-team", methods=["GET"])
def get_team_recommendation(incident_id):
    incident = db.session.get(Incident, incident_id)

    if incident is None:
        return jsonify({"error": "Incident not found"}), 404

    team = recommend_team(incident.incident_type)

    if team is None:
        return jsonify({"message": "No matching team found"}), 200

    return jsonify({
        "incident_id": incident.id,
        "incident_title": incident.title,
        "recommended_team": team["name"],
        "matching_skills": team["skills"]
    }), 200
