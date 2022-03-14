export const required = (value) => {
    if (value) return undefined;

    return "Field is required"
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
/**
Больше не нужно, потому что эту функцию будет выполнять maxLengthCreator. На нужной странице (например AddMessageForm мы
 реализуем эту логику, по факту указывая возможные ограничения для этой задачи
 export const maxLength10 = value => {
    if (value.length > 10) return `Max length is 10 symbols`;
    return undefined;
}
 */