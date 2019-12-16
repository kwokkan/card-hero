
/**
 * Gets a route prefix to use within react-router.
 * The returned string always ends in an "/".
 * @param prefix The prefix to check against.
 */
export const getRoutePrefix = (prefix?: string): string => {
    if (!prefix) {
        return "/";
    }

    if (prefix.endsWith("/")) {
        return prefix;
    }

    return prefix + "/";
}
