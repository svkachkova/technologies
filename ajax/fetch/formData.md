# FormData

`let formData = new FormData([form]);`

Content-Type: form/multipart

Можно отправлять файлы и Bolb.

## Методы:

- `append(name, value)` - не удаляет поля с одинаковым name 
- `append(name, blob, fileName)` - для `<input type="file">`

- `set(name, value)` - удаляет поля с одинаковым name 
- `set(name, blob, fileName)`

- `delete(name)`
- `get(name)`
- `has(name)`
