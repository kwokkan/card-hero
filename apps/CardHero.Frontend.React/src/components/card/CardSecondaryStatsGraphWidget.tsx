import { ChartData, ChartOptions } from "chart.js";
import { Radar } from "react-chartjs-2";
import { ICardModel } from "../../clients/clients";

interface ICardSecondaryStatsGraphWidgetProps {
    card: ICardModel;
}

export function CardSecondaryStatsGraphWidget(props: ICardSecondaryStatsGraphWidgetProps): JSX.Element {
    const c = props.card;

    const data: ChartData<"radar"> = {
        labels: [
            "Up Attack",
            "Right Attack",
            "Down Attack",
            "Left Attack"
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
                    c.upAttack,
                    c.rightAttack,
                    c.downAttack,
                    c.leftAttack
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
