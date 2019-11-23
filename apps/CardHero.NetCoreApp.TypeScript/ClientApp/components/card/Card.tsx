import React, { PureComponent } from "react";
import { ICardModel } from "../../clients/clients";
import { CardService } from "../../services/CardService";

interface ICardProps {
    id: number;
}

interface ICardState {
    card?: ICardModel;
}

export class Card extends PureComponent<ICardProps, ICardState> {
    constructor(props: ICardProps) {
        super(props);

        this.state = {};
    }

    private async populateCard(id: number) {
        const cards = await CardService.getCards({
            ids: [
                id
            ]
        });

        const card = cards[0];

        this.setState({ card: card });
    }

    async componentDidMount() {
        const cardId: number = this.props.id;

        await this.populateCard(cardId);
    }

    async componentWillReceiveProps(nextProps: ICardProps) {
        const cardId: number = this.props.id;

        if (nextProps.id !== cardId) {
            await this.populateCard(cardId);
        }
    }

    render() {
        const card = this.state.card;

        if (!card) {
            return null;
        }

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    {card.name}
                                </h4>
                                <p className="card-text">
                                </p>
                                <table className="table table-striped">
                                    <thead className="thead-inverse">
                                        <tr>
                                            <th colSpan={2}>Stats</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Health</th>
                                            <td>{card.health}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Attack</th>
                                            <td>{card.attack}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Defence</th>
                                            <td>{card.defence}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Up Attack</th>
                                            <td>{card.upAttack}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Right Attack</th>
                                            <td>{card.rightAttack}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Down Attack</th>
                                            <td>{card.downAttack}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Left Attack</th>
                                            <td>{card.leftAttack}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Stats</th>
                                            <td>{card.totalStats}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* main stats */}
                    </div>
                    <div className="col-lg-4">
                        {/* attack stats */}
                    </div>
                </div>
            </div>
        );
    }
}
