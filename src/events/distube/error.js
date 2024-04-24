const name = 'error';
<<<<<<< HEAD
const invoke = async (error) => {
  console.log('error distube ' + error);
=======
const invoke = async (err) => {
  console.log(chalk.rgb(255, 0, 0)('[Distube error]: ') + err);
>>>>>>> 883fd2e (	new file:   .env)
};
export { invoke, name };
