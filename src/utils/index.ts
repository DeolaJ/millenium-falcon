export function cleanInput(value?: string) {
    return `${value}`.replace(/[<>%$]/gi, "");
}

export function isLetterKey(letter: string) {
    if (letter.length > 1) return false;
    const characterCode = letter.charCodeAt(0);
    // If character code is within the bounds of [A-Z] or [a-z]
    if (
        (characterCode >= 65 && characterCode <= 90) ||
        (characterCode >= 97 && characterCode <= 122)
    ) {
        return true;
    }
    return false;
}
