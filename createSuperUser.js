const User = require('./models/User');
const bcrypt = require('bcrypt');
const config = require('config-lite');
const meow = require('meow');

const cli = meow();
const [ email, rawPassword ] = cli.input;
if (!(email && rawPassword)) {
    console.log('输入有误');
    process.exit();
}
console.log(`账号: ${email}\n密码: ${rawPassword}`);
console.log('加盐中');
const password = bcrypt.hashSync(rawPassword, config.saltRound);
console.log('加盐成功');
let user = {
    email,
    password,
    superUser: true
}
User.create(user)
    .then(user => {
        console.log('创建成功');
        process.exit();
    })
    .catch(err => {
        if (err.MongoError.match('E11000 duplicate key')) {
            console.log('创建失败，超级用户已存在');
        }
    });
