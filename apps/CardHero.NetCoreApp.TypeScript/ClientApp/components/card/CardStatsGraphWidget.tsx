import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import { ICardModel } from "../../clients/clients";

interface ICardStatsGraphWidgetProps {
    card: ICardModel;
}

export class CardStatsGraphWidget extends Component<ICardStatsGraphWidgetProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const c = this.props.card;

        const data: Chart.ChartData = {
            labels: [
                "Health",
                "Attack",
                "Defense"
            ],
            datasets: [
                {
                    label: "Stats",
                    backgroundColor: "rgba(0, 0, 200, 0.3)",
                    borderColor: "rgba(0, 0, 200, 0.5)",
                    pointBorderColor: "rgba(0, 0, 0, 0)",
                    pointHoverBackgroundColor: "rgba(0, 0, 200, 0.5)",
                    pointHoverBorderColor: "rgba(0, 0, 200, 0.5)",
                    data: [
                        c.health,
                        c.attack,
                        c.defence
                    ]
                }
            ]
        };

        const options: Chart.ChartOptions = {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }
        };

        return (
            <div className="card">
                <h4 className="card-header">
                    {c.name}
                </h4>
                <div className="card-body">
                    <Radar data={data} options={options} />
                </div>
            </div>
        );
    }
}
