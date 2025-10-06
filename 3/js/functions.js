// Функция для проверки длины строки 

const checkStringLength = (string , maxLength) => string.length <= maxLength;

// Функция для проверки, является ли строка палиндромом

const isPalindrome = (string) => {
    string = string.replaceAll(' ', '').toLowerCase();
    let reversedLength = '';
    for (let i = string.length - 1; i >= 0; i--) {
        reversedLength += string[i];
    }
    return string === reversedLength;
}

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

const extractNumbers = (string) => {
    let result = '';
    string = string.toString();
    for (let i = 0; i <= string.length - 1; i++) {
        if (Number.isNaN (parseInt (string[i], 10)) === false) {
            result += string[i];
        }
    }
    return result === ''? NaN : Number(result);
};