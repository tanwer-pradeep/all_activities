
function help_fun(){
    console.log(`
        Lists of all commands :-
            1. help - shows all the commands.
            2. view - view <directory> <tree/flat>
            3. viewonly - viewonly <directory> <extension>
            4. organize - organize <directory>
    `);
}

module.exports = {
    help : help_fun
}