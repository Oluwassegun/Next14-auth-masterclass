import { db } from "@/lib/db";

export const getVerificationByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        })
        return verificationToken
    } catch { 
        return null
    }
}

export const getVerificationByEmail = async (email: string) => {
    try {
        const verificationEmail = await db.verificationToken.findFirst({
            where: { email }
        })
        return verificationEmail
    } catch {
        return null
    }
}