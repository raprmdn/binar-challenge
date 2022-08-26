const { question, rl: readline } = require('./question.js');

const main = async () => {
    console.clear();

    console.log('Binar Challenge - Chapter 2');
    console.log("Inputkan nilai-nilai siswa. \nNilai harus diantara 0 - 100. \nInputkan 'q/Q' untuk keluar.");

    let values = [];
    let isContinue = true;

    while (isContinue) {
        try {
            const input = await question('Inputkan Nilai: ');
            if (input.toLowerCase() === 'q') {
                isContinue = false;
                console.clear();
                readline.close();
                break;
            }

            values.push(parseInt(input));
        } catch (error) {
            console.error(error);
        }
    }

    console.log(`Nilai yang diinputkan: ${values}`);
    console.log(`Nilai tertinggi: ${Math.max(...values)}`);
    console.log(`Nilai terendah: ${Math.min(...values)}`);
    console.log(`Nilai rata-rata: ${Math.floor(values.reduce((a, b) => a + b, 0) / values.length)}`);
    console.log(`Siswa lulus berjumlah: ${values.filter(value => value >= 60).length} siswa, dengan nilai: ${values.filter(value => value >= 60)}`);
    console.log(`Siswa tidak lulus berjumlah: ${values.filter(value => value < 60).length} siswa, dengan nilai: ${values.filter(value => value < 60)}`);
    console.log(`Urutan nilai terendah: ${values.sort((a, b) => a - b)}`);
    console.log(`Urutan nilai tertinggi: ${values.sort((a, b) => b - a)}`);
    console.log(`Siswa dengan nilai 90 terdapat ${values.filter(value => value === 90).length} siswa, dengan nilai: ${values.filter(value => value === 90)}`);
    console.log(`Siswa dengan nilai 100 terdapat ${values.filter(value => value === 100).length} siswa, dengan nilai: ${values.filter(value => value === 100)}`);
}

main();