module.exports = {
    validate(cnpj) {
        let aux = cnpj
        // Verifica a formatação
        const hasMask = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(aux) // 00.000.000/0000-00
        const noMask = /^\d{14}$/.test(aux) 
        if (!hasMask && !noMask) return false
        if (hasMask) aux = cnpj.replace(/[^\d]/g, '') // Remove a formatação 000.000.000.000 => 00000000000  
        // Rejeita com todos os dígitos iguais
        let e = 0
        for (let i = 1; i < 14; i++) {
            if (aux[i] === aux[i - 1]) e++
        }
        if (e === 13) return false
        // Recalcula e compara os dígitos verificadores
        if (calcDigits(aux) === aux[12] + aux[13]) return true
        return false
    },
    generate() {
        let cnpj = ''
        for (let i = 0; i < 12; i++) cnpj += Math.floor(Math.random() * 9)
        cnpj += calcDigits(cnpj)
        return cnpj
    },
    format(cnpj) {
        const vFormat = /(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)|(^\d{14}$)/.test(cnpj)
        if (vFormat && typeof cnpj === 'string') {
            return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
        }
        return undefined
    }
}

function calcDigits(cnpj) { // Módulo 11
    let d1 = 0
    let d2 = 0
    let w1 = 5
    let w2 = 6
    for (let i = 0; i < 12; i++) {
        d1 += cnpj[i] * w1--
        d2 += cnpj[i] * w2--
        if (w1 < 2) w1 = 9
        if (w2 < 2) w2 = 9
    }
    d1 %= 11
    d1 = d1 >= 2 ? 11 - d1 : 0
    d2 += d1 * 2
    d2 %= 11
    d2 = d2 >= 2 ? 11 - d2 : 0
    return `${d1}${d2}`
}
