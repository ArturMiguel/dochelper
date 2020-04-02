const cpf = require('../lib/cpf')

describe('CPF', () => {
    test('entradas validas e formatadas', () => {
        expect(cpf.validate('275.814.580-40')).toBeTruthy()
        expect(cpf.validate('711.103.060-59')).toBeTruthy()
        expect(cpf.validate('001.871.390-40')).toBeTruthy()
        expect(cpf.validate('123.526.420-35')).toBeTruthy()
    })
    test('entradas validas e não formatadas', () => {
        expect(cpf.validate('27581458040')).toBeTruthy()
        expect(cpf.validate('71110306059')).toBeTruthy()
        expect(cpf.validate('00187139040')).toBeTruthy()
        expect(cpf.validate('12352642035')).toBeTruthy()
    })
    test('entradas inválidas', () => {
        expect(cpf.validate()).toBeFalsy()
        expect(cpf.validate('111.111.111-11')).toBeFalsy()
        expect(cpf.validate('148!055!920-28')).toBeFalsy()
        expect(cpf.validate('123a526b420c35')).toBeFalsy()
        expect(cpf.validate('12352642035a')).toBeFalsy()
        expect(cpf.validate(87112474019)).toBeFalsy()
    })
    test('números válidos gerados aleatoriamente', () => {
        expect(cpf.validate(cpf.generate())).toBeTruthy()
        expect(cpf.validate(cpf.generate())).toBeTruthy()
        expect(cpf.validate(cpf.generate())).toBeTruthy()
        expect(cpf.validate(cpf.generate())).toBeTruthy()
    })
    test('formata entradas válidas', () => {
        expect(cpf.format('12352642035')).toBe('123.526.420-35')
        expect(cpf.format('123.456.789-09')).toBe('123.456.789-09')
    })
    test('não formata entradas inválidas', () => {
        expect(cpf.format('aaabbbcccdd')).toBeFalsy()
        expect(cpf.format('aaa.bbb.ccc-dd')).toBeFalsy()
        expect(cpf.format('11111111111')).toBeFalsy()
        expect(cpf.format()).toBeFalsy()
    })
})