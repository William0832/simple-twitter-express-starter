set e

# go in vue project dir
cd simple-twitter-vue

# run build
npm run build

# go out dir
cd ..

# git add and commit 
git add .
git commit -m 'deploy'

# push heroku
git push heroku heroku/master:master -f

# db migrate & seed
heroku run npx sequelize db:migrate:undo:all
heroku run npx sequelize db:migrate

heroku run npx sequelize db:seed:undo:all
heroku run npx sequelize db:seed:all

# open web
heroku open 

cd -