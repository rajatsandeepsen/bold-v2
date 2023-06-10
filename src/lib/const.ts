import {z} from 'zod'

export const getFallBack = (name:string):string => {
    const array = name.split(" ")
    const str = array[0][0] + (array[1] ? array[1][0] : array[0][1])
    return str.toUpperCase()
}

export const emailCheck = (email:string) => z.string().trim().email().safeParse(email)

export const getUserName = (email:string) => {
    if (emailCheck(email))
        return email.split('@')[0]
    else email
}

export const isEmpty = (obj:object) => {
    for (const _ in obj) return false
    return true
}

export const userValid = (obj:object) => {
    return User.safeParse(obj)
}

const User = z.object({
    email: z.string().trim().email(),
    password: z.string().trim(),
    id: z.string().trim()
})

