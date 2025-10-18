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

function meetingFits(workStart, workEnd, meetingStart, duration) {
    
  const toMinutes = time => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const startWork = toMinutes(workStart);
  const endWork = toMinutes(workEnd);
  const startMeeting = toMinutes(meetingStart);
  const endMeeting = startMeeting + duration;

  return startMeeting >= startWork && endMeeting <= endWork;
}

console.log(meetingFits('08:00', '17:30', '14:00', 90)); 
console.log(meetingFits('8:0', '10:0', '8:0', 120));     
console.log(meetingFits('08:00', '14:30', '14:00', 90)); 
console.log(meetingFits('14:00', '17:30', '08:0', 90));  
console.log(meetingFits('8:00', '17:30', '08:00', 900)); 
