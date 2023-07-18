from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base


#Reflect the tables
engine = create_engine('sqlite:////Users/nguyengiang/project-3/data/Accidents.sqlite')
Base = automap_base()
Base.prepare(engine, reflect = True)

#Save references to each table
Accidents2017 = Base.classes.Accidents_2017
Accidents2018 = Base.classes.Accidents_2018
Accidents2019 = Base.classes.Accidents_2019
Accidents2020 = Base.classes.Accidents_2020

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/v1.0/accidents/<int:year>")
def get_accidents(year):
    Session = sessionmaker(bind=engine)
    session = Session()

    if year == 2017:
        data = session.query(Accidents2017).all()
    elif year == 2018:
        data = session.query(Accidents2018).all()
    elif year == 2019:
        data = session.query(Accidents2019).all()
    elif year == 2020:
        data = session.query(Accidents2020).all()
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

if __name__ == "__main__":
    app.run(debug=True)
