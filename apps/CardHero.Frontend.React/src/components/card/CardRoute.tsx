import { useParams } from "react-router-dom";
import { Card } from "./Card";

export function CardRoute(): JSX.Element | null {
    const params = useParams();
    const id = params.id as unknown as number;

    return (
        <Card
            id={id}
        />
    );
}
