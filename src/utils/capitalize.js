export default (word) => {
    const words = word.split(" ");

    if (words.length > 1)
        return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}