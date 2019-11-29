import React from "react";
import { ICardModel } from "../../clients/clients";

interface ICardStatsWidgetProps {
    card: ICardModel;
}

export function CardStatsWidget(props: ICardStatsWidgetProps): JSX.Element {
    const c = props.card;

    return (
        <div className="card">
            <h4 className="card-header">
                {c.name}
            </h4>
            <div className="card-body">
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th colSpan={2}>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Health</th>
                            <td>{c.health}</td>
                        </tr>
                        <tr>
                            <th scope="row">Attack</th>
                            <td>{c.attack}</td>
                        </tr>
                        <tr>
                            <th scope="row">Defence</th>
                            <td>{c.defence}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <th scope="row">Up Attack</th>
                            <td>{c.upAttack}</td>
                        </tr>
                        <tr>
                            <th scope="row">Right Attack</th>
                            <td>{c.rightAttack}</td>
                        </tr>
                        <tr>
                            <th scope="row">Down Attack</th>
                            <td>{c.downAttack}</td>
                        </tr>
                        <tr>
                            <th scope="row">Left Attack</th>
                            <td>{c.leftAttack}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <th scope="row">Total Stats</th>
                            <td>{c.totalStats}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
