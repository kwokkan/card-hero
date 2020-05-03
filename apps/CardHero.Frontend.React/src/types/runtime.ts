export interface Action {
    (): void;
}

export interface Func<TResult> {
    (): TResult;
}
