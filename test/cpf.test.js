const cpf = require('../lib/cpf')

describe('CPF', () => {
    test('entradas validas e formatadas', () => {
        expect(cpf.validate('275.814.580-40')).toBeTruthy()
        expect(cpf.validate('711.103.060-59')).toBeTruthy()
    })
    test('entradas validas e não formatadas', () => {
        expect(cpf.validate('27581458040')).toBeTruthy()
        expect(cpf.validate('71110306059')).toBeTruthy()
    })
    test('entradas inválidas', () => {
        expect(cpf.validate()).toBeFalsy()
        expect(cpf.validate(' 275.814.580-40')).toBeFalsy()
        expect(cpf.validate('111.111.111-11')).toBeFalsy()
        expect(cpf.validate('123526420350')).toBeFalsy()
    })
    test('números válidos gerados aleatoriamente', () => {
        expect(cpf.validate(cpf.generate())).toBeTruthy()
        expect(cpf.validate(cpf.generate())).toBeTruthy()
    })
    test('formata entradas', () => {
        expect(cpf.format()).toBe(undefined)
        expect(cpf.format('a00b00c00d0')).toBe(undefined)
        expect(cpf.format(71110306059)).toBe(undefined)
        expect(cpf.format('00000000000')).toBe('000.000.000-00')
    })
})