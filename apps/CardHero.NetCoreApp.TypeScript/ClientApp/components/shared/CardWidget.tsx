import React from "react";
import { Rarity } from "../../clients/clients";
import CardModel from "../../models/CardModel";
import Icon from "../../styles/index";

interface ICardWidgetProps {
    card: CardModel;
}

export default function CardWidget(props: ICardWidgetProps) {
    const c = props.card;

    return (
        <div className={'card collection-card card-rarity_' + Rarity[c.rarity].toLowerCase()}>
            <div className="card-body">
                <h1 className="text-center" title="Up attack">{c.upAttack}</h1>
                <h1 className="float-right" title="Right attack">{c.rightAttack}</h1>
                <h1 title="Left attack">{c.leftAttack}</h1>
                <h1 className="text-center" title="Down attack">{c.downAttack}</h1>
            </div>

            <div className="card-footer">
                <h2 className={'text-center card-rarity-symbols text-rarity_' + Rarity[c.rarity].toLowerCase()} title={Rarity[c.rarity]}>
                    {Array(c.rarity).fill(0).map((_, i) =>
                        <Icon key={i} icon="star" />
                    )}
                </h2>
                <h3 className="text-center" title={c.name}>{c.name}</h3>
            </div>
        </div>
    );
}