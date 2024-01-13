const getRandomActivationCode = () => {
    let code = ""
    for (let i = 0; i < 5; i ++) {
        code += Math.round(Math.random()*9)
    }
    return code
}

export {
    getRandomActivationCode
}