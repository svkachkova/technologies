# Basic

`git init` - создать локальный репозиторий.

Коммит - добавление порции кода в локальный репозиторий. До коммита код находится в «рабочей»/«промежуточной» области (staging area).

`git add file1 file2 file3` или `git add` - добавление файлов в staging area.

`git commit -m "Initial Commit"` - фиксация изменений (commiting).

`git commit --amend` - изменяет последний коммит вместо создания нового.

`git status` - показывает, какие файлы были изменены и какие файлы находятся в staging area.

`git log` - напечатает все сделанные коммиты вместе с их автором, датой и сообщением.

# Branches

`git branch test` - создать новую ветку test в локальном репозитории.

`git checkout test` - переключиться на ветку test.

`git branch` - покажет все ветки в репозитории.

# Merge

Cлияние веток test и master.

`git checkout master` - вернуться в ветку master.

`git merge test` - объединить ветки.

# Remote

`git remote add origin [repository url]` - указать локальному репозиторию на удаленный.

`git push -u origin master`- отправить код из локального репозитория в удаленный.

`git pull origin master` - извлечения последних изменений из удаленного репозитория в локальный.

`git clone [repository url]` - клонирования удаленного репозитория на ваш компьютер.
