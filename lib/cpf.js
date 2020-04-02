module.exports = {
    validate(cpf) {
        let aux = cpf
        // Verifica a formatação do CPF
        const hasMask = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(aux) // 123.456.789.09
        const noMask = /^\d{11}$/.test(aux) // 12345678909
        if (!hasMask && !noMask) return false
        if (hasMask) aux = cpf.replace(/[^\d]/g, '') // Remove a formatação 123.456.789.09 => 12345678909  
        // Rejeita CPFs com 000.000.000-00, 111.111.111-11, 222.222.222-22 [...]
        let e = 0
        for (let i = 1; i < 11; i++) {
            if (aux[i] === aux[i - 1]) e++
        }
        if (e === 10) return false
        // Recalcula e compara os dígitos verificadores
        if (calcDigits(aux) != `${aux[9]}${aux[10]}`) return false
        return true
    },
    generate() {
        let cpf = ''
        for (let i = 0; i < 9; i++) cpf+= Math.floor(Math.random() * 9)
        cpf+= calcDigits(cpf)
        return cpf
    },
    format(cpf) {
        if (this.validate(cpf)) return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
        return false
    }
}

function calcDigits(c) { // Módulo 11
    let cpf = ''
    for (let i = 0; i < 9; i++) cpf+= c[i]
    let d1 = 0
    let w = 10
    for (let i = 0; i < 9; i++) {
        d1+= cpf[i] * w
        w--
    }
    d1 = d1 % 11
    d1 = d1 >= 2 ? 11 - d1 : 0
    cpf+= d1
    let d2 = 0
    w = 11
    for (let i = 0; i < 10; i++) {
        d2+= cpf[i] * w
        w--
    }
    d2 = d2 % 11
    d2 = d2 >= 2 ? 11 - d2 : 0
    return `${d1}${d2}`
}
