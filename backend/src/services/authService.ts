import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function registerUser(name: string,email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(existingUser){
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    
    
    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret){
        throw new Error("JWT_SECRET is not configured")
    }
    
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        jwtSecret,
        {
            expiresIn: "1d"
        }
    )


    const {password: _, ...safeUser} = user
    
    return {
        user: safeUser,
        token
    }}


export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user){
        throw new Error("User not found !")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        throw new Error("Invalid password !")
    }

    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret){
        throw new Error("JWT_SECRET is not configured")
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        jwtSecret,
        {
        expiresIn: "1d"
        }
    )

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token
    }

}