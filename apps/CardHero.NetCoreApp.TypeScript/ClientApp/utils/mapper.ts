/**
 * Mapping interface.
 */
export default interface IMapper<T> {
    /**
     * Map from an object.
     * @param o The object to map from.
     * @returns null if @param o is null otherwise T.
     */
    from(o?: any): T | null;
}