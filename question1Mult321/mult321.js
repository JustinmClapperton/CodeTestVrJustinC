let mult321 = (x) => {
    let mult300 = parseInt(`${x+x+x}00`)
    let mult20 = parseInt(`${x+x}0`)
    return (isNaN(mult300) || isNaN(mult20)) ? NaN : mult300 + mult20 + x
}
module.exports = mult321
