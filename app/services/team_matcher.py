RESCUE_TEAMS = [
    {
        "id": 1,
        "name": "Fire Rescue Team",
        "skills": ["Fire", "Rescue", "First Aid"]
    },
    {
        "id": 2,
        "name": "Medical Team",
        "skills": ["Medical", "First Aid", "Injury"]
    },
    {
        "id": 3,
        "name": "Flood Rescue Team",
        "skills": ["Flood", "Water Rescue", "Rescue"]
    }
]
def recommend_team(incident_type):
    for team in RESCUE_TEAMS:
        if incident_type in team["skills"]:
            return team

    return None