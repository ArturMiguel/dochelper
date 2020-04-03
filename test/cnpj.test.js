const cnpj = require('../lib/cnpj')

describe('CNPJ', () => {
    test('entradas validas e formatadas', () => {
        expect(cnpj.validate('86.267.649/0001-99')).toBeTruthy()
        expect(cnpj.validate('68.839.884/0001-06')).toBeTruthy()
    })
    test('entradas validas e não formatadas', () => {
        expect(cnpj.validate('86267649000199')).toBeTruthy()
        expect(cnpj.validate('68839884000106')).toBeTruthy()
    })
    test('entradas inválidas', () => {
        expect(cnpj.validate()).toBeFalsy()
        expect(cnpj.validate(' 86.267.649/0001-99')).toBeFalsy()
        expect(cnpj.validate('11.111.111/1111-11')).toBeFalsy()
        expect(cnpj.validate('862676490001991')).toBeFalsy()
        expect(cnpj.validate(86267649000199)).toBeFalsy()
    })
    test('números válidos gerados aleatoriamente', () => {
        expect(cnpj.validate(cnpj.generate())).toBeTruthy()
        expect(cnpj.validate(cnpj.generate())).toBeTruthy()
    })
    test('formata entradas válidas e inválidas', () => {
        expect(cnpj.format()).toBe(undefined)
        expect(cnpj.format('00000000a00000')).toBe(undefined)
        expect(cnpj.format(71110306059)).toBe(undefined)
        expect(cnpj.format('00000000000000')).toBe('00.000.000/0000-00')
    })
})