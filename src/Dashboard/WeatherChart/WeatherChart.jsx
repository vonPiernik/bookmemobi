import React from 'react';
import Chart from 'chart.js';

import './WeatherChart.css';


class WeatherChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            temperaturesList: [],
            datesList: [],
            windsList:[],
        }
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET'
        };
        fetch('http://api.openweathermap.org/data/2.5/forecast?id=7530858&appid=982d23f66ce1030110d8c21d4fd2371f&units=metric', requestOptions)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({ weather: data });
            this.drawChart();
        });
    }

    drawChart(){
        var ctx = document.getElementById("weatherChart");
        this.state.weather.list.forEach((el,index) => {
            if(index%8 !== 0){
                return false;
            } else {
                this.state.temperaturesList.push(el.main.temp);
                this.state.datesList.push(el.dt_txt.substring(0, 10));
                this.state.windsList.push(el.wind.speed)
            }
        });
        console.log(this.state.windsList);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.datesList,
                datasets: [{
                    label: 'Temp [°C]',
                    data: this.state.temperaturesList,
                    backgroundColor: '#fccb9082',
                },{
                    label: 'Wind speed [m/s]',
                    data: this.state.windsList,
                    backgroundColor: '#e91e6366',
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks:{
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    }

    render() {
        const { user } = this.props;
        return (
            <div className="weather-chart">
            <div className="">
                <canvas id="weatherChart"></canvas>
            </div>
            </div>
        );
    }
}
export { WeatherChart };
