export const getFallBack = (name:string):string => {
    const array = name.split(" ")
    const str = array[0][0] + (array[1] ? array[1][0] : array[0][1])
    return str.toUpperCase()
}

