HIGH_KEYWORDS = [
    "trapped",
    "unconscious",
    "explosion",
    "collapsed",
    "critical",
    "severe",
    "fire"
]

MEDIUM_KEYWORDS = [
    "smoke",
    "accident",
    "flood",
    "injured",
    "blocked road"
]


def classify_priority(title, description, incident_type):
    text = f"{title} {description} {incident_type}".lower()

    for word in HIGH_KEYWORDS:
        if word in text:
            return "High"

    for word in MEDIUM_KEYWORDS:
        if word in text:
            return "Medium"

    return "Low"