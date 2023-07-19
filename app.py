from flask import Flask, render_template, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base
import os
#Reflect the tables
engine = create_engine('sqlite:///Data/Accidents.sqlite')
Base = automap_base()
Base.prepare(engine, reflect = True)

#Save references to each table
Accident2017 = Base.classes.Accident_2017
Accident2018 = Base.classes.Accident_2018
Accident2019 = Base.classes.Accident_2019
Accident2020 = Base.classes.Accident_2020

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/v1.0/accidents/<int:year>")
def get_accidents(year):
    Session = sessionmaker(bind=engine)
    session = Session()

    if year == 2017:
        data = session.query(Accident2017).all()
    elif year == 2018:
        data = session.query(Accident2018).all()
    elif year == 2019:
        data = session.query(Accident2019).all()
    elif year == 2020:
        data = session.query(Accident2020).all()
    else:
        return jsonify({"error":"Invalid year"}), 400
    
    #Process the data and return as JSON
    results = []
    for item in data:
        results.append({
            "reference_number": item.reference_number,
            "num_vehicles": item.num_vehicles,
            "accident_date": item.accident_date,
            "time": item.time,
            "road_class": item.road_class,
            "road_surface": item.road_surface,
            "lighting_conditions": item.lighting_conditions,
            "weather_conditions": item.weather_conditions,
            "vehicle_type": item.vehicle_type,
            "casualty_class": item.casualty_class,
            "casualty_severity": item.casualty_severity
        })
    return jsonify(results)

# Serve the static GeoJSON files
@app.route("/geojson/<string:filename>")
def serve_geojson(filename):
    geojson_dir = os.path.join(app.root_path, "geojson")
    return send_from_directory(geojson_dir, filename)

if __name__ == "__main__":
    app.run(debug=True)
