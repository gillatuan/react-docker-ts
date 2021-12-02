import pkg from 'passport-jwt'
import mongoose from 'mongoose'

const User = mongoose.model('users')

const { Strategy, ExtractJwt } = pkg

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.secretOrKey

export const getResponsePassport = (passport) => {
  passport.use(new Strategy(opts, async (jwt_payload, done) => {
      await User.findById(jwt_payload.user.id)
        .then((user) => {
          if (user) {
            const payload = {
              avatar: user.avatar,
              email: user.email,
              deleted: user.deleted,
              id: user.id,
              is_online: user.is_online,
              name: user.name,
              role: user.role,
              status: user.status
            } // Create JWT Payload

            return done(null, payload)
          }

          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
