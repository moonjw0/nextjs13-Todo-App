export const options: Intl.DateTimeFormatOptions = {
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit'
};

export const today = new Date().toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace(/\./, '');

export const formattedDate = (todoDate: Date) => {
  return todoDate.toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace(/\./, '');
}



