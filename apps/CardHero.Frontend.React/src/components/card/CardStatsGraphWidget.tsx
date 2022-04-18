import { ChartData, ChartOptions } from "chart.js";
import { Radar } from "react-chartjs-2";
import { ICardModel } from "../../clients/clients";

interface ICardStatsGraphWidgetProps {
    card: ICardModel;
}

export function CardStatsGraphWidget(props: ICardStatsGraphWidgetProps): JSX.Element {
    const c = props.card;

    const data: ChartData<"radar"> = {
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

    const options: ChartOptions<"radar"> = {
        scales: {
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
