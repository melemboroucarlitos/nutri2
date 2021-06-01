import jwt from 'jsonwebtoken'
const createError = require('http-errors')

export const signAccessToken = (userId: string | string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = process.env.ACCESS_TOKEN_SECRET!
    const options = {
      expiresIn: '1h',
      issuer: 'pickurpage.com',
      audience: userId,
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message)
        reject(createError.InternalServerError())
        return
      }
      resolve(token!)
    })
  })
}

export const verifyAccessToken = (accessToken: string) => {
  return new Promise<string>((resolve, reject): any => {//Type safety my man
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err, payload: any) => {//type safety for payload
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return reject(createError.Unauthorized(message))
      }
      
      const userId = payload.aud
      
      return resolve(userId)
    })
  })
}


export const signRefreshToken = (userId: string | string[]) => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = process.env.REFRESH_TOKEN_SECRET!
    const options = {
      expiresIn: '1y',
      issuer: 'pickurpage.com',
      audience: userId,
    }
    
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message)
        reject(createError.InternalServerError())
      }
        resolve(token)
    })
  })
}

export const verifyRefreshToken = (refreshToken: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, payload: any) => {//type security
        if (err || !payload) return reject(createError.Unauthorized())
        
        const userId = payload.aud
        return resolve(userId)
      }
    )
  })
}

//TODO: Abstract verifyTokens into a higher order function