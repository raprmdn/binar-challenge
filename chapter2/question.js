const readline = require('readline');

const _self = module.exports = {
    rl: readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    question: async (question) => {
        return new Promise((resolve, reject) => {
            _self.rl.question(question, (input) => {
                if (input.trim() === "")
                    reject('Input is required');
                if (input < 0 || input > 100)
                    reject('Nilai must be between 0 and 100');
                if (isNaN(input) && input.toLowerCase() !== 'q')
                    reject('You need provide a number');

                return resolve(input);
            });
        });
    }
}