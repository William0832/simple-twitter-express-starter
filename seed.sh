set e
# --env test 
npx sequelize db:migrate:undo:all
npx sequelize db:migrate

npx sequelize db:seed:undo:all
npx sequelize db:seed:all
