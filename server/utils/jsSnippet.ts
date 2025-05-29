export const executeJSSnippet = (jsSnippet: string|undefined) => {
    //Assuming that the snippets are just pure JS. Not JSX. Where Node JS in the backend would run the snippet and kust give the result in a string format.
    if(!jsSnippet) throw new Error("No snippet provided");
    try {
        const result  = eval(jsSnippet);
        if(!result) {
            throw new Error("Error in the JS Snippet. Please check the snippet.");
        } else {
            return result;
        }
    } catch (error) {
        throw new Error(`Error in the JS Snippet: ${error}`);
    }
}
