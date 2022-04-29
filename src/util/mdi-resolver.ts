/**
 * Returns the corresponding Material Design Icon.
 * @param componentName Component name starting with "Icon"
 */
export function MdiResolver(componentName: string) {
    if (componentName.startsWith("Icon"))
        return { name: componentName.slice(4), from: "mdue" }
}
