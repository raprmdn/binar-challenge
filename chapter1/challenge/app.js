const inquirer = require("inquirer");

const menu = async () => {
    console.clear();
    const choice = await inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Select an option: ",
        choices: [
            "Penjumlahan",
            "Pengurangan",
            "Perkalian",
            "Pembagian",
            "Akar kuadrat",
            "Luas persegi",
            "Volume kubus",
            "Volume tabung",
            "Keluar"
        ]
    });

    await menuHandling(choice);
}

const menuHandling = async (choice) => {
    switch (choice.menu) {
        case "Penjumlahan":
            await tambah();
            break;
        case "Pengurangan":
            await kurang();
            break;
        case "Perkalian":
            await kali();
            break;
        case "Pembagian":
            await bagi();
            break;
        case "Akar kuadrat":
            await akarKuadrat();
            break;
        case "Luas persegi":
            await luasPersegi();
            break;
        case "Volume kubus":
            await volumeKubus();
            break;
        case "Volume tabung":
            await volumeTabung();
            break;
        case "Keluar":
            process.exit();
            break;
    }
}

const tambah = async () => {
    const input1 = await operan('angka pertama: ');
    const input2 = await operan('angka kedua: ');

    console.log(`Hasil penjumlahan dari ${input1} + ${input2} = ${input1 + input2}`);
}

const kurang = async () => {
    const input1 = await operan('angka pertama: ');
    const input2 = await operan('angka kedua: ');

    console.log(`Hasil pengurangan dari ${input1} - ${input2} = ${input1 - input2}`);
}

const kali = async () => {
    const input1 = await operan('angka pertama: ');
    const input2 = await operan('angka kedua: ');

    console.log(`Hasil perkalian dari ${input1} * ${input2} = ${input1 * input2}`);
}

const bagi = async () => {
    const input1 = await operan('angka pertama: ');
    const input2 = await operan('angka kedua: ');

    if (input2 === 0) {
        console.log(`Cannot divide by 0`);
        process.exit()
    }

    console.log(`Hasil pembagian dari ${input1} / ${input2} = ${input1 / input2}`);
}

const akarKuadrat = async () => {
    const input = await operan();
    const result = Math.sqrt(input)

    console.log(`√${input} = ${result}`);
}

const luasPersegi = async () => {
    const input1 = await operan('panjang: ');
    const input2 = await operan('lebar: ');
    const result = input1 * input2;

    console.log(`Panjang = ${input1}`);
    console.log(`Lebar = ${input2}`);
    console.log(`L = ${input1} x ${input2} = ${result}`)
}

const volumeKubus = async () => {
    const input = await operan('panjang rusuk: ');
    const result = input**3;

    console.log(`V = ${input} x ${input} x ${input} = ${result}`);
}

const volumeTabung = async () => {
    const input1 = await operan('jari-jari: ');
    const input2 = await operan('tinggi: ');
    const result = Math.round(Math.PI * input1 * input1 * input2)

    console.log(`Jari jari = ${input1}`);
    console.log(`Tinggi = ${input2}`);
    console.log(`V = π x ${input1} x ${input1} x ${input2} = ${result}`)
}

const operan = async (question = "angka: ") => {
    const input = await inquirer.prompt({
        name: "input",
        type: "input",
        message: `Inputkan ${question}`,
        validate: function (input) {
            return _validateInput(input);
        }
    });

    return parseInt(input.input);
}

const _validateInput = (input) => {
    if (input.trim() === "")
        throw new Error('Input is required');
    if (isNaN(input))
        throw new Error('You need provide a number');

    return true;
}

menu();