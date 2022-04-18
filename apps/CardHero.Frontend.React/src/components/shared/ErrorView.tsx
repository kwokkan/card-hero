import { ErrorInfo } from "react";
import { Rarity } from "../../clients/clients";
import { Icon } from "../../styles/index";

interface IErrorViewProps {
    error: Error;
    errorInfo?: ErrorInfo;
    currentPage?: string;
}

export function ErrorView(props: IErrorViewProps) {
    const e = props.error;
    const ei = props.errorInfo;
    const cp = props.currentPage || 'N/A';

    const newIssueUrl = new URL(Constants.NewIssueUrl);
    newIssueUrl.searchParams.append('title', e.name + ': ' + e.message);
    newIssueUrl.searchParams.append('body', '### Current page\n' + cp + '\n\n### Stack trace\n```\n' + e.stack + '\n```');
    newIssueUrl.searchParams.append('labels', 'bug');

    return (
        <div className="container-fluid body-content">
            <div className="row">
                <div className="card mx-auto">
                    <h4 className="card-header">
                        Oops
                    </h4>
                    <div className="card-body">
                        <p className="card-text">
                            Looks like some bugs have managed to creep in.
                        </p>

                        <p className="card-text text-center">
                            {Array(Rarity.Legendary).fill(0).map((_, i) =>
                                <Icon key={i} icon="bug" className={'text-rarity_' + Rarity[i + 1].toLowerCase()} />
                            )}
                        </p>

                        <div className="card-text text-muted">
                            <details>
                                <summary >{e.name}: {e.message}</summary>
                                <pre id="stacktrace">
                                    {e.stack}
                                </pre>
                            </details>
                        </div>

                        {ei &&
                            <p className="card-text text-muted">
                                {ei.componentStack}
                            </p>
                        }
                    </div>
                    <div className="card-footer">
                        <a href={newIssueUrl.toString()} className="btn btn-primary pull-right" target="_blank" rel="noreferrer noopener">
                            <Icon icon="github" />
                            {' '}
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
