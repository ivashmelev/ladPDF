#READ ME

POST {body: urls = [массив url]} - /getpdf

Отправить запрос методом POST на api /getpdf
Тело запроса должно содержать строку urls - в строке идут url, разделенные запятой.

Пример: urls:https://yandex.ru,https://ru.wikipedia.org/wiki/%D0%9A%D0%BD%D0%B8%D0%B3%D0%B0/

Данные сохраняются в файл sites.pdf.
При повторном запросе файл должен быть закрыт.