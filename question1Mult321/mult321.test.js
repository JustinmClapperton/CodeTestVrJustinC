const mult321 = require('./mult321')
describe('Customer Endpoints', () => {
    it("returns NaN when input is not a number", () => {
        const result = mult321("dasdsada")
        expect(result).toEqual(NaN)
    })

    it("returns 0 when input 0", () => {
        const result = mult321(0)
        expect(result).toEqual(0)
    })

    it("returns input * 321 when input is a number", () => {
        const result = mult321(4352)
        expect(result).toEqual(1396992)
    })
})